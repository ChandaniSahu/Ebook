/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        white: '0 4px 30px rgba(255, 255, 255, 0.5)', // Adjust as needed
      },
      screens: {
        repsive: { max: '960px', min: '0px' }, // Custom media query
        navRes: { max: '634px', min: '0px' },
    },
  },
  plugins: [],
}
}

