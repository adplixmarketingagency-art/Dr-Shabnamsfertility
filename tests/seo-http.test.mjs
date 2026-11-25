import assert from 'node:assert/strict';
import { test } from 'node:test';

const origin = process.env.SEO_BASE_URL || 'http://127.0.0.1:8787';
const canonical = 'https://drshabnamsfertility.com/';
const get = (path, userAgent) => fetch(new URL(path, origin), {
  redirect: 'manual',
  signal: AbortSignal.timeout(10000),
  ...(userAgent ? { headers: { 'user-agent': userAgent } } : {}),
});

const attributes = tag => Object.fromEntries(
  [...tag.matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g)].map(([, name, value]) => [name.toLowerCase(), value]),
);

test('simulated reader, Googlebot and OAI-SearchBot requests receive the same indexable prerendered homepage', async t => {
  // User-agent simulations exercise HTTP delivery, not verified crawler identity or WAF access.
  let reader;
  for (const [label, userAgent] of [
    ['ordinary reader simulation', 'Mozilla/5.0'],
    ['Googlebot simulation', 'Googlebot/2.1 (+http://www.google.com/bot.html)'],
    ['OAI-SearchBot simulation', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot'],
  ]) {
    await t.test(label, async () => {
      const response = await get('/', userAgent);
      assert.equal(response.status, 200, label);
      assert.ok(response.headers.get('content-type')?.includes('text/html'));
      const html = await response.text();
      const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag));
      assert.deepEqual(links.filter(link => link.rel === 'canonical').map(link => link.href), [canonical]);

      const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag));
      const robots = meta.filter(tag => tag.name?.toLowerCase() === 'robots').map(tag => tag.content);
      assert.equal(robots.length, 1);
      const directives = robots[0].toLowerCase().split(',').map(value => value.trim());
      for (const directive of ['index', 'follow', 'max-snippet:-1', 'max-image-preview:large']) {
        assert.ok(directives.includes(directive), directive);
      }
      const crawlerMeta = meta.filter(tag => /^(robots|googlebot|oai-searchbot)$/i.test(tag.name || ''));
      const headerRobots = response.headers.get('x-robots-tag') || '';
      for (const settings of [...crawlerMeta.map(tag => tag.content || ''), headerRobots]) {
        assert.doesNotMatch(settings, /\b(?:noindex|nofollow|nosnippet|noimageindex|none|unavailable_after)\b/i);
        for (const [, limit] of settings.matchAll(/max-snippet\s*:\s*(-?\d+)/gi)) {
          assert.equal(limit, '-1', 'simulated requests retain unrestricted text snippets');
        }
      }

      const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
        .filter(([, attrs]) => attributes(attrs).type === 'application/ld+json');
      assert.equal(scripts.length, 1, 'one connected JSON-LD graph is delivered without JavaScript execution');
      const schema = JSON.parse(scripts[0][2]);
      assert.equal(schema['@context'], 'https://schema.org');
      const entities = schema['@graph'];
      assert.ok(Array.isArray(entities));
      assert.deepEqual(entities.map(entity => entity['@type']).sort(), ['MedicalClinic', 'WebPage', 'WebSite']);
      assert.equal(new Set(entities.map(entity => entity['@id'])).size, 3);
      const [clinic, website, page] = ['MedicalClinic', 'WebSite', 'WebPage'].map(type => entities.find(entity => entity['@type'] === type));
      assert.equal(clinic['@id'], `${canonical}#clinic`);
      assert.equal(website['@id'], `${canonical}#website`);
      assert.equal(page['@id'], `${canonical}#webpage`);
      for (const entity of entities) assert.equal(entity.url, canonical);
      assert.equal(website.publisher['@id'], clinic['@id']);
      assert.equal(page.isPartOf['@id'], website['@id']);
      assert.equal(page.about['@id'], clinic['@id']);
      assert.equal(page.mainEntity['@id'], clinic['@id']);
      assert.equal(clinic.mainEntityOfPage['@id'], page['@id']);
      assert.equal(clinic.telephone, '+917695852669');
      assert.equal(clinic.address.addressLocality, 'Puducherry');
      assert.equal(new URL(clinic.hasMap).hostname, 'www.google.com');
      assert.ok(clinic.hasMap.includes('0xb321f886f2b280c6'));
      assert.deepEqual(clinic.sameAs, [clinic.hasMap]);
      // Any clinic claim beyond this reviewed factual inventory requires explicit review.
      assert.deepEqual(Object.keys(clinic).sort(), [
        '@id', '@type', 'name', 'url', 'telephone', 'address', 'logo', 'image', 'hasMap', 'sameAs', 'mainEntityOfPage',
      ].sort(), 'clinic schema must not add unverified ratings, reviews or clinical outcome claims');
      const inspectClaims = value => {
        if (!value || typeof value !== 'object') return;
        for (const [key, child] of Object.entries(value)) {
          assert.doesNotMatch(key, /rating|review|outcome|successRate|successStory|cureRate/i, 'no unverified schema claims');
          if (key === '@type') assert.doesNotMatch(String(child), /Rating|Review|MedicalStudy/i);
          inspectClaims(child);
        }
      };
      inspectClaims(schema);
      assert.deepEqual(page.relatedLink, [
        'https://www.nhs.uk/conditions/ivf/',
        'https://www.hfea.gov.uk/choose-a-fertility-clinic/',
      ]);
      for (const url of page.relatedLink) assert.ok(html.includes(`href="${url}"`));

      const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];
      assert.ok(body, 'the response contains a rendered body');
      const content = body.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
        .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      assert.match(body, /<h1\b[^>]*>\s*Compassionate Care at Every Step of Your Journey\s*<\/h1>/);
      assert.match(body, /<h2\b[^>]*>\s*Patient Resources\s*<\/h2>/);
      assert.match(content, /No\.162\/1/);
      assert.match(content, /Nellithope/);
      const delivered = { schema, content, canonical: links.find(link => link.rel === 'canonical').href, directives, headerRobots };
      if (reader) assert.deepEqual(delivered, reader, `${label} matches the reader's substantive content and discovery settings`);
      else reader = delivered;
    });
  }
});

