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
        primary: "#17212B",
        dark: "#10161C",
        "bg-warm": "#F7F5F0",
        surface: "#FFFFFF",
        "accent-gold": "#B08D57",
        "gold-hover": "#9A7947",
        "gold-light": "#F4EFEA",
        "text-main": "#242424",
        "muted-text": "#6F6F6F",
        "border-light": "#E5E2DC",
        "border-dark": "#2A3644",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 2px 8px rgba(23, 33, 43, 0.04)",
        md: "0 8px 24px rgba(23, 33, 43, 0.08)",
        lg: "0 16px 40px rgba(23, 33, 43, 0.12)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
