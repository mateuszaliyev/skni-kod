// @ts-check

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{js,ts,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

module.exports = tailwindCssConfig;
