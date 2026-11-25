import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const readOutput = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('the first HTML response contains clinic and appointment content', async () => {
  const html = await readOutput('index.html');
  assert.match(html, /<main\b/);
  assert.match(html, /No\.162\/1/);
  assert.match(html, /Nellithope/);
  assert.match(html, /href="tel:\+917695852669"/);
  assert.match(html, /<noscript>/);
});

test('the homepage declares one canonical and truthful clinic metadata', async () => {
  const html = await readOutput('index.html');
  const canonicals = html.match(/<link\b[^>]*rel="canonical"[^>]*>/g) || [];
  assert.equal(canonicals.length, 1);
  assert.match(canonicals[0], /href="https:\/\/drshabnamsfertility\.com\/"/);
  assert.match(html, /<title>IVF &amp; Fertility Specialist in Pondicherry \| Dr\. Shabnam<\/title>/);
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  const schema = JSON.parse(scripts[0][1]);
  assert.equal(schema['@context'], 'https://schema.org');
  const clinic = schema['@graph'].find(entity => entity['@type'] === 'MedicalClinic');
  assert.ok(clinic);
  assert.equal(clinic.address.addressLocality, 'Puducherry');
  assert.equal(clinic.telephone, '+917695852669');
  assert.equal(clinic.aggregateRating, undefined);
  assert.equal(clinic.review, undefined);
  assert.equal(new URL(clinic.hasMap).hostname, 'www.google.com');
  assert.ok(clinic.hasMap.includes('0xb321f886f2b280c6'), 'Maps relationship identifies the observed clinic, not a generic search');
  assert.deepEqual(clinic.sameAs, [clinic.hasMap]);
});

test('the clinic, website and page form one connected identity graph', async () => {
  const html = await readOutput('index.html');
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const entities = schema['@graph'];
  const ids = new Set(entities.map(entity => entity['@id']));
  assert.equal(ids.size, entities.length, 'entity IDs must be unique');
  const [clinic, website, page] = ['MedicalClinic', 'WebSite', 'WebPage'].map(type => entities.find(entity => entity['@type'] === type));
  assert.ok(clinic && website && page);
  assert.equal(website.publisher['@id'], clinic['@id']);
  assert.equal(page.isPartOf['@id'], website['@id']);
  assert.equal(page.mainEntity['@id'], clinic['@id']);
  assert.equal(clinic.mainEntityOfPage['@id'], page['@id']);
  assert.equal(page.url, 'https://drshabnamsfertility.com/');
  assert.equal(page.inLanguage, 'en-IN');
  for (const url of [clinic.logo, clinic.image, ...page.relatedLink]) {
    assert.equal(new URL(url).protocol, 'https:');
  }
  for (const url of page.relatedLink) {
    assert.ok(html.includes(`href="${url}"`), 'resource relationships must match visible links');
  }
});

test('search and sharing metadata stay aligned and allow search previews', async () => {
  const html = await readOutput('index.html');
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
  const meta = (attribute, name) => {
    const matches = [...html.matchAll(new RegExp(`<meta ${attribute}="${name}" content="([^"]*)"`, 'g'))];
    assert.equal(matches.length, 1, name);
    return matches[0][1];
  };
  assert.equal(meta('property', 'og:title'), title);
  assert.equal(meta('name', 'twitter:title'), title);
  assert.equal(meta('property', 'og:description'), description);
  assert.equal(meta('name', 'twitter:description'), description);
  assert.equal(meta('name', 'twitter:image'), meta('property', 'og:image'));
  assert.equal(meta('property', 'og:locale'), 'en_IN');
  const robots = meta('name', 'robots');
  assert.match(robots, /\bindex\b/);
  assert.match(robots, /max-image-preview:large/);
  assert.match(robots, /max-snippet:-1/);
  assert.doesNotMatch(robots, /noindex|nosnippet|noimageindex/);
  assert.match(html, /<html lang="en-IN">/);
});

test('responsive preloads fetch the existing hero assets without replacing the UI', async () => {
  const html = await readOutput('index.html');
  for (const [image, media] of [
    ['/images/mobile-portrait.png', '(max-width: 767px)'],
    ['/images/banner.jpg', '(min-width: 768px)'],
  ]) {
    const preload = (html.match(/<link\b[^>]*rel="preload"[^>]*>/g) || []).find(link => link.includes(`href="${image}"`));
    assert.ok(preload, image);
    assert.ok(preload.includes(`media="${media}"`));
    assert.ok(preload.includes('as="image"'));
    assert.ok(preload.includes('fetchpriority="high"'));
    await access(new URL(`../dist${image}`, import.meta.url));
  }
});

test('the retained Patient Resources section links to its original sources', async () => {
  const html = await readOutput('index.html');
  assert.match(html, /Patient Resources/);
  assert.match(html, /https:\/\/www\.nhs\.uk\/conditions\/ivf\//);
  assert.match(html, /https:\/\/www\.hfea\.gov\.uk\/choose-a-fertility-clinic\//);
  assert.doesNotMatch(html, /New Fertility Treatment Shows 70%/);
});

test('crawler endpoints contain real text and XML rather than homepage HTML', async () => {
  const robots = await readOutput('robots.txt');
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/drshabnamsfertility\.com\/sitemap\.xml/);
  assert.doesNotMatch(robots, /<!doctype html>/i);
  const sitemap = await readOutput('sitemap.xml');
  assert.match(sitemap, /<urlset\b/);
  assert.match(sitemap, /<loc>https:\/\/drshabnamsfertility\.com\/<\/loc>/);
  assert.equal((sitemap.match(/<loc>/g) || []).length, 1);
});

test('the homepage retains the original hero, statistics and contact form', async () => {
  const html = await readOutput('index.html');
  assert.match(html, /Compassionate Care at Every Step of Your Journey/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /aria-label="Key statistics"/);
  assert.match(html, /class="about-experience"/);
  assert.match(html, /<form\b[^>]*class="contact-form"[^>]*action="#"/);
});

test('the homepage retains original section navigation and image references', async () => {
  const html = await readOutput('index.html');
  for (const section of ['home', 'services', 'about', 'gallery', 'testimonials', 'news', 'contact']) {
    assert.ok(html.includes(`href="#${section}"`), section);
    assert.ok(html.includes(`id="${section}"`), section);
  }
  assert.match(html, /src="\/images\/sfgc-logo\.png"/);
  assert.match(html, /src="\/images\/mobile-portrait\.png"/);
  assert.doesNotMatch(html, /href="\/ivf-treatment-pondicherry\/"/);
});

test('the not-found document is distinct and does not canonicalize to home', async () => {
  const html = await readOutput('404.html');
  assert.match(html, /Page not found/);
  assert.match(html, /name="robots" content="noindex/);
  assert.doesNotMatch(html, /rel="canonical"/);
});
