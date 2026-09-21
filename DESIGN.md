# Design Plan — Dr. Shabnam's Modernized Redesign

## Subject & Brief
- **Subject**: Dr. Shabnam's — Consultant Gynaec & Fertility Specialist, Pondicherry.
- **Audience**: Women and couples seeking gynaecological and fertility care.
- **Primary job**: Convey trust, warmth, expertise, and calm compassion so visitors feel safe booking a consultation.
- **Brief**: "proper modernized redesign" of the existing React site.

## Design Review Against Brief (uniqueness check)
The existing site clusters around generic defaults (warm cream + Playfair/Inter + pink, identical rounded cards, soft shadows, gradient washes, floating cards, hover-lift everywhere). This redesign deliberately moves away from every one of those:
- No warm-cream + terracotta/pink cluster.
- No SaaS-card kit (one radius, soft shadow, gradient decoration).
- No non-user-triggered motion (removed floating cards).
- No eyebrow labels, numbered markers, middle dots, "→" buttons, monospace labels.

## Token System

### Color (warm, calm, sophisticated — not "pink medical")
- `paper`    #F6F1EA  — warm linen/parchment base (calm, editorial)
- `ink`      #2B2622  — warm near-black for headings
- `ink-soft` #5C544C  — body / muted text
- `accent`   #9B5A7A  — muted dusty mauve (sophisticated feminine, NOT generic pink)
- `accent-soft` #EAD8E0 — light tint for subtle backgrounds
- `line`     #E3D9CC  — warm hairline for rules/dividers
- `white`    #FFFFFF

### Type (deliberate, distinctive pairing)
- **Display**: "Fraunces" (serif, optical sizes, warm humanist character) — headlines, section titles, quotes, stat numbers.
- **Body/UI**: "Plus Jakarta Sans" (clean modern sans) — body, labels, buttons, UI.
- Scale: generous, editorial. Section titles `clamp(2rem, 4.5vw, 3rem)`. Body 1rem/1.7.

### Layout (editorial, left-anchored, disciplined)
- Single accent moment per section; everything else quiet.
- Hero: large serif headline left + one calm image right. No floating cards, no gradient glows.
- Stats: single horizontal row, oversized serif numbers + small labels.
- Services/features: hairline dividers and restrained spacing instead of shadow cards.
- Split section: full-bleed image + text.
- Gallery: tight, editorial grid.
- Contact: clean two-column (info + form).
- Footer: warm dark charcoal.
- Alignment: mostly left-anchored within a centered container; section headers left-aligned (editorial) rather than centered.

### Principles
1. **One memorable thing** — let the hero headline / a single image carry the page; keep surroundings quiet.
2. **Cut decoration that doesn't serve the brief** — no floating cards, no gradient washes, no hover lifts on every card.
3. **Typography is the visual** — type treatment is an active design element, not neutral delivery.
4. **Warmth through whitespace and type**, not pink gradients.
5. Responsive down to mobile, visible keyboard focus, `prefers-reduced-motion` respected.
