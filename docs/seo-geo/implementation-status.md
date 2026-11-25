# SEO/GEO implementation status

25 November 2026, Asia/Kolkata. Branch: `codex/seo-geo-foundations`.

## Competitor follow-up

The [competitor gap plan](competitor-gap-plan-2026-11-25.md) records the six-provider comparison and remaining fact/access work. The [competitor release record](competitor-release-2026-11-25.md) tracks Maps identity markup, IndexNow notification tooling and current delivery evidence. The original rendered body, UI bundles and 73 protected source/image files are unchanged in this follow-up.

The [ad hoc observations](visibility-observations-2026-11-25.json) show the clinic in the inspected Google organic and AI Overview results but omitted from two signed-out ChatGPT answers. These are limited observations, not a neutral rank, a trend or evidence of a deployment effect. The frozen 144-observation panel remains unrun.

## Released implementation

The user requested the original UI be restored while keeping the Patient Resources replacement for news. This supersedes the earlier four-page review build.

- The original hero, navigation, footer, statistics, features, contact form, hours, experience badge, image references, styles and reveal/count-up animations are restored. App, stylesheet, Nav, Footer, Hero, Contact and Features match the pre-SEO snapshot byte-for-byte. Existing unrelated source/image edits are preserved.
- Patient Resources remains at `#news` with NHS and HFEA links, using the existing news layout. The original navigation label remains “News”.
- The homepage is prerendered into readable initial HTML and hydrated in the browser. The title is now “IVF & Fertility Specialist in Pondicherry | Dr. Shabnam”; the description identifies Nellithope and both Pondicherry/Puducherry. Canonical, Open Graph and Twitter metadata agree. `en-IN`, share-image dimensions and search-preview directives are explicit. No “best” claim was added.
- JSON-LD now connects `MedicalClinic`, `WebSite` and `WebPage` with stable IDs and matching canonical/identity information. It references the same clinic images and NHS/HFEA resource links shown on the page. No ratings, outcomes, credentials, operating hours, unverified social ownership, coordinates or on-site IVF facility claims were added to the structured data.
- The sitemap now includes only the homepage. The restored App does not mount the draft service, doctor or contact pages; those URLs return 404 rather than duplicate homepage content. Their draft source remains on disk, outside the published build.
- Robots text, a distinct noindex 404 document and legacy redirects remain. `/contact.html` redirects to `/#contact`, matching the restored single-page navigation.
- Original image paths, dimensions, pixels and color metadata are preserved. Lossless recompression reduced `sfgc-logo.png` from 17,420,217 to 13,437,879 bytes and `mobile-portrait.png` from 1,810,995 to 1,539,384 bytes: **4,253,949 bytes saved**. Full RGBA equality and non-IDAT metadata equality were verified. The added WebP assets remain on disk; the hero WebP is still used for social sharing metadata.
- Responsive preloads prioritize the existing desktop `banner.jpg` or mobile portrait without changing image references in the UI. Fingerprinted `/assets/*` bundles use one-year immutable caching. Mutable images, HTML and crawler files retain revalidation. The obsolete NewsAPI CSP connection permission was removed.
- CI runs build, lint, SEO output checks and worker tests before deployment, then verifies the public site. Wrangler is pinned to 4.168.0. Dependency updates from the initial implementation remain. The worker normalizes apex HTTP and routed www requests to canonical HTTPS with 308 redirects, preserving path/query; DNS remains a separate requirement.
- Strategy, proof ledger, citation audit, AI prompt panel and measurement documents remain planning material. No external profile edits or review messages were performed.
- The SEO Audit skill and a pinned public AI SEO skill informed this pass; platform claims were checked against official sources. The wildcard robots rule already allows search discovery, so no redundant bot allowlist or speculative AI-only file was added. See `search-launch-checklist.md` for dated sources and release/account steps.

## Initial-release verification (historical)

