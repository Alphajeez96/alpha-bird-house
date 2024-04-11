/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        black: '#131517',
        gray: '#1E1F25',
        purple: '#5051F9'
      },

      fontFamily: {
        inter: 'Inter, sans-serif',
        poppins: 'Poppins, sans-serif'
      }
    }
  },
  plugins: []
}
