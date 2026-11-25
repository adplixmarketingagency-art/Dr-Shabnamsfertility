# SEO and GEO strategy — Dr. Shabnam, Pondicherry

Prepared: **25 November 2026**, Asia/Kolkata. Research completed by four specialists covering technical SEO, local search, GEO, and medical credibility, with a coordinating live-site audit.

## Objective and decision

Increase qualified appointment enquiries from people researching fertility and IVF care in Pondicherry/Puducherry, including **“best ivf center in pondicherry.”** Measure three distinct surfaces: organic website results, Google Maps/local results, and AI answers. A number-one position, a Maps placement, an AI recommendation, or a treatment outcome cannot be guaranteed.

**Recommended approach:** retain React, Vite and Cloudflare; generate meaningful HTML for a small set of useful pages; establish consistent, evidenced clinic facts; improve local reputation and patient information; then measure discovery and enquiries. Use Pondicherry/Puducherry and centre/center naturally on the same relevant pages. Do not create duplicate pages for spelling variants.

The implementation plan is `docs/superpowers/plans/2026-11-25-seo-geo-implementation.md`.

## What was checked

- Actual repository: `/Users/suganthanpraba/Documents/drshabnam/drshabnam-react`; local `main` tracks `adplix/main`. Existing source/image changes predate this work and must be preserved.
- Production: `https://drshabnamsfertility.com/`. Direct HTTP checks, browser-rendered DOM, resource transfers, current source and deployment configuration were inspected on 25 November.
- Graphify: the saved graph contains 82 nodes and 137 edges. The CLI is unavailable on PATH, so Python traversal provided navigation before source verification. The graph is stale: production includes Cases, while the current local App includes Features and does not mount Cases. Reconcile the intended release before deployment.
- Discovery: Agent Reach/Exa and web search, followed by primary-source checks. These are not a location-controlled Google ranking study.
- Accounts not inspected: Search Console, Google Business Profile, Bing Webmaster Tools, analytics and Cloudflare dashboard. Traffic, rankings, conversion rates, business-profile ownership and AI citation baselines remain unknown.

## Baseline: verified problems before promotion

| Priority | Finding and evidence | Required result |
|---|---|---|
| P0 | `/robots.txt` and `/sitemap.xml` both returned HTTP 200, `text/html`, and the same 1,175-byte homepage shell. | Actual robots text and sitemap XML, with correct content types and canonical URLs. |
| P0 | `/__seo-audit-not-a-page-20261125` and an unpublished treatment URL returned that same homepage with HTTP 200. `wrangler.jsonc:7` enables SPA fallback. | Unknown documents/assets return real 404s; only published routes return their own page. This is soft-404 risk, not proof Google has classified every URL as a soft 404. |
| P0 | Raw homepage HTML has an empty application root and no body H1; browser rendering produces the page. `index.html:15`, `src/main.jsx:6`. | Core text, links, location and metadata present in initial HTML. Google can render JavaScript; the objective is dependable access across crawlers. |
| P0 | Browser network recorded **17,420,217 bytes** for `sfgc-logo.png`. One reused URL, not two separate logo downloads. | Properly sized logo and responsive photographs; proposed budgets: logo ≤100 KB, each visible hero variant ≤250 KB, subject to visual approval. |
| P0 | `src/config/news.js:56–98` supplies invented fallback headlines, publisher labels, `#` destinations and generated current dates. One unsupported headline describes a trial success rate. | Remove demo journalism; publish only real, reviewed resources with real dates and sources. |
| P0 | Browser form has `action="#"`, POST and no `onsubmit`; no delivery implementation exists in reviewed source (`Contact.jsx:45`). | Working call/WhatsApp path immediately; a form only when delivery, receipt and error handling are verified. |
| P1 | Rendered homepage has **no canonical link and no JSON-LD**. Its H1/title do not clearly target the local treatment intent. | Unique, accurate titles/H1s, absolute self-canonicals and truthful entity metadata. No special markup guarantees ranking. |
| P1 | HTTP origin returned 200 without an HTTPS redirect in this check. `www` failed DNS resolution from the audit environment. Legacy `/DrShabnam.html`, `/DrShabnam/`, `/DrShabnam` and `/contact.html` also return the homepage. | Confirm preferred host, test DNS/TLS, normalize variants and map known legacy URLs to equivalent pages with one-hop permanent redirects. |
| P1 | Initial browser counters showed zero until animation; section visibility depends on scroll observers. `useCountUp.js:8`, `ScrollReveal.jsx:12`, `index.css:1581`. | Evidence-backed final facts and readable content before animation; enhancement must not hide services/contact. |
| P1 | Contact displays one email but its `mailto` targets another (`Contact.jsx:34`). Several business statistics, qualifications and testimonials lack supplied supporting evidence. | One approved public fact record and a claim ledger; resolve contradictions or withhold the disputed claim. |

