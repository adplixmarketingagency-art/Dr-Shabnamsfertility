# Competitor follow-up release — 25 November 2026

This follow-up compares the six competitors observed in the earlier ChatGPT answers, adds verified Maps identity relationships to the existing clinic schema, and prepares IndexNow notification of canonical published updates. Read the [comparison and prioritized queue](competitor-gap-plan-2026-11-25.md) for sources, the owner fact packet and future content brief. Technical changes do not establish ranking or recommendation gains.

## Local validation

Build and lint passed, with 10 SEO output tests, 2 worker tests and 17 IndexNow tests. Local Cloudflare HTTP verification passed 10 tests, with the production-only HTTP normalization test skipped. The dry run lists only the homepage and sends no requests. Independent review identified an exclusion-directive safeguard defect; quoted/unquoted meta attributes and `none` directives now have regression coverage.

All 73 protected source/image files, the rendered body and UI bundle references match the pre-follow-up baseline. The homepage is 27,505 bytes, SHA-256 `a6f235ce301d62acde21956753dc577ca1b482220557011ea67236b50d4c5aec`. UI, visible text, navigation, forms, images, statistics and animations are unchanged. Patient Resources remains at `#news` with navigation label News. Draft routes remain unpublished and outside the sitemap.

Local Graphify update completed using AST extraction: 262 nodes, 354 edges, 15 communities. The graph remains local navigation data; no remote semantic extraction or global merge was used.

## Delivery status

Implementation commit `33072bc0e91248e9fcd817e219ad907a23750450` was pushed atomically to the agency repository's `main` and `codex/seo-geo-foundations` branches. [CI run 45656621012, attempt 2](https://github.com/adplixmarketingagency-art/Dr-Shabnamsfertility/actions/runs/45656621012) completed successfully, including all 11 production HTTP tests. The implementation deployment's Cloudflare version is `172d929f-52da-4bee-ba3c-0a182f2b109b`.

The first attempt deployed version `d1f6abae-66a7-4818-8970-4c644c36265a`, but its immediate schema assertions passed for the Googlebot simulation and failed for reader/OAI simulations because Maps data was absent. This mixed response is consistent with deployment propagation; it is not evidence of bot-specific serving logic. A fresh complete production run passed all 11 tests. CI was rerun and passed without a source change. The first attempt skipped notification.

CI attempt 2 sent one homepage notification and received **IndexNow HTTP 202: URL received, key validation pending**. This is not confirmation of completed ownership validation, crawling, indexing, placement or ChatGPT recommendation. No manual duplicate submission was made. A later documentation-only delivery does not change the published page and is configured to skip notification.

Live reader, Googlebot simulation and OAI-SearchBot simulation responses were each 200 and byte-identical to the 27,505-byte build. The deployed key file returned 200 `text/plain` and matched the local public ownership key. These are HTTP simulations, not genuine crawler-IP/WAF evidence. Sanitized details are in [the follow-up evidence](competitor-release-evidence-2026-11-25.json).

## Remaining evidence and access

The [visibility record](visibility-observations-2026-11-25.json) preserves the earlier Google appearance and two ChatGPT omissions without claiming a trend or causal effect. Clinic GBP access, confirmed contact/hours and clinical facts, genuine OAI crawler-IP/WAF evidence, Bing property access and the full prompt panel remain open. No external profile corrections, review messages or outreach were sent. A content brief is prepared; no new visible medical/doctor/cost page was published.
