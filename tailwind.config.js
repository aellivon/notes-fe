/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
    }
  },
  plugins: []
}