Raw HTTP bodies shared SHA-256 prefix `a5f712de39b9`. Temporary audit evidence and specialist reports are in `/tmp/drshabnam-seo-geo-20261125/`. No PageSpeed score, field Core Web Vitals, Google index count, current rank or AI recommendation rate was measured.

## Clinic identity and medical proof

The official National ART & Surrogacy Registry contains a **matching Nellithope-address record** with identifier `PY/AC/2024/15064/L2/PUDUCHERRY/13`. It also contains an L1 record under a similar name at a different street address, `PY/AC/2022/13563/L1/PUDUCHERRY/06`. These rows were independently rechecked against the registry [R1].

The linked L2 certificate could not be verified. A listing does not, by itself, establish current certificate validity, staffing, equipment, or where each procedure currently occurs. Ask the owner to reconcile the two records and provide the current certificate and service-location details; do not infer wrongdoing or expiry.

| Fact family | Evidence now | Publication rule |
|---|---|---|
| Name/address | Existing site plus matching registry address | Confirm trading-name spelling and customer entrance; use consistently in site, schema and profiles. |
| Phone/email/hours | Three site phone numbers, differing email destinations; registry has another email | Owner selects primary appointment contact and confirms staffed hours before listing cleanup. |
| Qualifications/experience | Site claims M.S OBG, fellowship/training and 15+ years | Verify council registration, institutions/award details and dates. Distinguish total experience from years at this location. |
| IVF facilities/pathway | Services advertise IVF/ICSI; About describes associations with other centres; matching registry listing exists | Document where consultation, monitoring, retrieval, embryology, transfer and storage occur. Explain partner delivery where applicable. |
| Volumes/outcomes | Source claims 5,000+ patients, service totals, and selected surgical outcomes | Publish only dated, defined and documented figures. Never convert a testimonial or preserved anatomy into a live-birth claim. |
| Testimonials/cases | Selected names, fixed stars, Google icon and social links; original evidence/permissions not supplied | Check original source, date, location, faithful quotation and publication permission. Omit unverified items; do not create an aggregate rating. |

Each clinical page needs its actual author/reviewer, verified relevant credentials, real publication/review dates, primary references, balanced limitations and a correction contact. A qualified clinician reviews medical statements; the owner separately approves operational facts and prices. NHS/HFEA information can inform balanced explanations, but UK funding, registration and emergency instructions must not be presented as Indian rules [G5, M1–M2].

## Architecture choice

| Approach | Benefit | Limitation | Decision |
|---|---|---|---|
| Metadata-only changes to the current SPA | Small immediate patch | Leaves discovery endpoints, route duplication, JS dependence and thin service coverage unresolved | Useful interim fixes only |
| Build-time rendering using existing React/Vite components | Useful HTML and distinct pages while preserving the existing product/hosting | Requires a route manifest, deterministic rendering and status tests | **Recommended** |
| Full framework/CMS migration | May simplify a much larger future publishing operation | Adds migration, design and dependency work without evidence it is needed | Defer |

One approved clinic dataset supplies visible contact details and entity metadata. One route/content registry supplies paths, page titles/descriptions, canonical URLs, page content, indexability and genuine modification dates. Build client assets and a temporary server-render bundle, generate route HTML, then hydrate interactive controls. Deploy only the static output; no production Node service is required [T1].

Replace blanket SPA fallback with real static routes and a real 404 page. Keep known homepage fragments working. Set final text/counters in initial output; do not rely on an observer for access to facts. Preserve the restrictive CSP, adding only origins actually needed by chosen integrations [T2].

## Page and query map

Paths below are the single proposed canonical destinations. Existing URL performance must be checked before changing an established indexed destination.

| Release | Destination | Intent and minimum evidence |
|---|---|---|
| First | `/` | Fertility specialist/clinic in Pondicherry; identity, doctor, verified services, address and appointment route. |
| First, after service approval | `/ivf-treatment-pondicherry/` | Main IVF treatment/centre intent; consultation, actual procedure locations, team, process, limitations, costs approach and next step. If delivery is through partners, title and copy must say so. |
| First | `/doctor/dr-shabnam-khan/` | Named clinician, verified qualifications/registration, experience dates, current role and languages. |
| First | `/contact/` | Exact address/entrance, accessible directions, current phone/hours, appointment expectations and privacy information. |
| Next, if verified | `/iui-treatment-pondicherry/` | Distinct, reviewed IUI patient information and actual service availability. |
| Next | `/guides/choosing-an-ivf-centre/` | Satisfy “best IVF center” research through registration, team/location, costs, support and success-rate interpretation. No invented ranking or self-awarded superiority. |
| Next | `/guides/ivf-costs-pondicherry/` | Dated owner-approved estimate components/exclusions, partner charges and applicable terms. No invented rupee range. |
| Next | `/guides/first-fertility-consultation/` | Preparation, what the first appointment covers, practical support and next steps. |
| Later | `/guides/understanding-ivf-success-rates/` | Endpoints, denominators, time periods, patient mix and uncertainty. Do not present external statistics as this clinic's results. |

