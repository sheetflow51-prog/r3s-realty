const v = (name) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        "bg-2": v("bg-2"),
        "bg-card": v("bg-card"),
        "bg-raised": v("bg-raised"),
        text: v("text"),
        "text-muted": v("text-muted"),
        "text-dim": v("text-muted"),
        green: {
          DEFAULT: v("green"),
          primary: v("green"),
          deep: v("green"),
          dark: v("green"),
          light: v("green-light"),
        },
        gold: {
          DEFAULT: v("gold"),
          light: v("gold-light"),
          dark: v("gold"),
        },
        border: "var(--border)",
        "border-strong": "var(--border-hover)",
        "border-hover": "var(--border-hover)",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        serif: ["'DM Serif Display'", "'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
        ultra: ".35em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out both",
        ticker: "ticker 40s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(200,168,75,0.4), 0 8px 32px rgba(200,168,75,0.15)",
        depth: "0 30px 60px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
