import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linen: "var(--linen-light)",
        amber: "var(--amber-wheat)",
        walnut: "var(--walnut-wood)",
        jute: "var(--woven-jute)",
        champagne: "var(--champagne)",
        mocha: "var(--mocha-mousse)",
        ink: "var(--ink)",
        paper: "var(--paper-white)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["Parisienne", "cursive"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
