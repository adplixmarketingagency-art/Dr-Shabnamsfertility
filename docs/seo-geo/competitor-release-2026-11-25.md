# Competitor follow-up release — 25 November 2026

This follow-up compares the six competitors observed in the earlier ChatGPT answers, adds verified Maps identity relationships to the existing clinic schema, and prepares IndexNow notification of canonical published updates. Read the [comparison and prioritized queue](competitor-gap-plan-2026-11-25.md) for sources, the owner fact packet and future content brief. Technical changes do not establish ranking or recommendation gains.

## Local validation

Build and lint passed, with 10 SEO output tests, 2 worker tests and 17 IndexNow tests. Local Cloudflare HTTP verification passed 10 tests, with the production-only HTTP normalization test skipped. The dry run lists only the homepage and sends no requests. Independent review identified an exclusion-directive safeguard defect; quoted/unquoted meta attributes and `none` directives now have regression coverage.

All 73 protected source/image files, the rendered body and UI bundle references match the pre-follow-up baseline. The homepage is 27,505 bytes, SHA-256 `a6f235ce301d62acde21956753dc577ca1b482220557011ea67236b50d4c5aec`. UI, visible text, navigation, forms, images, statistics and animations are unchanged. Patient Resources remains at `#news` with navigation label News. Draft routes remain unpublished and outside the sitemap.

Local Graphify update completed using AST extraction: 262 nodes, 354 edges, 15 communities. The graph remains local navigation data; no remote semantic extraction or global merge was used.

## Delivery status

Before this follow-up, agency main and task branch matched `639f859e8bf373caf663a3597ca3baeeac2f3dc3`. The agency repository reports write access. Current follow-up commit, CI, production checks and IndexNow response will be recorded after delivery; no live notification is claimed by the local dry run.

## Remaining evidence and access

The [visibility record](visibility-observations-2026-11-25.json) preserves the earlier Google appearance and two ChatGPT omissions without claiming a trend or causal effect. Clinic GBP access, confirmed contact/hours and clinical facts, genuine OAI crawler-IP/WAF evidence, Bing property access and the full prompt panel remain open. No external profile corrections, review messages or outreach were sent. A content brief is prepared; no new visible medical/doctor/cost page was published.
