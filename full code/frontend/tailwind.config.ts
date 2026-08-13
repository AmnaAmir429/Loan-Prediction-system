import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary-container)",
          fixed: "var(--primary-fixed)",
        },
        "on-primary": "var(--on-primary)",
        "on-primary-container": "var(--on-primary-container)",
        background: "var(--background)",
        "on-background": "var(--on-background)",
        surface: {
          DEFAULT: "var(--surface)",
          dim: "var(--surface-dim)",
          bright: "var(--surface-bright)",
          container: {
            lowest: "var(--surface-container-lowest)",
            low: "var(--surface-container-low)",
            DEFAULT: "var(--surface-container)",
            high: "var(--surface-container-high)",
            highest: "var(--surface-container-highest)",
          },
          variant: "var(--surface-variant)",
        },
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",
        error: {
          DEFAULT: "var(--error)",
          container: "var(--error-container)",
        },
        "on-error": "var(--on-error)",
        "on-error-container": "var(--on-error-container)",
        success: {
          DEFAULT: "#16a34a",
          container: "#dcfce7",
          border: "#86efac",
        },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "margin-mobile": "1rem",
        "margin-desktop": "2.5rem",
        "container-max": "1280px",
        "stack-sm": "0.5rem",
        "stack-md": "1rem",
        "stack-lg": "2rem",
        gutter: "1.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
