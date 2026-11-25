# Search launch checklist — existing single page

Prepared **25 November 2026, Asia/Kolkata**. Target query: **best ivf center in pondicherry**, including natural Puducherry/centre variants. This is an owner handoff, not a ranking forecast. **Strict scope: preserve the current UI and single-page structure.** The approved release preserves the existing page and Patient Resources. The agency Search Console URL-prefix property is now verified; the sitemap is submitted. No clinic GBP fields were edited. Earlier multipage proposals are superseded by `implementation-status.md` for this launch.

Reuse the existing [proof ledger](clinic-proof-ledger.md), [profile audit](local-profile-audit.md), [citation ledger](citation-ledger.csv), [measurement dictionary](measurement-dictionary.md) and [frozen AI panel](ai-prompt-panel.csv). Their unapproved facts and unrun baselines remain unresolved; this checklist adds a production recheck and release gates.

## Historical pre-release production baseline

Read-only GET checks at approximately **09:46–09:49 UTC / 15:16–15:19 IST, 25 November 2026**. Host: `https://drshabnamsfertility.com/`. Evidence: `/tmp/drshabnam-seo-geo-20261125/search-launch/`, particularly `http-summary.json`, endpoint bodies/headers, `sources.json` and `live-bundle.raw`. Temporary evidence is not durable; retain an approved copy outside `/tmp` with the eventual release record.

| Check | Observed result | Implication / limitation |
|---|---|---|
| HTTPS homepage | 200 `text/html`, 1,542 bytes; empty `#root`; no body H1, canonical or JSON-LD in the initial response | Local prerender/metadata work is not observed on production. This says nothing definitive about JS-rendered schema or Google's rendered/indexed version. |
| `/robots.txt`, `/sitemap.xml` | Both 200 `text/html`, byte-identical to homepage | Neither is serving the intended crawler document. Do not infer a valid allow/block policy from this HTML. |
| `/seo-geo-check-missing-20261125`, `/images/seo-geo-check-missing-20261125.png` | Both 200, same homepage HTML | Catch-all success responses; require real 404s. Not a Search Console-confirmed soft-404 classification. |
| `/contact.html` | 200, same HTML; no redirect | Intended legacy redirect is not observed. |
| HTTP homepage | 200, same HTML, no redirect in this request | Verify server-side HTTPS normalization; HSTS is not evidence of an HTTP redirect. |
| `https://www.drshabnamsfertility.com/` | Name resolution failed from this environment | Alternate-host configuration remains unresolved; not proof of a global outage. |
| Googlebot and current documented OAI-SearchBot/1.4 user-agent requests | 200, same shell | User-agent simulation only. It does not establish requests from genuine crawler IPs, WAF acceptance, crawl history or indexing. |
| Public indexing checks | Google `site:` HTTP response was a JS/redirect interstitial; Bing RSS returned unrelated domains; web search tool returned no usable evidence | **Current Google/Bing indexing, rankings and AI visibility unknown.** No zero-index count or rank inferred. |

Shared endpoint body SHA-256: `502cda35fc50e3ddee956eabf22947429379fca7c09bf05b42701d553f3a6fea`. The current live JavaScript bundle also contains the inherited email mismatch and placeholder form described below; no submission was attempted.

## Verified release and account results — 25 November 2026

Production version **f2547ead-45e3-4cf3-9799-9427e7c82e71** supersedes the historical baseline above. Build, lint, **10 SEO output tests**, **2 worker tests** and **11 live HTTP tests** passed. The canonical domain delivers the prerendered page, metadata/schema, actual crawler documents, real 404s and permanent legacy redirects. Apex HTTP redirects to HTTPS with path/query preserved. The www hostname still requires a DNS decision; no DNS edit was made. See `release-evidence-2026-11-25.json` for sanitized results and the built/live HTML comparison.

Search Console in the agency profile now has verified HTML-tag ownership of **https://drshabnamsfertility.com/**. `/sitemap.xml` reports **Success**, last read **25 November 2026**, **1 discovered page**. The homepage's indexed result says **URL is on Google / Page is indexed**; the **3:50 PM** live test says **URL is available to Google / Page can be indexed**. A refresh request returned **Indexing requested**. It remains pending recrawl, rather than proof that the latest release has replaced the indexed version.

Manual actions and security issues both report **No issues detected**; robots.txt is **Valid**. Search generative AI is **Include**, inherited from `drshabnamsfertility.com`, with no control change. The visible navigation does not expose a dedicated Generative AI report; performance data is processing. Report availability, AI impressions, rankings, Maps placements and enquiries remain unknown. The agency GBP account lists its own agency business only; clinic access remains unresolved.

## Owner launch gates

