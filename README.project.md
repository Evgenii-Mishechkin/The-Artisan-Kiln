# The Artisan Kiln — Ceramic Tile Order Form

Интерактивная форма заказа керамической плитки (тестовое задание).  
Стек: **Next.js**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, **@dnd-kit**, **framer-motion**.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск собранного приложения |
| `npm test` | Unit-тесты (расчёт subtotal / shipping) |
| `npm run lint` | ESLint |

## Структура

- `src/app/` — Next.js App Router
- `src/store/` — Redux (корзина + сетка 6×6)
- `src/components/` — UI
- `public/assets/` — SVG (tiles, icons, decor) — подменяйте 1:1
- `design/` — макеты PNG
- `IMPLEMENTATION_PLAN.md` — зафиксированные решения и чеклист

## Функции

- Корзина: dropdown добавления, qty ±1, расчёт итогов
- Shipping: пустая корзина → $0; иначе $25 или бесплатно при subtotal > $500
- Desktop (≥1024px): Design Tool 6×6, drag-and-drop, сброс сетки при пустой корзине
- Checkout: валидация (Luhn, Visa/MC), 4 способа оплаты, toast + модалка

## Деплой (Vercel)

1. Пуш в GitHub/GitLab
2. [vercel.com](https://vercel.com) → Import Project
3. **Root Directory:** `frontend` (если репозиторий содержит только `frontend/`, оставьте корень)
4. Framework Preset: **Next.js**
5. Deploy

Переменные окружения не требуются.

## Документация ТЗ

Исходное задание: [README.md](./README.md) (спецификация от работодателя).

## Отличия от README ТЗ

- Корзина и палитра **пустые** при загрузке (добавление через «Add New Tile»).
- Сетка **6×6** (по README, не по PNG).
