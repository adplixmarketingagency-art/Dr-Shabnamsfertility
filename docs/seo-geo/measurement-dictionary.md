# Measurement dictionary and prompt protocol

Prepared 2026-11-25 (Asia/Kolkata). Definitions/templates only. No account inspected, baseline collected, prompt run, event instrumented or business result claimed.
Evidence: saved strategy/plan in `../superpowers/`; `/tmp/drshabnam-seo-geo-20261125/{local-search,medical-content,geo}.md`. Platform-specific descriptions below inherit those reports' 2026-11-25 checks; no network revalidation here. Recheck account availability before use.

## Baseline, accounts and comparison

Baseline = unknown, not zero. Proposed pre-change window: 2026-10-28–2026-11-24 inclusive (28 days), only if a documented change date/history makes it valid. Otherwise start a dated baseline after access; label missing history. Do not call already changed data “pre-change.”
Owner must identify GBP/profile ID/access (missing), GSC verified property/role, Bing Webmaster Tools property/role, analytics property/consent/timezone, and private operations aggregate reporting. All access unverified. Bing Places and four AI products require separate access checks; Webmaster Tools access does not establish a Places listing.
Keep native reporting timezones and inclusive date ranges on exports; record panel timestamps in Asia/Kolkata with UTC offset. Match country (India), page/query groups, device, period length and query/location method. Separate branded/nonbranded and Pondicherry/Puducherry; GSC withheld queries limit completeness. Annotate holidays, ads, outages, page releases, indexing and platform changes. Do not sum unlike tracks or infer causal lift.

## Metric definitions

| Track / metric | Definition and source | Limit / required evidence |
|---|---|---|
| Organic impressions | GSC-reported website search impressions for selected property/type/filters | Account/date/export needed; not Maps views or a guaranteed distinct-person count. |
| Organic clicks / CTR | GSC clicks; clicks ÷ impressions for the same scope | Denominator required; clicks are not bookings; unavailable data stays unknown. |
| Organic average position | GSC aggregate position under its report definition | Query/page/device/date scope; never label it Maps rank or a fixed personal ranking. |
| Maps placement | Observed position for exact query at a fixed real origin/time/session | Record coordinates, language/device and public evidence; sample is not city-wide coverage. |
| GBP views/interactions | Export available native profile metrics with exact labels | Availability unknown; organic/Ads may mix. No invented impression total. |
| GBP calls / directions | Native call-button clicks / direction requests | Not answered calls / visits. Export definition and date range. |
| Google AI impressions | GSC Generative AI performance report, when available, using its native scope | Saved G research S3/S4 describes impressions only; no inferred AI clicks, CTR or position. Missing report may reflect insufficient impressions, not zero visibility. |
| Bing AI citations | AI Performance native citation counts, cited pages, sampled grounding queries where available | Saved G S10; coverage/product-specific, not universal impressions, recommendation or rank. |
| AI referral sessions | Analytics sessions with observed AI referrer/source or preserved attribution | Confirm actual source/redirect behavior. No universal UTM assumption; direct traffic is not AI proof. |
| AI mention | Successful panel observation names the clinic/doctor | Not a citation or endorsement; record identity ambiguity. |
| AI owned citation | Successful observation links an approved clinic-owned URL | Save exact destination; domain ownership first verified. Third-party citations tracked separately. |
| AI recommendation | Explicitly suggests clinic as a choice in a local-choice prompt | Neutral mention/listing is not endorsement; quotation/context evidence required. |
| AI fact accuracy | Supported factual claims ÷ all assessed factual claims | Label supported/contradicted/unknown separately; unknowns remain in denominator. Qualified clinician assesses clinical claims. |
| Qualified enquiry | Operations-confirmed genuine new appointment-intent enquiry meeting agreed service/location rules | Owner defines eligibility; deduplicate privately; public reporting receives aggregate counts only. |
| Booked / attended | Privately confirmed bookings / completed attendances | Separate counts and date cohorts; no inference from website events. |
| Answer rate / response time | Answered eligible incoming calls ÷ eligible incoming calls; elapsed first-response time | Operations agrees window, business-hours rules and aggregation before reporting. |

Native Google AI impressions, Bing citation totals, sampled panel rates and analytics referrals have different units/coverage; keep each numerator and denominator separate. Bot hits, sitemap submission and IndexNow acceptance establish neither citation nor recommendation.

