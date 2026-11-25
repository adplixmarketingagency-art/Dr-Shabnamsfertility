import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { createSubmission, submitPublishedPages } from '../scripts/indexnow.mjs';

const key = 'test-ownership-key-20261125';
const canonical = 'https://drshabnamsfertility.com/';
const page = '<link rel="canonical" href="https://drshabnamsfertility.com/">';
const htmlResponse = (body = page, status = 200, headers = {}) => new Response(body, {
  status, headers: { 'content-type': 'text/html; charset=utf-8', ...headers },
});

test('the real public ownership file produces only the canonical published homepage', async () => {
  const contents = await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8');
  const payload = createSubmission(contents);
  assert.equal(payload.key, contents.trim());
  assert.equal(payload.host, 'drshabnamsfertility.com');
  assert.equal(payload.keyLocation, `${canonical}indexnow-key.txt`);
  assert.deepEqual(payload.urlList, [canonical]);
  for (const invalid of ['', 'short', 'key with spaces', 'a'.repeat(129)]) {
    assert.throws(() => createSubmission(invalid), /valid/);
  }
});

test('a mismatched live ownership file prevents any submission', async () => {
  const calls = [];
  await assert.rejects(submitPublishedPages(createSubmission(key), async (url, options) => {
    calls.push({ url, options });
    return new Response('different-ownership-key');
  }), /ownership file does not match/);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].options.method, undefined);
});

test('redirected, missing, non-HTML, noindex and noncanonical pages cannot be submitted', async t => {
  for (const [label, response] of [
    ['redirect', new Response(null, { status: 301, headers: { location: canonical } })],
    ['missing', htmlResponse('Not found', 404)],
    ['non-HTML', new Response(page, { headers: { 'content-type': 'text/plain' } })],
    ['meta noindex', htmlResponse(`${page}<meta content="follow, noindex" name="robots">`)],
    ['unquoted meta noindex', htmlResponse(`${page}<meta name=robots content=noindex>`)],
    ['mixed-case spaced meta none', htmlResponse(`${page}<META CONTENT = 'none' NAME = ROBOTS>`)],
    ['bingbot meta none', htmlResponse(`${page}<meta name=bingbot content=none>`)],
    ['header noindex', htmlResponse(page, 200, { 'x-robots-tag': 'noindex' })],
    ['header none', htmlResponse(page, 200, { 'x-robots-tag': 'none' })],
    ['different canonical', htmlResponse('<link href="https://example.com/" rel="canonical">')],
    ['missing canonical', htmlResponse('<h1>Clinic</h1>')],
    ['duplicate canonical', htmlResponse(page + page)],
  ]) {
    await t.test(label, async () => {
      let calls = 0;
      await assert.rejects(submitPublishedPages(createSubmission(key), async (_url, options) => {
        assert.equal(options.method, undefined, 'no POST before live-page checks succeed');
        return ++calls === 1 ? new Response(key) : response;
      }));
      assert.equal(calls, 2);
    });
  }
});

test('successful notifications distinguish accepted URLs from pending key validation', async () => {
  for (const status of [200, 202]) {
    const calls = [];
    const payload = createSubmission(key);
    const result = await submitPublishedPages(payload, async (url, options) => {
      calls.push({ url, options });
      if (calls.length === 1) return new Response(key);
      if (calls.length === 2) return htmlResponse(`${page}<meta name=robots content=nofollow><meta name=description content="none">`);
      return new Response(null, { status });
    });
    assert.deepEqual(result, { status, urls: 1, keyValidationPending: status === 202 });
    assert.equal(calls[2].url, 'https://api.indexnow.org/indexnow');
    assert.equal(calls[2].options.method, 'POST');
    assert.deepEqual(JSON.parse(calls[2].options.body), payload);
  }
});

test('a rejected notification is reported as a failure', async () => {
  let calls = 0;
  await assert.rejects(submitPublishedPages(createSubmission(key), async () => {
    if (++calls === 1) return new Response(key);
    if (calls === 2) return htmlResponse();
    return new Response('Forbidden', { status: 403 });
  }), /HTTP 403/);
});
