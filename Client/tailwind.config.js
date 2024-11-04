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
        tablet: { max: '1000px', min: '640px' }, // Custom media query
  
    },
  },
  plugins: [],
}
}

