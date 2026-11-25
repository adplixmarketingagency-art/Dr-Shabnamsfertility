# SEO and GEO Implementation Plan

> **For agentic workers:** Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement task by task. Use a swarm for independent work with the disjoint scopes below. Checkboxes describe future execution; research and planning are complete, product implementation is not claimed.

**Goal:** Improve qualified discovery and enquiries for Dr. Shabnam's fertility practice in Pondicherry/Puducherry, including the intent “best ivf center in pondicherry,” across organic search, Maps and AI answers.

**Architecture:** Retain React/Vite and Cloudflare. Generate substantive static HTML from shared page/clinic data, hydrate existing interactions, serve correct statuses and crawl files, and publish clinically reviewed evidence before expanding content.

**Tech stack:** Existing React 19, Vite 8 and Cloudflare Workers static assets; Node's built-in test runner for build-output checks. No CMS/framework migration or paid SEO subscription is assumed.

**Spec:** `docs/superpowers/specs/2026-11-25-seo-geo-strategy.md`.

## Global constraints

- Preserve all pre-existing source, image and staging changes. Inspect the current diff before work; separate SEO work for review. Production and local source differ, so establish the intended release first.
- Use `https://drshabnamsfertility.com` as the proposed canonical origin, subject to owner confirmation. Use one trailing-slash destination per published page and a real 404 for unknown paths.
- Retain React/Vite/Cloudflare and the existing visual design. No new framework, CMS, directory campaign or paid service without a demonstrated need.
- Do not invent qualifications, current certification, lab facilities, prices, patient stories, clinical review events, testimonials, success rates or comparative “best” claims.
- Treatment-location, registry, contact and outcome claims must be resolved in the proof ledger or withheld. The official registry match does not replace current operational/certificate verification.
- Do not publish patient information in public code, schema, analytics, screenshots or prompts. Search/booking measurement contains no personal or medical message content.
- Keep search-discovery and model-training policies separate. No special AI file, schema, ranking placement or citation guarantee is a requirement.
- External account actions depend on authorized account access. Outreach/review invitations are drafts until expressly authorized to send.
- After code changes, run `graphify update .` when its CLI is available; if unavailable, report the limitation and retain source-based verification. Use local AST context, not remote semantic extraction or global merging.

## Review focus

1. A crawler with JavaScript disabled must receive the correct readable page, contact details and internal links, not an empty shell or zero-valued counters.
2. A direct request for an unknown URL, missing image, legacy path, alternate host or HTTP origin must return the appropriate 404/redirect, never accidentally duplicate the homepage.
3. A changed/unapproved clinic fact must not silently spread into schema, GBP copy, service pages or an inflated claim.
4. An appointment action must reach a working destination and report success only after confirmed receipt; analytics must not contain health or contact text.
5. Slow mobile networks, reduced motion and the actual CSP must not hide content, download the wrong hero, break hydration or block required measurement.

## Roadmap and owners

Calendar windows assume work begins on **25 November 2026** and are planning targets, not ranking forecasts. Account provisioning and clinical review can change delivery dates.

| Window | Deliverable | Owner | Exit criterion |
|---|---|---|---|
| Days 0–7: 25 Nov–2 Dec | Facts/access baseline; remove demo news; usable contact actions; smaller images; core crawl/render fixes | Technical lead + clinic owner | P0 checks pass in a reviewable build; disputed claims withheld |
| Days 8–21: 3–16 Dec | Main IVF pathway, doctor and contact pages; truthful schema; GBP/citation corrections; measurement | Developer + clinician + local SEO owner | Approved facts, real HTML/routes, working enquiry flow and baseline reporting |
| Days 22–45: 17 Dec–9 Jan | Cost/selection/first-visit resources; neutral review process; genuine local evidence | Clinician + editor + clinic operations | Reviewed useful pages, provenance and operating workflow |
| Days 46–90: 10 Jan–23 Feb | Improve pages from observed queries/leads; appropriate Tamil content; earned local mentions; repeat AI panel | SEO/GEO lead + clinician + operations | Comparable evidence at days 30/60/90; next priorities chosen from results |

