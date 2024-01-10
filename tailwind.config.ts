import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inconsolata", "ui-sans"],
        display: ["Ultra", "ui-serif"],
        serif: ["Stint Ultra Expanded"],
      },
      colors: {
        // primary: "#0b361f",
        primary: "#041f11",
        paper: "#fbede6",
        highlighter: "#afdb48",
        accent: "#6b9704",
      },
    },
  },
  plugins: [require("@domchristie/tailwind-utopia")],
} satisfies Config;
