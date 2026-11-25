/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F3",
        sand: "#F2ECE5",
        gold: "#C5A46D",
        champagne: "#E5D5B8",
        ink: "#302820",
        muted: "#817568",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 50px -20px rgba(48,40,32,0.25)",
        lift: "0 40px 80px -30px rgba(48,40,32,0.35)",
      },
      letterSpacing: { luxe: "0.28em" },
    },
  },
  plugins: [],
};