- `npm run build`: passed; generated one homepage and its sitemap.
- `npm run lint`: passed.
- `npm run test:seo`: 10 passed, covering readable HTML, the connected identity graph, aligned metadata, responsive asset preloads, original UI/navigation, resources and crawler documents.
- `npm run test:seo:http`: 7 passed against the local Cloudflare runtime at `http://127.0.0.1:8787/`, including response cache and security headers.
- HTTP checks confirm homepage HTML, correct robots/sitemap media types, real 404s for unknown documents/assets and unpublished draft routes, and the intended permanent legacy redirects.
- The in-app browser was reloaded after the build. It shows the new document title, original hero and retained Patient Resources; rendered JSON-LD contains the three connected entities. No horizontal overflow or captured browser error/warning logs were observed. Navigation/form interactions were verified during restoration; their source is unchanged in this pass.
- SHA-256 comparison confirms **all 22 component/hook/App/CSS/resource source files** are unchanged from the start of this pass. Image verification evidence and backups are in `/tmp/drshabnam-seo-geo-20261125/`.
- Graphify was recovered through `uv tool run --from graphifyy`. `graphify update .` completed locally after the final worker changes: 223 nodes, 300 edges, 15 communities. Generated runtime/cache paths were excluded and stale nodes pruned. This is code AST coverage; unsupported headers/CSV files and prose are not semantically indexed. No remote semantic extraction or global graph merging was enabled.
- Production release **f2547ead-45e3-4cf3-9799-9427e7c82e71** is live at the canonical custom domain. `npm run test:worker`: **2 passed**. `npm run verify:production`: **11 passed**, including reader/Googlebot/OAI-SearchBot simulations, crawler documents, metadata/schema, cache/security headers, 404s, redirects and HTTP normalization. Simulations do not establish genuine OAI crawler IP/WAF access.
- Search Console ownership was verified using the public HTML tag in the agency profile. `/sitemap.xml` reports **Success**, last read **25 November 2026**, **1 discovered page**. Homepage URL Inspection reports **URL is on Google / Page is indexed**. The live test at **3:50 PM, 25 November 2026** reports **URL is available to Google / Page can be indexed**. A refresh request returned **Indexing requested**, adding the URL to the priority crawl queue; this does not prove the new version has replaced the indexed copy.
- Manual actions and security issues both report **No issues detected**. Search Console reports robots.txt **Valid**. Search generative AI participation is **Include**, inherited from the parent domain; no setting was changed. Performance data is still processing.
- Durable sanitized verification results are recorded in `release-evidence-2026-11-25.json`. Git delivery is recorded separately in `release-record-2026-11-25.md`.

## Remaining work and limitations

1. The restored form retains its pre-existing placeholder `action="#"`; message delivery is not implemented. This restoration does not establish that form submissions work.
2. Original visible claims and contact details are restored as requested. Owner/clinical verification of credentials, outcomes, hours, contact routing, testimonials and image permissions remains separate work. No approval was invented.
3. Search Console is connected and the homepage is confirmed indexed. The agency Business Profile Manager contains its own agency listing, with no clinic management role observed. Clinic profile edits therefore remain blocked on access and fact reconciliation. Bing Webmaster Tools, analytics, the AI observation panel and ranking/conversion measurements remain unexecuted.
4. The earlier 1,542-byte production shell is a historical pre-release baseline, superseded by the live prerendered release and passing HTTP checks. The www hostname failed DNS resolution from this environment; no DNS change was made. Ranking or AI citation improvement is unmeasured; the later ad hoc observations above do not establish a trend or deployment effect.
5. The preserved logo remains large at 13.44 MB. Further resizing/format replacement would need a separate image change with visual review. Existing count-up statistics begin at zero in server-rendered HTML and the form is a placeholder; preserving the current UI/animation leaves those inherited limitations in place.

Preview command (Node 20 is installed globally):

```sh
npx --yes --package=node@22 --package=wrangler@4.168.0 wrangler dev --local --ip 127.0.0.1 --port 8787 --log-level warn
```

The strategy and implementation plan in `../superpowers/` describe the broader SEO/GEO work. Their previously proposed visible UI/content changes are superseded by the restoration request above.
