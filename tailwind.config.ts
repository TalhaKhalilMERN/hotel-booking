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
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-warm": "var(--color-surface-warm)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "accent-blue": "var(--color-accent-blue)",
        "accent-blue-hover": "var(--color-accent-blue-hover)",
        "accent-blue-tint": "var(--color-accent-blue-tint)",
        "accent-gold": "var(--color-accent-gold)",
        "accent-gold-tint": "var(--color-accent-gold-tint)",
        border: "var(--color-border)",
        // Aliases to seamlessly support existing classes without breaking
        primary: "var(--color-text-primary)",
        "bg-warm": "var(--color-bg)",
        "border-light": "var(--color-border)",
        "muted-text": "var(--color-text-secondary)",
        "text-main": "var(--color-text-primary)",
        "gold-light": "var(--color-accent-gold-tint)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"], // redirect serif to Manrope
      },
      boxShadow: {
        card: "0 2px 12px rgba(34, 37, 42, 0.06)",
        elevated: "0 4px 20px rgba(34, 37, 42, 0.10)",
        floating: "0 8px 30px rgba(34, 37, 42, 0.12)",
        sm: "0 2px 8px rgba(34, 37, 42, 0.04)",
        md: "0 4px 16px rgba(34, 37, 42, 0.08)",
        lg: "0 8px 24px rgba(34, 37, 42, 0.12)",
      },
      borderRadius: {
        card: "18px",
        button: "20px",
        input: "12px",
        chip: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