Homepage target and treatment-page target are complementary; do not create additional “best”, Puducherry, Pondicherry and centre/center landing pages for the same decision. Tamil content is worthwhile only with real language and clinical review capacity. No cosmetic redesign is part of this plan.

## Competitor implications

Six provider-owned sources were sampled: **Nova, Sudha, Iswarya, Blossom, Srishti and East Coast** [C1–C6]. This is a research shortlist, not a Google ranking order. The sample shows dedicated city pages, named doctors, clear addresses, treatment journeys, cost messaging, local-language information and direct appointment options. East Coast's historical IVF URL returned 404; its homepage still listed an IVF lab. Provider marketing does not independently prove clinical quality or current operations.

The opportunity is to make Dr. Shabnam's actual local pathway easier to verify: who treats the patient, where procedures take place, how an estimate is obtained, what the first visit involves, and how follow-up works. Differentiate with evidence and useful access information, not copied superlatives.

## Local SEO work

1. Inspect the correct Google Business Profile with owner access: ownership/verification, real-world name, accurate category, pin, hours, phone, website and appointment links. No profile defect is assumed without inspection.
2. Choose clinic/practitioner profile structure from actual staffing and Google eligibility. Do not add “Best IVF Center in Pondicherry” to the business name or create a profile for every specialty [G1–G2].
3. Reconcile conflicting existing maps/healthcare/local listings before creating more. Prioritize sources patients use and legitimate professional/partner references; no paid ranking-link campaign.
4. Establish an optional, neutral honest-review process. No incentives, positive-only selection, wording demands or staff quotas. Responses must not disclose or confirm patient treatment [G3–G4]. Drafting does not send any request.
5. Publish approved premises/team/access photos and actual updates. Do not invent branches, patients, awards or facilities. Outreach and external profile changes are separate account actions, not completed by this plan.

Google describes local visibility through relevance, distance and prominence/popularity. A strong web page cannot eliminate searcher-distance differences [G1].

## GEO work grounded in current platform guidance

- Publish readable, substantive answers to patient questions, followed by evidence, context and a practical local next step. Use normal headings and useful tables; no fixed answer-word-count rule or separate hidden AI copy [A1].
- Permit intended public search discovery in robots and hosting/CDN policies. Check Googlebot and OAI-SearchBot access; OpenAI documents separate search discovery, user retrieval and training purposes. A decision about GPTBot is separate from ChatGPT search access [A4].
- With owner access, inspect Search Console's effective **Search generative AI** participation setting. The current Google documentation provides a dedicated participation control [A2].
- Add truthful MedicalClinic/Physician and applicable page/breadcrumb metadata describing visible, approved facts. Validate vocabulary separately from Google rich-result eligibility. Do not add self-serving rating markup [G6].
- Do not sell `llms.txt`, a markdown pricing file, special schema, IndexNow or a bot visit as an assured citation lever. Google's current guide requires no special AI files. FAQ rich results were retired beginning 7 May 2026; useful visible questions and answers remain appropriate [A1, A6].
- Earn accurate third-party mentions through actual professional relationships and useful education. No invented reviews, spam, fake independent rankings or bulk doorway content.

## Measurement and definition of success

Establish available 28-day pre-change data; if accounts have no history, record the absence and start a baseline. Separate branded/nonbranded demand, Pondicherry/Puducherry variants and mobile/desktop. Set a numerical lead-growth target after seeing real volumes and clinic capacity; none is fabricated here.

| Track | Record | Interpretation |
|---|---|---|
| Organic | Search Console queries/pages, impressions, clicks and average position | Website results, not Maps position or booked appointments. |
| Maps | Comparable fixed-location observations plus available GBP interactions | Record query, actual coordinates, device/language, date and session conditions. Call-button clicks are not answered calls or visits. |
| Google AI | Generative AI performance report when available | Current report is **impressions only**, not AI clicks, CTR or position; insufficient impressions can mean no report [A3]. |
| Bing AI | Available AI Performance citations, cited pages and grounding samples | Product-specific evidence; not a universal AI ranking score [A5]. |
| AI prompt panel | Mentions, linked citations, explicit recommendations and supported facts | Separate these outcomes and publish numerators/denominators. Small changes can be noise. |
| Clinic outcomes | Qualified enquiries, booked/attended consultations, answer rate and response time | Confirm privately through clinic operations. Analytics receives no names, contact text, symptoms or treatment details. |