## Swarm execution boundaries

| Lane | Owns | Must not concurrently edit |
|---|---|---|
| A — technical | Rendering/build, route registry, metadata, crawl files, hosting/status behavior, SEO checks | Lane B's article content or Lane C's CSS/assets |
| B — content/trust | Approved fact/claim ledger, doctor/service/article copy, source and review records | Global renderer, route registration or deployment configuration |
| C — performance | Image variants, responsive hero, visibility/counter enhancements, related CSS | Content, metadata, route registry or build scripts |
| D — local/GEO/measurement | Profile/citation audit, prompts, measurement definitions, account-side work when authorized | Product code owned by A–C or shared browser/profile writes |

Lane A integrates route registrations and shared-template changes sequentially. One reviewer checks the integrated result. One native/browser operator controls a given account/session at a time. No nested swarm fan-out.

### Task 1 — Establish the release and the verified fact record (P0)

**Owner:** coordinator + clinic owner. **Depends on:** none.

**Files:** create `docs/seo-geo/clinic-proof-ledger.md`; inspect existing source/deployment diffs. Keep certificates, patient records and account credentials outside public Git.

**Consumes:** source/live audit and registry observations from the spec. **Produces:** approved public identity/service facts, unresolved-claim list, access checklist and agreed release scope.

- [ ] Record current branch, staged/unstaged edits, active deployment source and a rollback reference. Preserve unrelated work; use `codex/seo-geo-foundations` or a suitable existing isolated checkout for the implementation where appropriate.
- [ ] Confirm canonical host, exact practice name, primary appointment phone/email, hours and entrance. Reconcile the two registry records; verify current certificate and where each IVF stage occurs.
- [ ] Record support for qualifications, experience, volumes, outcomes, testimonials and images. Mark each fact `approved`, `pending` or `withheld`; no patient evidence goes into the public ledger.
- [ ] Obtain appropriate roles for GBP, Search Console, Bing Webmaster Tools, analytics and Cloudflare as needed. Record access gaps without treating them as profile/indexing defects.

**Acceptance:** a developer/editor can distinguish publishable facts from pending claims; no evidence has been invented; intended source/UI release is identified. Safe technical fixes may proceed while other facts are pending.

### Task 2 — Remove misleading placeholders and repair enquiry basics (P0)

**Owner:** content lead + developer. **Depends on:** Task 1 for disputed contact facts.

**Files:** `src/config/news.js`, `src/components/News.jsx`, `src/App.jsx`, `src/components/Contact.jsx`; add source-backed resource content only when reviewed.

**Consumes:** approved contacts/claims. **Produces:** truthful resource/empty state and usable appointment actions.

- [ ] Remove invented fallback journalism, fake publisher attribution, `#` article destinations and automatically refreshed publication dates. With no real reviewed content, omit the section or show an honest empty state.
- [ ] Remove production developer/API-key instructions. If a live news integration is retained later, keep credentials server-side/build-side; do not expose a key by merely changing its Vite prefix.
- [ ] Until a delivery endpoint is ready, replace the nonfunctional form with the existing verified call/WhatsApp appointment options. Align displayed email and its `mailto` after confirmation.
- [ ] Withhold unsupported outcome/volume/testimonial claims identified by the ledger; retain useful approved service explanations. Do not replace missing proof with new numbers.
- [ ] Check rendered and initial output for placeholder headlines, fabricated dates, unverified review badges and broken contact targets; test actions on mobile/keyboard without sending patient data.

**Acceptance:** no demo medical news is presented as fact, visitors have a working next step, and a click is never reported as a completed booking.

### Task 3 — Reduce image cost and make content resilient (P0)

**Owner:** performance worker. **Depends on:** approved asset provenance; independent of build implementation.

**Files:** `public/images/` new optimized variants; `src/components/Hero.jsx`, `Nav.jsx`, `Footer.jsx`, `Stats.jsx`, `ScrollReveal.jsx`; `src/hooks/useCountUp.js`, `useInView.js`; relevant `src/index.css` rules. Coordinate shared component edits with Task 2/6.

