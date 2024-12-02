/** @type {import('tailwindcss').Config} */

const accent = '#1A1C25'
// const accent = '#424654'
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: accent,
      },
    },
  },
  plugins: [],
  accent,
}