Proposed GEO panel: **12 stable prompts × 3 repeats × 4 named surfaces = 144 observations per wave**, at baseline and days 30/60/90, subject to permitted access and effort. Surfaces: ChatGPT Search, Google AI Mode, Bing/Copilot and Perplexity. Google AI Overviews can be checked separately alongside organic queries; do not silently add it to the panel denominator. Keep unavailable products, test errors, no AI answer, no clinic mention, citation and recommendation distinct. Do not seed the clinic URL into nonbranded tests.

Prompts cover: best IVF centre in each city spelling; choosing a centre; costs; local fertility specialist; Nellithope consultation; IUI/IVF decision support; first visit; and four branded checks for address, actual service location, qualifications and booking. Freeze exact wording and locale before the baseline. The panel is an operational sample, not market share.

Day-90 success means reliable crawl/render/status behavior, accurate approved clinic facts, useful reviewed pages, functioning enquiry paths, consistent local profiles, a compliant review process, and measured demand/lead movement. Rankings and citations are observed outcomes rather than release guarantees.

## Sources and research limits

All accessed on **25 November 2026**. URLs are retained for independent verification. Skill advice is subordinate to official platform documentation. No patient records, credentials or private configurations were indexed or disclosed.

| ID | Primary source / reference | URL |
|---|---|---|
| R1 | National ART & Surrogacy Registry, registered clinics | `https://registry.artsurrogacy.gov.in/clinic/list?type=register-clinic` |
| G1 | Google: local ranking | `https://support.google.com/business/answer/7091?hl=en` |
| G2 | Google: business representation and practitioner rules | `https://support.google.com/business/answer/3038177?hl=en` |
| G3 | Google Maps: prohibited/fake engagement | `https://support.google.com/contributionpolicy/answer/7400114?hl=en` |
| G4 | Google: review requests | `https://support.google.com/business/answer/3474122?hl=en` |
| G5 | Google: helpful, reliable, people-first content | `https://developers.google.com/search/docs/fundamentals/creating-helpful-content` |
| G6 | Google: review structured-data eligibility | `https://developers.google.com/search/docs/appearance/structured-data/review-snippet` |
| A1 | Google: current generative AI optimization guide | `https://developers.google.com/search/docs/fundamentals/ai-optimization-guide` |
| A2 | Google: Search generative AI participation | `https://support.google.com/webmasters/answer/16908024` |
| A3 | Google: Generative AI performance report | `https://support.google.com/webmasters/answer/16984139` |
| A4 | OpenAI: documented bots and controls | `https://developers.openai.com/api/docs/bots` |
| A5 | Bing: AI Performance | `https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/` |
| A6 | Google documentation updates, FAQ retirement | `https://developers.google.com/search/updates` |
| T1 | Vite: SSR and build-time prerendering | `https://vite.dev/guide/ssr.html` |
| T2 | Cloudflare Workers static-asset routing | `https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/` |
| M1 | NHS: IVF patient information | `https://www.nhs.uk/conditions/ivf/` |
| M2 | HFEA: choosing a clinic and interpreting success rates | `https://www.hfea.gov.uk/choose-a-fertility-clinic` |
| C1 | Nova, Puducherry | `https://www.novaivffertility.com/ivf-centre/puducherry/fertility-clinic-puducherry` |
| C2 | Sudha, Pondicherry | `https://sudhafertilitycentre.com/fertility-centre-in-pondicherry` |
| C3 | Iswarya, Pondicherry | `https://www.iswaryafertility.com/ivf-centers/pondicherry/pondicherry` |
| C4 | Blossom | `https://www.blossomfc.com/` |
| C5 | Srishti | `https://www.srishtiivf.in/` |
| C6 | East Coast, current homepage | `https://eastcoasthospitals.com/` |

Skills applied: installed **seo-audit** and local SEO references; the core **ai-seo** companion from `coreyhaines31/marketingskills`, version 2.12.7, read at commit `71b8044dc40df7878563e297f77d0241d99d8795`; Graphify, Agent Reach, brainstorming, parallel-agent and writing-plans workflows. The companion was read as text, not installed; its unavailable bundled references were not represented as read. Vendor percentages and machine-file claims were not adopted as client forecasts.

Tool maintenance note: Agent Reach reports v1.6.1 available over installed v1.5.0. No tool upgrade is part of this work.
