/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "times new roman", "sans-serif"],
        poppins: ["Poppins", "time new roman", "sans-serif"],
      },
    },
  },
  plugins: [],
};
