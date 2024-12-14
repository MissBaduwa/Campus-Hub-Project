/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: '#f8bbd0',
        lavender: '#e1bee7',
        softBlue: '#bbdefb', 
      },
    },
  },
  plugins: [],
}
