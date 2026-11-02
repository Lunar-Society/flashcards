import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"ET Book"', "Palatino", '"Palatino Linotype"', "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
        },
        paper: "var(--paper)",
        wash: "var(--wash)",
        rule: "var(--rule)",
        accent: "var(--accent)",
      },
      maxWidth: {
        page: "62rem",
        col: "36rem",
      },
    },
  },
  plugins: [],
};

export default config;
