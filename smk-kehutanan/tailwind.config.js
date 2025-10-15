// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // TAMBAHKAN ATAU UBAH BAGIAN INI
  plugins: [
    require('@tailwindcss/typography'),
  ],
}