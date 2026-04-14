/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        white: "var(--white)",
        accent: "var(--accent)",
        gray: "var(--gray)",
        muted: "var(--muted)",
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        logo: ["'Bebas Neue'", "sans-serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        blink: "blink 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