**Consumes:** existing approved visuals and factual-stat decision. **Produces:** responsive assets and readable baseline content.

- [ ] Export a correctly sized logo from the existing source; preserve originals. Target ≤100 KB without degrading legibility. Generate appropriate WebP/AVIF photographs; target ≤250 KB per hero variant.
- [ ] Load the actual visible hero responsively; remove redundant eager hidden-image loading. Reserve dimensions, use correct sizes and keep below-fold photographs lazy.
- [ ] Render final approved facts initially. If numerical claims are unapproved, omit them rather than animating unsupported or zero-valued claims. Keep sections visible when scripts/observers fail; preserve reduced-motion support.
- [ ] Compare mobile/desktop network requests and visual quality. Capture a repeatable mobile lab baseline and post-change result; measure field performance separately when data exists.

**Acceptance:** no 17.4 MB logo request, intended hero variant requested once, readable content with JavaScript disabled/reduced motion, and no claimed PageSpeed/CWV improvement without measurements. Field goals: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at the 75th percentile.

### Task 4 — Create shared public data and useful page content (P1)

**Owner:** content worker; technical lead owns route integration. **Depends on:** Task 1 publication gates.

**Files:** create `src/content/clinic.js`, `src/content/pages.js`, and focused content/page components under `src/pages/`; adapt `Services.jsx`, `About.jsx`, `Nav.jsx`, `Footer.jsx` when integration is ready.

**Interfaces:** `clinic` exposes approved public name, address, contact, hours, doctor and service-location facts. `pages` is an array of `{path, title, description, indexable, modifiedAt, Component}`; `modifiedAt` is a real substantive revision date. No private proof documents are exported. Lane A owns the final array registration.

- [ ] Draft homepage, `/ivf-treatment-pondicherry/`, `/doctor/dr-shabnam-khan/` and `/contact/` using the spec's intent map. Treatment copy must distinguish on-site and partner procedures.
- [ ] Create concise direct answers followed by enough context: process, preparation, uncertainty, actual location, written-estimate approach and appointment next step. Use both city spellings naturally.
- [ ] Obtain real clinician review and owner fact approval. Publish accurate authorship/review dates and primary references; withhold any page that depends on unresolved core facts.
- [ ] Add IUI and the selection/cost/first-visit guides in priority order. Do not add duplicate city pages or publish thin placeholder routes simply to fill a sitemap.

**Acceptance:** each published destination answers a distinct patient decision, contains approved useful content, and has a clear real appointment path. No clinical fact is marked verified solely because source code contains it.

### Task 5 — Generate actual HTML for each published route (P0/P1)

**Owner:** technical worker. **Depends on:** Task 4 interfaces; can develop using approved existing content.

**Files:** modify `src/App.jsx`, `src/main.jsx`, `index.html`, `package.json`, `vite.config.js`; create `src/entry-server.jsx`, `scripts/prerender.mjs`, `tests/seo-output.test.mjs`.

**Interfaces:** `renderPage(pathname)` returns `{appHtml, headHtml, status}` from the shared route/data registry. `scripts/prerender.mjs` emits each route into `dist/client/<path>/index.html`; a temporary server bundle is not deployed. The browser entry hydrates the same initial page data and uses the same route resolution.

- [ ] Add meaningful failing build-output checks: homepage/doctor/contact raw HTML contain the intended content; distinct routes have distinct titles/canonicals/H1s; no unresolved content is published.
- [ ] Add client and server builds, then prerender the known routes using Vite's documented SSR/SSG pattern. Keep browser-only APIs inside effects; escape serialized metadata and JSON-LD safely.
- [ ] Use deterministic hydration and ordinary `<a href>` path links. Keep existing homepage fragments usable. Produce a readable `404.html`.
- [ ] Run `npm run lint`, `npm run build`, then `npm run test:seo` (the new script uses `node --test tests/seo-output.test.mjs`). Resolve failures before integrating.
- [ ] Inspect every published URL directly with and without JavaScript, including refresh, navigation, reduced motion and console hydration errors.

