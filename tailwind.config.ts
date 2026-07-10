import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        surface: "#1A1A1A",
        foreground: "#F5F3EE",
        muted: "#A8A29B",
        border: "#2A2A2A",
        // Gold accent — primary brand color
        accent: {
          DEFAULT: "#C9A64D",
          light: "#E8D5A3",
          dark: "#8A6D2F",
          success: "#8B9D77",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
