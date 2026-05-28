# Запуск проекта — The Artisan Kiln

## Требования

- Node.js 18+
- npm

## Команды

```bash
cd frontend
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

```bash
npm test          # unit-тесты расчётов
npm run build     # production-сборка
npm run lint      # ESLint
```

## Документация

- **Сдача / деплой:** [README.project.md](./README.project.md)
- ТЗ: [README.md](./README.md)
- План и решения: [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
- Макеты: [design/](./design/)

## Ассеты

Подменяйте SVG в `public/assets/` с теми же именами — см. `IMPLEMENTATION_PLAN.md`.

## Отступление от ТЗ

Корзина и палитра **пустые при загрузке** (плитки добавляются через «Add New Tile»). Каталог — 4 коллекции из README.
