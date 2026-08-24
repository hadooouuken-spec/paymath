import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14212B",
          muted: "#4A5A63",
        },
        paper: "#F4F7F6",
        pine: {
          DEFAULT: "#0E5C4D",
          dark: "#0A3F36",
          light: "#E7F3EF",
        },
        gold: "#8A6D3B",
        line: "#D5E0DB",
      },
      fontFamily: {
        sans: [
          "var(--font-dm-sans)",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 33, 43, 0.06), 0 8px 24px rgba(20, 33, 43, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