**Acceptance:** useful first-response HTML, correct unique pages and working interactive controls; no production Node server or wholesale framework migration. A successful fetch is not an indexing claim.

### Task 6 — Add metadata and truthful structured data (P1)

**Owner:** technical lead. **Depends on:** Tasks 1, 4–5.

**Files:** create `src/seo/metadata.js`, `src/seo/structuredData.js`; integrate in `src/entry-server.jsx`; extend `tests/seo-output.test.mjs`.

**Consumes:** approved clinic record and page registry. **Produces:** unique title/description, absolute self-canonical, share metadata, and visible-fact-aligned JSON-LD per page.

- [ ] Write titles/H1s for actual service/location intent, not a self-awarded “best” claim. Use the IVF-centre positioning only when the operational proof supports it.
- [ ] Add stable clinic/physician IDs and applicable address/contact/doctor/page relationships. Add breadcrumbs only for real page hierarchy and Article metadata only for real articles.
- [ ] Parse generated JSON-LD and check entity facts match visible content. Validate Schema.org syntax separately from supported Google rich-result eligibility.
- [ ] Test in raw HTML and rendered DOM under the actual CSP. Do not add self-serving aggregate ratings, FAQ-rich-result promises, invented geocoordinates or an unverified social `sameAs`.

**Acceptance:** every published page has one correct canonical, unique intentional metadata and truthful parseable markup. No blanket CSP relaxation to make a script work.

### Task 7 — Correct Cloudflare routing and crawler endpoints (P0)

**Owner:** technical worker + authorized hosting owner. **Depends on:** Task 5 route output.

**Files:** `wrangler.jsonc`, `public/_headers`; create `public/robots.txt`, `public/_redirects` where supported; generate `dist/client/sitemap.xml` from the same route registry; add `tests/seo-http.test.mjs` or equivalent deployment-check script.

- [ ] Point assets at `dist/client`; replace SPA fallback with documented real-404 handling. Keep missing images and unknown routes as 404s rather than HTML successes.
- [ ] Generate robots text and sitemap XML. Include only canonical, indexable, substantive 200 pages; use real last-modified dates, not a timestamp refreshed on every build.
- [ ] Configure confirmed host/protocol/slash normalization and explicit legacy redirects. Map `/DrShabnam`, `/DrShabnam/` and `/DrShabnam.html` to the appropriate retained destination; `/contact.html` goes to `/contact/` when that page is published. Unknown paths must not be globally redirected home.
- [ ] Check intended crawler access through robots and CDN/WAF. Search-discovery policy must not accidentally depend on opening training access; document any named-group exceptions.
- [ ] Verify a preview status matrix: homepage, each route, robots, sitemap, 404, missing asset, legacy URL, HTTP and host variants. Check real response media types, one-hop redirects and CSP.

**Acceptance:** robots is text, sitemap is XML, published HTML is correct, unknown URLs/assets are 404, and legacy/host redirects are intentional. Submit sitemap and inspect priority URLs only with authorized webmaster access; inspect indexing separately.

### Task 8 — Make local identity, reviews and citations consistent (P1)

**Owner:** GBP/local SEO lead + clinic operations. **Depends on:** Task 1 and working destinations.

**Artifacts:** `docs/seo-geo/local-profile-audit.md`, `docs/seo-geo/citation-ledger.csv`, neutral review/reply drafts. Account edits are performed only through authorized roles.

- [ ] Export/profile-audit existing facts and identify the correct clinic/practitioner structure before suggesting merges, categories or new profiles.
- [ ] Apply evidenced contact/category/hour/pin/link corrections; use the actual business name, not the target keyword. Add approved premises/team/access photos.
- [ ] Correct material conflicts in existing relevant maps, healthcare/local directories and professional/partner pages. Record evidence, access, correction and recheck date for each.
- [ ] Prepare an optional honest-review invitation and private complaint path. No incentives, gating, wording demands, quotas or patient-treatment disclosures; do not send invitations without explicit authorization.
- [ ] Record Maps observations for fixed real sample locations and the same queries/device/language. Keep them separate from organic Search Console reporting.