## Proposed events — implementation and verification pending

| Event | Trigger | Does not prove |
|---|---|---|
| `call_click` | One activation of a call control | Dial completion, answered call or enquiry. |
| `whatsapp_click` | One activation of a WhatsApp control | Message sent/received or appointment. |
| `appointment_start` | One start of a genuine appointment flow | Successful delivery or booking. |
| `appointment_submit_success` | Only after backend/receiving service confirms successful receipt | Booked or attended consultation. Never fire on click, validation or failed delivery. |

Proposed safe parameters: event name, generic control ID, allowlisted nonclinical page-group code, campaign code and event schema version. No names, phone/email values, user identifiers, medical/treatment categories, free text, symptoms, message contents, appointment details or private URLs. Prevent automatic page/referrer/query-string capture from leaking health data; account/privacy owner must review defaults before activation.
Validate one event per activation, consent behavior, receipt/failure paths and actual CSP with synthetic nonclinical test inputs after separate authorization. Exclude tests from reporting. Instrumentation remains unverified.
Proposed GBP campaign: `utm_source=google&utm_medium=organic&utm_campaign=gbp_puducherry`; use a generic appointment content code if needed. Owner confirms conventions; preserve approved tags across redirects while keeping canonicals clean. No patient-level journey joins or health segments; report aggregates and suppress identifying small groups under the owner's privacy policy.

## Frozen prompt panel v1 — unrun

`ai-prompt-panel.csv` has exactly 12 exact prompts, four surface columns and repeats=3: 144 planned observations per complete wave. All surface cells are `template_not_run`. The strategy governs the four surfaces: ChatGPT Search, Google AI Mode, Bing/Copilot, Perplexity. Google AI Overviews is optional separate monitoring and excluded from this panel denominator.
Locale plan: English, India, Puducherry/Pondicherry; standard desktop environment and search-enabled mode where available. Record actual location capability, browser/device, signed-in/personalization conditions, displayed product/model and search mode. Do not claim a location setting is supported where absent. Fresh conversation per repeat; no follow-ups, seeded URLs or clinic hints in nonbranded prompts. Run the identical prompt on all four surfaces; record deviations and do not silently rewrite between waves.
Rows P01–P08 are nonbranded; P09–P12 branded. P01–P03/P05–P06 are the local-choice recommendation cohort. Other rows test usefulness/facts and can record recommendations descriptively, outside that cohort denominator. Questions about IVF/IUI do not establish that this clinic offers either service.
For later records use: wave_id, prompt_id, exact_prompt, repeat_id (1–3), surface, timestamp+offset, locale/origin/device/session/model/search_mode, execution_status, answer_status, mention, owned_citation, third_party_citation, exact_cited_urls, recommendation, assessed_fact_counts/status, public_answer_evidence, assessor, deviations. Add no per-user health data or private account identifiers; redact account UI from retained evidence.

Execution status: `template_not_run`, `unavailable`, `test_error`, `completed`. Completed answer status: `ai_answer` or `no_ai_answer`. For no AI answer score mention/citation/recommendation zero for AI metrics. With an answer, score absence zero; unknown assessment stays unknown. Unavailable/errors are excluded from successful-test denominators and reported separately; unassessed metrics are not silently scored zero.
Per surface report completed/planned coverage; AI-answer count/completed; clinic mentions/completed; owned citations/completed; and owned citations/AI-answer count. Recommendation rate = explicit recommendations/completed local-choice tests. Also report third-party citations separately. Publish n/N and unknown assessment count for every rate; a zero denominator is N/A. Full per-surface planned denominator is 36; local-choice planned denominator is 15.
Fact accuracy reports supported/assessed alongside contradicted and unknown counts and critical errors. A claim is not verified merely because a model cites it; compare with the proof ledger/public source, and escalate clinical questions to the reviewer. Investigate wrong address/contact/location promptly.
Repeats are not independent population samples. Rates are operational observations, not market share or causal proof; do not pool unavailable products as zero. Baseline and days 30/60/90 are planned only: 2026-11-25, 2026-12-25, 2027-01-24, 2027-02-23. If launch/access slips, record actual wave dates and elapsed days rather than backfilling results.
