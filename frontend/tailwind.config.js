/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#d8fe05',
        'primary-dark': '#b0cf01',
        background: '#575757',
      },
      fontFamily: {
        azeret: ['Azeret'],
      },
    },
  },
  plugins: [],
};
