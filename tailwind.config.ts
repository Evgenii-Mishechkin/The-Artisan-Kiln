import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kiln: {
          /** Фон шапки (макет) */
          cream: "#e6dec4",
          /** Фон основного контента */
          page: "#f7f6e3",
          "cream-dark": "#dbd2b8",
          /** Поверхности: поля, карточки */
          paper: "#efe8d6",
          /** Основной текст (макет) */
          ink: "#080501",
          /** @deprecated alias — используйте ink */
          navy: "#080501",
          "navy-light": "#2a241c",
          terracotta: "#b85c38",
          sage: "#4a6741",
          /** Кнопка и аватар в шапке (макет) */
          slate: "#4f5671",
          /** Window dots (макет) */
          "dot-brown": "#8b7355",
          "dot-gold": "#c9a227",
          "dot-olive": "#6d8f5c",
          /** Бейдж корзины */
          "badge-gold": "#d9c48f",
        },
      },
      fontFamily: {
        sans: ["var(--font-pathway-gothic)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /** Макет: заголовок формы на lg+ */
        "3xl": ["2.475rem", { lineHeight: "1.1" }],
      },
      boxShadow: {
        artisan: "0 4px 24px rgba(8, 5, 1, 0.08), inset 0 0 0 1px rgba(255,255,255,0.35)",
        "inner-bracket": "inset 0 1px 3px rgba(8, 5, 1, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
