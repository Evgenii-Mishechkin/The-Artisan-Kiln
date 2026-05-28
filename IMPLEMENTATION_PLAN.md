# The Artisan Kiln — Implementation Plan

**Status:** Phase 8 complete — ready for asset swap & deploy  
**Source of truth:** `README.md` (requirements) + this file (locked decisions)  
**Visual reference:** `design/design_desktop.png`, `design/design_mobile.png` — do not copy dollar amounts from PNG.

---

## Locked decisions

| Topic | Decision |
|--------|----------|
| Scope | Full README scope (variant B), pixel-perfect as assets arrive |
| Desktop breakpoint | `lg` (1024px+); below = mobile, no Design Tool |
| Cart initial state | **Empty** (README lists 4 tiles as catalog, not pre-filled cart) |
| Catalog | 4 tiles: Ocean Wave, Forest Fern, Terracotta Dot, Yellow Star |
| Add New Tile | Dropdown with previews; existing line → +1 qty |
| Row Add / Remove | +1 / −1 qty; at qty 1, Remove deletes row |
| Quantity input | Number input + Add/Remove buttons |
| Units | sq. ft. (`sq. ft.`) |
| Totals | Desktop: 2 summaries (same Redux selectors); mobile: 1 |
| Shipping | **Empty cart → $0.** With items: subtotal > $500 → $0, else $25 |
| Design grid | 6×6, `@dnd-kit` drag from palette to cells |
| Design board remove | Remove tiles **from the board** (not palette): × on cell (**visible on hover/focus only**), drag to trash, or drop outside grid |
| Design grid reset | **Clear entire 6×6 grid** when cart becomes empty (listener middleware) |
| Palette | Only tiles present in cart; unlimited placements on grid |
| Project fields | **Project Name** (input) + **Notes** (textarea), section before payment, visible on mobile & desktop |
| Card validation | Strict: required, email, Luhn, Visa/MC, masks, expiry, CVV |
| Payment UI | 4 methods; card fields only for Credit Card |
| Submit | Toast + order summary modal, no API |
| Animations | `framer-motion` (light): row remove, dropdown, grid drop |
| Assets | Placeholder SVGs in `public/assets/{tiles,icons,decor}/` — replace 1:1 |

---

## Asset map (replace files, keep paths)

```
public/assets/tiles/
  ocean-wave.svg
  forest-fern.svg
  terracotta-dot.svg
  yellow-star.svg

public/assets/icons/
  cart.svg
  user.svg
  add.svg
  remove.svg
  chevron-down.svg
  payment-card.svg
  payment-paypal.svg
  payment-apple.svg
  payment-bank.svg

public/assets/decor/
  (optional — CSS/Tailwind fallbacks until provided)
```

---

## Design tokens (from mockup)

| Token | Hex |
|-------|-----|
| Background | `#e6dec4` → `kiln-cream` |
| Text | `#080501` → `kiln-ink` / `kiln-navy` |
| Header profile btn & avatar fill | `#4f5671` → `kiln-slate` |
| Icon on `kiln-slate` (avatar) | `kiln-cream` → `user-profile.svg` |

---

## Tile catalog (constants)

| id | name | unitPrice (USD/sq.ft.) |
|----|------|------------------------|
| ocean-wave | Ocean Wave | 28.00 |
| forest-fern | Forest Fern | 32.00 |
| terracotta-dot | Terracotta Dot | 24.00 |
| yellow-star | Yellow Star | 30.00 |

---

## Phase checklist

- [x] 0 — Plan + Next.js bootstrap, Tailwind tokens, Redux, deps
- [x] 1 — Types, catalog, cart slice, totals selectors + unit tests
- [x] 2 — designGrid slice, dnd-kit grid 6×6
- [x] 3 — Layout: Header, Footer, page shell
- [x] 4 — Cart table, dropdown Add Tile, OrderSummary
- [x] 5 — Checkout form, validation, payment methods
- [x] 6 — Desktop 3-column layout + Design Tool
- [x] 7 — framer-motion (baseline), responsive layout
- [x] Pre-8 — Shipping $0 if empty cart; grid reset on empty cart; board tile removal; Project Name + Notes section
- [x] 8 — Pixel-perfect polish, decor placeholders, README.project.md, vercel.json

---

## Business rules (do not forget)

### Shipping

1. `lines.length === 0` → shipping **$0.00** (grand total $0).
2. Cart has items → if subtotal **> $500** → shipping $0, else **$25**.

### Design playground

1. Palette lists tile types **currently in cart** only.
2. Placing on grid does **not** consume cart quantity.
3. User can remove placements from the **board** (×, trash zone, drag off grid).
4. When **all cart lines removed** → `resetGrid()` clears the 6×6 board.

### Checkout form fields

- Customer: name, phone, email, shipping address.
- **Project Name / Notes** (dedicated section, not only a hidden textarea).
- Payment (4 methods) → Place order → toast + modal.

---

## Do not

- Copy totals from PNG mockups
- Use 8×8 grid (README says 6×6)
- Pre-fill cart on load (unless decision changes)
- Duplicate total **calculation** logic (only duplicate UI components)

---

## Visual frame

- **Отложено** — рамку убрали; сначала pixel-perfect **компонентов** (Header → … → Footer).
- SVG в `public/assets/decor/geo-tile-*` оставлены для будущей рамки, в UI не используются.

## Phase 8 deliverables

- Component polish in progress (no page frame for now)
- `PageTitle` with flanking tile previews
- Header: full desktop nav, logo, cart badge
- Order summary: bracket-style values, highlighted Grand Total
- Payment method icons
- `README.project.md` — install, test, Vercel deploy
- `vercel.json` for one-click deploy

Replace placeholder SVGs in `public/assets/` when final art is ready.

---

## Dev commands

```bash
cd frontend
npm install
npm run dev
npm test
npm run build
```
