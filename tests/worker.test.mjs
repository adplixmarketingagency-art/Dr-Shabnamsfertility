import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from '../src/worker.js';

test('HTTP and a future routed www host permanently normalize without losing the path or query', () => {
  for (const source of [
    'http://drshabnamsfertility.com/contact.html?source=example',
    'https://www.drshabnamsfertility.com/contact.html?source=example',
    'http://www.drshabnamsfertility.com/contact.html?source=example',
  ]) {
    const response = worker.fetch(new Request(source, { method: 'POST' }), {});
    assert.equal(response.status, 308, '308 preserves the request method');
    assert.equal(response.headers.get('location'), 'https://drshabnamsfertility.com/contact.html?source=example');
  }
});

test('HTTPS, local preview and workers.dev requests reach the unchanged asset router', async () => {
  for (const source of [
    'https://drshabnamsfertility.com/',
    'https://drshabnamsfertility.com/contact.html',
    'https://drshabnamsfertility.com/robots.txt',
    'http://127.0.0.1:8787/',
    'https://dr-shabnamsfertility.adplixmarketingagency.workers.dev/',
  ]) {
    const request = new Request(source);
    const response = new Response('asset router result', { status: 404 });
    let calls = 0;
    const result = await worker.fetch(request, { ASSETS: { fetch: received => {
      calls += 1;
      assert.equal(received, request, 'forward the original request');
      return response;
    } } });
    assert.equal(calls, 1);
    assert.equal(result, response, 'retain asset status, redirects, headers and content');
  }
});
