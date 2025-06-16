/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandblue: "#1e40af", // same as blue-800
        mycustom: "#FF5733",
      },
    },
  },
  plugins: [],
};