test('crawler files have the correct media types and actual contents', async () => {
  const robots = await get('/robots.txt');
  assert.equal(robots.status, 200);
  assert.ok(robots.headers.get('content-type')?.includes('text/plain'));
  const robotsText = await robots.text();
  // Assert this site's intentionally simple delivered policy, not arbitrary robots semantics.
  const policyLines = robotsText.split(/\r?\n/).map(line => line.replace(/#.*$/, '').trim()).filter(Boolean);
  assert.deepEqual(policyLines, ['User-agent: *', 'Allow: /', `Sitemap: ${canonical}sitemap.xml`]);
  const sitemap = await get('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  assert.ok(sitemap.headers.get('content-type')?.includes('xml'));
  const sitemapText = await sitemap.text();
  assert.match(sitemapText, /<urlset\b[^>]*xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  assert.equal((sitemapText.match(/<url\b/g) || []).length, 1, 'only the published homepage is listed');
  assert.deepEqual([...sitemapText.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(([, url]) => url.trim()), [canonical], 'no unpublished routes or alternate homepage URLs');
  assert.doesNotMatch(sitemapText, /<!doctype html>/i);
});

test('HTML, crawler endpoints, and mutable images require cache revalidation', async () => {
  for (const path of ['/', '/robots.txt', '/sitemap.xml', '/images/logo.webp']) {
    const response = await get(path);
    assert.equal(response.status, 200, path);
    const cacheControl = response.headers.get('cache-control') || '';
    assert.match(cacheControl, /(?:^|,)\s*max-age=0\s*(?:,|$)/i, path);
    assert.match(cacheControl, /(?:^|,)\s*must-revalidate\s*(?:,|$)/i, path);
    assert.doesNotMatch(cacheControl, /immutable/i, path);
    assert.ok(response.headers.get('etag'), `${path} has a revalidation validator`);
    await response.arrayBuffer();
  }
});

test('fingerprinted Vite JS and CSS bundles are cached immutably', async () => {
  const homepage = await get('/');
  assert.equal(homepage.status, 200);
  const html = await homepage.text();
  const paths = [...new Set([...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map(match => match[1]))];
  assert.ok(paths.some(path => path.endsWith('.js')), 'homepage references a JS bundle');
  assert.ok(paths.some(path => path.endsWith('.css')), 'homepage references a CSS bundle');
  for (const path of paths) {
    assert.match(path, /-[A-Za-z0-9_-]{8,}\.(?:js|css)$/, `${path} is fingerprinted`);
    const response = await get(path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000, immutable', path);
    assert.match(response.headers.get('content-type') || '', path.endsWith('.css') ? /text\/css/ : /(?:text|application)\/javascript/, path);
    await response.arrayBuffer();
  }
});

test('security headers retain same-origin connections without obsolete NewsAPI access', async () => {
  const response = await get('/');
  assert.equal(response.status, 200);
  const policy = response.headers.get('content-security-policy') || '';
  assert.match(policy, /(?:^|;)\s*connect-src 'self'\s*(?:;|$)/);
  assert.doesNotMatch(policy, /newsapi\.org/i);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
  await response.arrayBuffer();
});

test('unknown documents and missing assets return real 404s', async () => {
  for (const path of ['/__seo-http-missing-page', '/images/__seo-http-missing-image.png', '/ivf-treatment-pondicherry/', '/doctor/dr-shabnam-khan/', '/contact/']) {
    const response = await get(path);
    assert.equal(response.status, 404, path);
    assert.match(await response.text(), /Page not found/);
  }
});

test('known legacy URLs redirect permanently to equivalent destinations', async () => {
  for (const [path, destination] of [
    ['/DrShabnam.html', '/'],
    ['/DrShabnam', '/'],
    ['/DrShabnam/', '/'],
    ['/contact.html', '/#contact'],
  ]) {
    const response = await get(path);
    assert.equal(response.status, 301, path);
    const location = new URL(response.headers.get('location'), origin);
    assert.equal(location.pathname + location.hash, destination, path);
  }
});

test('the public HTTP host redirects to HTTPS while preserving path and query', {
  skip: new URL(origin).origin !== new URL(canonical).origin,
}, async () => {
  const url = new URL('robots.txt?seo_check=normalization', canonical);
  const target = url.href;
  url.protocol = 'http:';
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(10000) });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), target);
});
