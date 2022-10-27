// @ts-check

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{js,ts,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      animation: {
        marquee: "marquee var(--marquee-duration) linear 0s infinite",
        path: "path 8s linear 0s infinite backwards",
      },
      colors: {
        ideo: "#0f76a4",
        kod: {
          50: "#eef8fe",
          100: "#def2fd",
          200: "#bee5fb",
          300: "#8fd2f9",
          400: "#3cb1f4",
          500: "#0c8ed9",
          600: "#0972ae",
          700: "#086499",
          800: "#074f79",
          900: "#054163",
        },
      },
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        marquee: {
          from: {
            transform: "translateX(0%)",
          },
          to: {
            transform: "translateX(-100%)",
          },
        },
        path: {
          from: {
            strokeDasharray: "calc(0.5 * var(--path-length))",
            strokeDashoffset: "var(--path-length)",
          },
          to: {
            strokeDasharray: "calc(0.5 * var(--path-length))",
            strokeDashoffset: "0",
          },
        },
      },
      letterSpacing: {
        kicker: "0.2em",
      },
    },
    zIndex: {
      header: "1",
      "header-logo": "3",
      navigation: "2",
    },
  },
};

module.exports = tailwindCssConfig;
