import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { clinic } from '../src/content/clinic.js';
import { pages } from '../src/content/routes.js';

const endpoint = 'https://api.indexnow.org/indexnow';

function metaExcludesIndexing(html) {
  const tags = html.match(/<meta\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi) || [];
  return tags.some(tag => {
    const attributes = new Map();
    for (const match of tag.slice(5).matchAll(/\s*([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
      const name = match[1].toLowerCase();
      if (!attributes.has(name)) attributes.set(name, match[2] ?? match[3] ?? match[4] ?? '');
    }
    return ['robots', 'bingbot'].includes(attributes.get('name')?.toLowerCase()) &&
      /\b(?:noindex|none)\b/i.test(attributes.get('content') || '');
  });
}

export function createSubmission(rawKey) {
  const key = rawKey.trim();
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
    throw new Error('The public IndexNow ownership file must contain one valid 8–128 character key.');
  }
  const origin = new URL(clinic.origin);
  return {
    host: origin.hostname,
    key,
    keyLocation: new URL('/indexnow-key.txt', origin).href,
    // The published route inventory excludes draft, missing and redirected URLs.
    urlList: [...new Set(pages.map(page => new URL(page.path, origin).href))],
  };
}

export async function submitPublishedPages(payload, request = fetch) {
  const get = url => request(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
  const ownership = await get(payload.keyLocation);
  if (ownership.status !== 200 || (await ownership.text()).trim() !== payload.key) {
    throw new Error('The live ownership file does not match. Deploy it before notifying IndexNow.');
  }
  for (const url of payload.urlList) {
    const response = await get(url);
    const html = await response.text();
    if (response.status !== 200 || !response.headers.get('content-type')?.includes('text/html')) {
      throw new Error(`Only published HTML pages with status 200 can be submitted: ${url}`);
    }
    if (/\b(?:noindex|none)\b/i.test(response.headers.get('x-robots-tag') || '') || metaExcludesIndexing(html)) {
      throw new Error(`Refusing to submit a noindex page: ${url}`);
    }
    const canonicals = [...html.matchAll(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi)];
    if (canonicals.length !== 1 || new URL(canonicals[0][1], url).href !== url) {
      throw new Error(`The live page must declare its submitted URL as the only canonical: ${url}`);
    }
  }
  const response = await request(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'error',
    signal: AbortSignal.timeout(15000),
  });
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow returned HTTP ${response.status}; the notification was not accepted.`);
  }
  return { status: response.status, urls: payload.urlList.length, keyValidationPending: response.status === 202 };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !['--dry-run', '--submit'].includes(args[0])) {
    throw new Error('Use --dry-run to inspect the published URLs, or --submit after deploying a content update.');
  }
  const payload = createSubmission(await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8'));
  if (args[0] === '--dry-run') {
    console.log(JSON.stringify({ endpoint, host: payload.host, keyLocation: payload.keyLocation, urlList: payload.urlList }, null, 2));
    console.log('Dry run: no network requests or submissions made.');
    return;
  }
  const result = await submitPublishedPages(payload);
  console.log(`IndexNow HTTP ${result.status}: notified ${result.urls} published URL(s).${result.keyValidationPending ? ' Key validation is pending.' : ''}`);
  console.log('Notification is not confirmation of crawling, indexing, ranking or AI recommendations.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
