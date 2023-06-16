/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        salesPrimary: "#0d142e",
        salesSecondary: "#9D9DD1"
      },
      spacing: {
        '2xfull': "200%",
      },
      height: {
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '55vh': '55vh',
        '60vh': '60vh',
        '65vh': '65vh',
        '67vh': '67vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },
      screens: {
        'hsm': { 'raw': '(min-height: 640px)' },
        'hmd': { 'raw': '(min-height: 720px)' },
        'hlg': { 'raw': '(min-height: 900px)' },
        'hxl': { 'raw': '(min-height: 1200px)' },
      }
    }
  },
  plugins: []
}
