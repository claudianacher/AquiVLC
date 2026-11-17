/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#fcf5ea",
        terracotta: {
          DEFAULT: "#d9571d",
          hover: "#c24b16",
        },
        'warm-dark': "#302d27",
        'warm-gray': "#777064",
        peach: "#f5e3d1",
        'card-cream': "#fffcf6",
        'border-beige': "#e5dacb",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