The technical release and Search Console submission above are completed; remaining gates below are open or partial. Assign named owners and record actual dates/evidence before marking complete. Technical readiness, clinical approval and account setup are separate gates.

- [ ] **Clinic owner + clinician — approve facts first.** Resolve ledger F01–F10/F14–F15: actual name, domain, address/entrance, monitored contacts/hours, credentials/current registration and where each IVF stage occurs. Reconcile the two registry records; do not infer an on-site lab, current certificate validity, outcomes or superiority. Keep unsupported numbers/testimonials withheld from new metadata/schema/profile submissions. **Pass:** dated accountable approval per reused fact; unresolved facts explicitly excluded from new assertions.
- [ ] **Owner — acknowledge inherited enquiry blockers.** Visible `dr.shabnamclinical@gmail.com` links to `mailto:dr.shabnamkhan@gmail.com`; the form retains `action="#"`, POST, without an established delivery integration. These are preserved under the no-UI-change constraint. **Pass:** record their unresolved status and an owner-verified existing contact path; never count submit clicks as delivered enquiries or promise a working booking form. Any visible correction needs separately scoped work. Technical SEO readiness does not close these blockers.
- [x] **Release owner — deploy the reviewed single-page technical build through the authorized workflow.** **Pass on the actual custom domain:** homepage 200 with meaningful initial HTML matching the retained page; one intended canonical; no accidental `noindex`/snippet suppression; parseable metadata/JSON-LD containing only approved visible facts. Compare desktop/mobile rendering and interactions with the retained UI. Existing local checks do not satisfy this production gate. [G1, G5]
- [ ] **Hosting owner — recheck routing and crawler files.** **Pass:** `/robots.txt` is valid plain text with intended public-content access and the canonical sitemap reference; `/sitemap.xml` is valid XML listing only the indexable homepage, not fragments or unpublished draft routes; missing documents/assets and unpublished routes return 404; `/contact.html` permanently redirects to `/#contact`; HTTP and any configured alternate host normalize to the approved HTTPS host without loops. Record hop/status/media-type evidence and resolve `www` DNS/TLS policy. Use real modification dates only.
- [ ] **Hosting owner — verify discovery separately from training.** **Pass:** applicable robots groups allow Googlebot and OAI-SearchBot for intended public content; CDN/WAF does not challenge verified crawler traffic. Use OpenAI's current published IP ranges, not user agent alone, when validating real requests. GPTBot training policy is a separate owner choice; ChatGPT-User is user-triggered retrieval, not the automatic search-discovery control. No need to open training access to pursue search discovery. [O1]
- [ ] **SEO reviewer — validate schema honestly.** **Pass:** inspect raw and rendered markup; parse JSON-LD and check visible-fact alignment; run applicable rich-result validation and record unsupported types separately from syntax errors. No fabricated ratings, facilities, credentials, outcomes, coordinates or social ownership. Schema helps interpretation/eligible features; validation, MedicalClinic markup and bot access guarantee neither indexing nor ranking nor AI citation. No special AI schema or `llms.txt` is required by Google. [G1, G5]

## External account requirements

The Search Console actions and effective AI setting were checked as recorded above. The remaining actions require appropriate roles and verified facts; missing clinic GBP access does not establish that the public listing is unverified. Missing access is not proof of a missing or defective profile.

| Owner / account | Action | Measurable acceptance evidence |
|---|---|---|
| Owner + GBP manager | Identify existing clinic/practitioner profiles and verification; reconcile structure before creating/merging. Use real signage name, few accurate categories, approved location/pin, hours, phone and working homepage/appointment destination. Use the existing profile audit. | Actual Maps URL/profile ID, verified role/status and dated before/after field record; only evidenced corrections; no keyword-added “best IVF center” name. [G6] |
| GBP manager + operations | Reconcile existing citations; use genuine approved premises/team evidence and optional honest-review workflow. | Citation ledger action/recheck dates; approved neutral invitation/replies. No incentives, positive-only selection, keyword demands, staff quotas or disclosure of treatment/patient identity. No review invitations sent here. [G2, G7] |
| GSC owner + SEO lead — completed | Verified correct URL-prefix property; submit working sitemap after release; inspect homepage indexed result **and** live URL test. Check canonical, fetch/render, indexing reason, manual actions/security reports. | Dated sitemap status and URL Inspection records distinguishing last indexed/crawled version from live eligibility. If excluded/pending, retain exact reason; submission/live success is not indexing. [G4] |
| GSC owner — setting checked; report unavailable in current navigation | Check effective **Search generative AI** inclusion, including parent-property inheritance; inspect available Generative AI report. | Effective setting and report availability captured. Current dedicated report measures impressions for AI Overviews/AI Mode; do not invent AI clicks/CTR/position. Missing report may mean insufficient impressions. [G1, G3, G8] |
| Bing Webmaster Tools owner | Verify/import the correct site, submit canonical sitemap, inspect homepage and available search/AI Performance reports. | Property role, submission/status, crawl/index evidence and dated native report export or “unavailable.” Bing Places ownership/verification is a separate check. AI citation counts are not recommendation or placement scores; Bing setup is not a guarantee of ChatGPT inclusion. [B1, O1] |