**Acceptance:** public facts match the approved record; correction outcomes are documented; no fabricated listing or review activity; profile views/call clicks are not reported as attended consultations.

### Task 9 — Implement enquiry and attribution measurement (P1)

**Owner:** analytics developer + operations. **Depends on:** functioning contact actions and approved measurement/account choice.

**Files:** create `src/analytics.js` if required; coordinate event bindings in relevant components with their owners. Add an enquiry endpoint only if a real form is selected; its delivery destination and data retention need owner decisions.

- [ ] Define and validate `call_click`, `whatsapp_click`, `appointment_start` and, only with confirmed delivery, `appointment_submit_success`. Distinguish these from privately confirmed booked/attended consultations.
- [ ] Instrument without patient identifiers, phone/email values, symptoms, message text or treatment histories. Use consistent GBP campaign tags; preserve tags through redirects while keeping canonicals clean.
- [ ] If adding a form, verify validation, spam controls, rate/error handling, actual receipt and an honest success state with approved test data. Otherwise keep the simpler working contact actions.
- [ ] Test events exactly once and under the actual CSP; check slow/failing submission paths and exclude test events. Export a documented baseline, annotating missing history.

**Acceptance:** reproducible measurement and confirmed enquiry receipt where forms exist; attribution is reported with its limitations. No fabricated traffic baseline or lead lift.

### Task 10 — Establish GEO observations and answer accuracy (P1/P2)

**Owner:** GEO lead + clinician. **Depends on:** baseline accounts/access; repeat after approved pages are published/indexed.

**Artifacts:** `docs/seo-geo/ai-prompt-panel.csv`, `docs/seo-geo/measurement-dictionary.md`, dated observation records without patient data.

- [ ] Freeze the spec's 12-prompt panel, exact wording, four surfaces, locale/session conditions and repeat count before the baseline. Use permitted product access; label unavailable surfaces and errors.
- [ ] Record answer presence, clinic mentions, owned linked citations, explicit recommendations and factual accuracy separately. Save evidence and counts/denominators; do not seed the target into nonbranded prompts.
- [ ] Check effective Google Search generative-AI participation. Use its current impressions-only report when available, Bing AI Performance where available, and observed referral traffic; do not invent AI-only clicks or attribute all direct traffic to AI.
- [ ] Fix inaccurate owned/public facts through the real source. Do not manipulate answers through fake mentions, fabricated statistics, hidden AI text or bulk pages. Do not prioritize `llms.txt` as a proven ranking requirement.
- [ ] Repeat at days 30/60/90; investigate critical factual errors even if citation counts increase. Clinical interpretation remains with the clinician.

**Acceptance:** comparable observations with sample sizes, evidence and missing-data labels; a citation is not described as a recommendation or a booking.

### Task 11 — Release and iterate from evidence (P0 release gate)

**Owner:** coordinator + independent reviewer + authorized deployment owner. **Depends on:** applicable publication and technical gates above.

**Files:** `.github/workflows/deploy.yml`; release checklist/report. Stage and commit only the reviewed task changes.

- [ ] Add lint, build and SEO-output checks before deployment. Review the exact patch against the initial dirty-state inventory; include no unrelated local work.
- [ ] Pass raw/rendered HTML, canonical/schema, robots/sitemap, status/redirect, CSP, mobile/keyboard, image-network and appointment checks. Clinician/owner signs off public medical/operational facts.
- [ ] Prepare the reviewable change and rollback, then release through the authorized deployment workflow. Verify the actual custom domain after deployment, not only local output.
- [ ] With appropriate access, submit sitemap/inspect URLs, check report availability and record crawl/indexing outcomes without promising timing.
- [ ] Review at days 30/60/90: organic queries, comparable Maps observations, AI panel, qualified enquiries and attended consultations. Expand only pages/services supported by evidence and review capacity.

**Completion:** report what shipped, what passed, actual before/after measurements, unresolved account/clinical dependencies and the next evidence-based action. This plan itself does not claim any deployment, ranking improvement or external profile update.
