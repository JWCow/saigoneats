import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgb(229 229 229)",
        input: "rgb(229 229 229)",
        ring: "rgb(234 88 12)",
        background: "rgb(255 255 255)",
        foreground: "rgb(10 10 10)",
        primary: {
          DEFAULT: "rgb(234 88 12)",
          foreground: "rgb(250 250 250)",
        },
        secondary: {
          DEFAULT: "rgb(245 245 245)",
          foreground: "rgb(25 25 25)",
        },
        destructive: {
          DEFAULT: "rgb(239 68 68)",
          foreground: "rgb(250 250 250)",
        },
        muted: {
          DEFAULT: "rgb(245 245 245)",
          foreground: "rgb(115 115 115)",
        },
        accent: {
          DEFAULT: "rgb(245 245 245)",
          foreground: "rgb(25 25 25)",
        },
        popover: {
          DEFAULT: "rgb(255 255 255)",
          foreground: "rgb(10 10 10)",
        },
        card: {
          DEFAULT: "rgb(255 255 255)",
          foreground: "rgb(10 10 10)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require("tailwindcss-animate")],
};

export default config;
