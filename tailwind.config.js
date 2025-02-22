/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F8F9FA',
          secondary: '#FFFFFF',
          text: '#212529',
          border: '#DEE2E6',
        },
        dark: {
          background: '#1A1A1A',
          secondary: '#2A2A2A',
          text: '#F8F9FA',
          border: '#212121',
        },
      },
    },
  },
  plugins: [],
}