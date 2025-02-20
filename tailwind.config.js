/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.{js,jsx,ts,tsx}',
    './src.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#99C3FF', // Lightest shade
          DEFAULT: '#0061FF', // Base color
          dark: '#0057E6', // Slightly darker
          darker: '#004BCC', // Even darker
          darkest: '#002D80', // Darkest shade
        },
      },
    },
  },
  plugins: [],
};
