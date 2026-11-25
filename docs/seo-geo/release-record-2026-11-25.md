# SEO/GEO release record — 25 November 2026

The approved single-page release is deployed to `https://drshabnamsfertility.com`. Cloudflare version: `f2547ead-45e3-4cf3-9799-9427e7c82e71`. The public HTML is byte-identical to the local build: 27,041 bytes, SHA-256 `8c8519900b88e02f034cca6ec3da961eb0663feede8b7f0b51837c12621a8947`.

The release includes prerendering/hydration, aligned search metadata and connected clinic schema, valid crawler documents, real 404s, legacy redirects, canonical HTTP normalization, caching and a public Search Console verification tag. It retains the approved UI, News navigation label and Patient Resources. All 65 UI/source/image hashes match the baseline taken before the linked-plan execution. Existing source/image changes relative to the older Git HEAD are included so a checkout reproduces that approved UI. Draft additional pages remain unpublished.

Build and lint passed, along with 10 SEO output tests, 2 worker tests and 11 production HTTP checks. Live requests with simulated reader, Googlebot and OAI-SearchBot agents receive the same substantive page. These simulations do not prove access from genuine OAI crawler IPs. A separate Python urllib request returned 403; broad bot/WAF acceptance is not established. The checked homepage is 200 for the tested reader requests and Google's actual live inspection passed.

Agency Search Console ownership is verified for the URL-prefix property. The sitemap reports Success, last read 25 November 2026, with 1 discovered page. The homepage is indexed; the live test reports it can be indexed. A refresh indexing request was accepted into the crawl queue. Manual actions/security reports show No issues detected. Robots is Valid. Generative AI participation is Include through parent inheritance. Performance data is processing; no ranking, AI citation or enquiry gain is claimed.

Local Graphify update completed with 223 nodes, 300 edges and 15 communities using local extraction. Generated runtime/cache paths were excluded and stale nodes pruned. No remote semantic extraction was enabled. Graph output remains local navigation material.

Git delivery target: agency repository `adplixmarketingagency-art/Dr-Shabnamsfertility`, task branch `codex/seo-geo-foundations` and production branch `main`. The runtime baseline parent is `0916b0582fa7a366d9d39e0a57040128b1615e07`. Resolve this release commit and verify remote refs with `git rev-parse HEAD` and `git ls-remote --heads adplix main codex/seo-geo-foundations`; final push/CI outcomes are reported after delivery. Local browser/runtime caches, Graphify caches and unrelated documentation are excluded from the release commit.

Remaining work: clinic GBP manager access; owner-approved contact/hours and clinical facts; www DNS policy; real OAI crawler evidence; Bing/analytics setup and the frozen AI observation panel. The inherited placeholder form and email destination mismatch remain unresolved under the UI preservation constraint.

See [sanitized evidence](release-evidence-2026-11-25.json), [implementation status](implementation-status.md), [launch checklist](search-launch-checklist.md) and [profile audit](local-profile-audit.md).
