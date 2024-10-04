/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: () => ({
        primary: "#737ccf",
        secondary: "#D8A71D",
        accent: "#bc4eb",
        "light-gray": "#e1e5f8",
        "website-background": "#eceefb",
      }),
    },
  },
  plugins: [],
};