Google describes local visibility through relevance, searcher distance and prominence/popularity; better placement cannot be requested or purchased. Accurate profiles, genuine reputation and useful evidenced information are practical work, not a promise to rank first. Treat “best…” as the measured query rather than a self-awarded claim. A single page and fixed UI limit the amount of additional patient guidance this release can publish; later content expansion requires its own scope. [G2]

## Measurement and follow-through

- [ ] **Analytics/SEO owner:** use the existing dictionary and panel rather than create competing baselines. Capture available GSC India organic query/page data, separating branded/nonbranded and Pondicherry/Puducherry variants; record exact date range, device and missing history. Do not label data collected after changes as pre-change.
- [ ] **Local SEO owner:** freeze exact queries, real sample origins, language/device/session conditions and dates for Maps observations. Keep Maps placements separate from GSC average position. **Pass:** comparable n/N evidence and actual profile URLs; no observed placement yet.
- [ ] **GEO owner + clinical reviewer:** run the existing 12-prompt × four-surface × three-repeat panel only with permitted access. **Pass:** 144 planned observations, completed/planned counts, unavailable/error labels, exact citations and separate mentions/recommendations/fact accuracy. Unrun or unavailable stays unknown; investigate wrong contact/location/clinical assertions. Reuse the dictionary's denominators.
- [ ] **Operations owner:** privately confirm actual enquiries/bookings/attendances as aggregate counts; clicks remain clicks. Never send patient/contact/message/clinical text to analytics. Current placeholder form cannot support a confirmed-receipt success event.
- [ ] **Coordinator:** review at actual elapsed days 30/60/90; if baseline starts 25 November, dates are **25 December 2026, 24 January 2027 and 23 February 2027**. Record real launch/access dates if delayed. **Pass:** dated evidence, remaining blockers and next actions; rankings and AI inclusion remain observed outcomes, never release guarantees.

## Sources and research provenance

Official pages below were fetched successfully and relevant text read on 25 November 2026. Use the newer Google optimization guide and dedicated participation/report docs together: the older AI-features page omits the newer participation/report details.

- **G1:** Google, [Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- **G2:** Google, [Improve local ranking](https://support.google.com/business/answer/7091?hl=en).
- **G3:** Google, [Search generative AI participation](https://support.google.com/webmasters/answer/16908024).
- **G4:** Google, [URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en).
- **G5:** Google, [Structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- **G6:** Google, [Business representation and practitioner guidelines](https://support.google.com/business/answer/3038177?hl=en).
- **G7:** Google Maps, [Prohibited content / fake engagement](https://support.google.com/contributionpolicy/answer/7400114?hl=en).
- **G8:** Google, [Generative AI performance report](https://support.google.com/webmasters/answer/16984139).
- **O1:** OpenAI, [Bots and independent controls](https://developers.openai.com/api/docs/bots); [current SearchBot IP ranges](https://openai.com/searchbot.json).
- **B1:** Bing, [AI Performance in Webmaster Tools](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/).

Practitioner companion: installed `seo-audit` refers to `ai-seo`. Re-fetched/read the core [coreyhaines31/marketingskills ai-seo skill](https://raw.githubusercontent.com/coreyhaines31/marketingskills/71b8044dc40df7878563e297f77d0241d99d8795/skills/ai-seo/SKILL.md), version **2.12.7**. GitHub's [commit API](https://api.github.com/repos/coreyhaines31/marketingskills/commits/71b8044dc40df7878563e297f77d0241d99d8795) confirms revision/date **20 November 2026** and includes both companion skills. Skill SHA-256: `1eb9e2c4d35adc3b98e10703c03909a92d2e45244095287f88e023ce7c307024`, matching prior research. Read as text only; no global installation, scripts or external account actions. Bundled references were unavailable locally and were not read. Adopted repeatable monitoring and citation-versus-recommendation distinctions; did not adopt vendor uplift percentages, fixed answer lengths, blanket machine-file advice or simplistic search-provider/index guarantees.

Graph context: existing `graphify-out/graph.json` identifies `Contact.jsx`; source and live bundle verified the contact blockers. CLI unavailable on PATH and wiki absent, so query/update could not run; graph treated as stale navigation only. This task changes only this new document and temporary reports; no source/UI or existing-ledger edits.
