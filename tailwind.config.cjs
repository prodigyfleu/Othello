/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'blur': 'rgba(238, 208, 157, 0.5)', // Reemplaza con el color que desees
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
    },
  },
  plugins: [],
}
}





