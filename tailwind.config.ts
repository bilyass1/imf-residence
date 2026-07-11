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
        // Legacy aliases — kept so existing token refs still work
        background: "#0B0C0E",
        surface: "#16151A",
        foreground: "#EDE7DC",
        muted: "#9A9186",
        border: "#242229",
        accent: {
          DEFAULT: "#A9865A",
          light: "#D9C6A0",
          dark: "#7A6240",
          success: "#3C463C",
        },
        // Full quiet-luxury token set
        ink: {
          DEFAULT: "#0B0C0E",
          surface: "#16151A",
          elevated: "#1E1C21",
        },
        bronze: {
          DEFAULT: "#A9865A",
          light: "#D9C6A0",
          dark: "#7A6240",
        },
        ivory: {
          DEFAULT: "#EDE7DC",
          muted: "#9A9186",
        },
        hairline: "#242229",
        forest: "#3C463C",
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
