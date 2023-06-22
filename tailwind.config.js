/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        salesPrimary: "#0d142e",
        salesSecondary: "#9D9DD1"
      },
      spacing: {
        '2xfull': "120%",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")]
}
