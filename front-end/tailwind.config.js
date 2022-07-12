/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/pages/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgLogin: 'url(/img/bg-login.png)',
      },
      colors: {
        'flexge-green-800': '#00786A',
        'flexge-green-600': '#0bb5a0',
        'flexge-red-300': '#f44336'
      },
      transformOrigin: {
        'top-left-1/3-3/4': '33% 75%',
      }
    },
  },
  plugins: [],
}
