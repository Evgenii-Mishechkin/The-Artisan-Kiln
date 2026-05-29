# The Artisan Kiln — Ceramic Tile Order Form

Interactive order form for a fictional ceramic tile studio. Built as a front-end test assignment with a handcrafted, print-inspired UI.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Redux Toolkit, @dnd-kit, Framer Motion.

## Quick start

**Requirements:** Node.js 18+, npm.

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm test` | Unit tests (cart totals / shipping) |
| `npm run lint` | TypeScript check (`tsc --noEmit`) |

## Features

- **Shopping cart** — Add tiles from a catalog dropdown, adjust quantity (±1), live subtotal / shipping / grand total.
- **Shipping** — $0 when the cart is empty; otherwise $25 flat rate, free when subtotal exceeds $500.
- **Design tool** (viewport ≥ 1024px) — 6×6 visualization grid with drag-and-drop from a palette; grid clears when the cart becomes empty.
- **Checkout** — Customer fields, project notes, four payment methods (card with Luhn + Visa/Mastercard hints, PayPal, Apple Pay, bank transfer), validation, success toast and modal.
- **Responsive layout** — Mobile-first cart and checkout; decorative page frame (corner PNGs) scales by breakpoint; temple/kiln header art from `lg` upward.

## Project structure

```
frontend/
├── design/                 # Reference mockups (desktop & mobile PNG)
├── public/assets/
│   ├── decor/              # Frame corners, header art, hand illustration
│   ├── icons/              # UI icons & payment logos
│   └── tiles/              # Tile pattern SVGs
├── src/
│   ├── app/                # Next.js layout, global styles, home page
│   ├── components/         # UI (cart, checkout, design tool, layout)
│   ├── constants/          # Tile catalog
│   ├── lib/                # Totals, validation, Luhn, formatting
│   └── store/              # Redux slices (cart, design grid) & selectors
└── README.md
```

## Design assets

Replace files under `public/assets/` keeping the same paths and names. Corner frame images (`up-left.png`, `up-right.png`, `down-left.png`, `down-right.png`) must be present for the border decoration to render.

Reference layouts: `design/design_desktop.png`, `design/design_mobile.png`.

## Behaviour notes (vs. typical spec wording)

- Cart and design palette start **empty**; tiles are added via **Add New Tile to Cart**.
- Design grid is **6×6** (per written spec).
- Card form is shown only when **Credit/Debit Card** is selected.

## Deploy (Vercel)

1. Push the repository to GitHub/GitLab.
2. Import the project on [vercel.com](https://vercel.com).
3. Set **Root Directory** to `frontend` if the repo contains the monorepo root; otherwise use the repo root when `frontend` is the project root.
4. Framework preset: **Next.js** — no environment variables required.

## License

**All rights reserved. No commercial use.**

**Personal, non-commercial use is allowed** — run locally, learn from the code,
experiment, and keep a private copy for yourself.

You may not use, copy, modify, distribute, or sell this project (or
derivatives) for any **commercial** purpose without written permission from
the copyright holder. Non-commercial portfolio / job-application review is fine.

See [LICENSE](./LICENSE) for the full terms.
