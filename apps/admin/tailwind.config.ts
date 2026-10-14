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
        // ── Sidebar (dark navy) ──────────────────────────────────────────────
        sidebar: {
          bg: "#0F1629",
          surface: "#182040",
          border: "#1E2A4A",
          text: "#A8B4D0",
          "text-active": "#FFFFFF",
          accent: "#2563EB",
        },
        // ── Content area (light neutral) ─────────────────────────────────────
        content: {
          bg: "#F4F5F7",
          surface: "#FFFFFF",
          border: "#E5E7EB",
        },
        // ── Gold accent ──────────────────────────────────────────────────────
        gold: {
          DEFAULT: "#B08D57",
          light: "#F5EDD8",
          dark: "#8A6B3E",
        },
        // ── Semantic status colours ──────────────────────────────────────────
        status: {
          available: "#16A34A",
          "available-bg": "#DCFCE7",
          maintenance: "#D97706",
          "maintenance-bg": "#FEF3C7",
          inactive: "#6B7280",
          "inactive-bg": "#F3F4F6",
        },
        // ── Text ─────────────────────────────────────────────────────────────
        text: {
          primary: "#111827",
          secondary: "#4B5563",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.06)",
        elevated: "0 4px 16px rgba(0,0,0,0.08)",
        sidebar: "2px 0 12px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        chip: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
