/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: () => ({
        primary: "#1d4ed8",
        secondary: "#D8A71D",
        accent: "red-700",
      }),
    },
  },
  plugins: [],
};
