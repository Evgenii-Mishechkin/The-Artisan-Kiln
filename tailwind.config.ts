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
          cream: "#e6dec4",
          page: "#f7f6e3",
          "cream-dark": "#dbd2b8",
          paper: "#efe8d6",
          ink: "#080501",
          navy: "#080501",
          terracotta: "#b85c38",
          sage: "#4a6741",
          slate: "#4f5671",
          "dot-brown": "#8b7355",
          "dot-gold": "#c9a227",
          "dot-olive": "#6d8f5c",
          "badge-gold": "#d9c48f",
        },
      },
      fontFamily: {
        sans: ["var(--font-pathway-gothic)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "inner-bracket": "inset 0 1px 3px rgba(8, 5, 1, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
