/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans'],
        quicksand: ['Quicksand', 'sans-serif'],
        cocon:['Cocon','sans-serif']
      },
    },
  },
  plugins: [],
}

