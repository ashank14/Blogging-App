/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens:{
        'custom-950': '950px',
        'custom-670': '670px',
        'xxs':"300px",
        'xs':'475px'
      }
    },
  },
  plugins: [],
}

