/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '450px',
      },
      colors: {
        primary: '#9A0007',
        blue: '#1c609e',
        lightBlue: '#3B91DF',
        persianBlue: '#2D2DB3',
        inactiveBlack: '#72777A',
        lightBlack: '#2b2b2b',
        'black-500': '#212121',
        green: '#60BB47',
      },
    },
  },
  plugins: [],
};
