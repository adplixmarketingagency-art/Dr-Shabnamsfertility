import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { render } from '../dist-ssr/entry-server.js';
import { clinic, getPageSchema } from '../src/content/clinic.js';
import { pages } from '../src/content/routes.js';

const file = new URL('../dist/index.html', import.meta.url);
const template = await readFile(file, 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--clinic-schema-->')) {
  throw new Error('The HTML template is missing its prerender markers.');
}

const escapeAttribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
for (const page of pages) {
  const canonical = new URL(page.path, clinic.origin).href;
  const schema = JSON.stringify(getPageSchema(page)).replace(/</g, '\\u003c');
  const html = template
    .replace(/<title>.*?<\/title>/, () => `<title>${escapeAttribute(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, () => `<meta name="description" content="${escapeAttribute(page.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, () => `<meta property="og:title" content="${escapeAttribute(page.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, () => `<meta property="og:description" content="${escapeAttribute(page.description)}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, () => `<meta name="twitter:title" content="${escapeAttribute(page.title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, () => `<meta name="twitter:description" content="${escapeAttribute(page.description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, () => `<meta property="og:url" content="${canonical}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, () => `<link rel="canonical" href="${canonical}`)
    .replace('<!--app-html-->', () => render(page.path))
    .replace('<!--clinic-schema-->', () => `<script type="application/ld+json">${schema}</script>`);
  const output = new URL(`../dist${page.path}index.html`, import.meta.url);
  await mkdir(new URL('.', output), { recursive: true });
  await writeFile(output, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${escapeAttribute(new URL(page.path, clinic.origin).href)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemap);
console.log(`Prerendered ${pages.length} clinic pages and their sitemap into dist/`);
