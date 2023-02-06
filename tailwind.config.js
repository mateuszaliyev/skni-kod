// @ts-check

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{js,ts,tsx}"],
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".bg-prism": {
          backgroundImage: "url('/assets/images/prism.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "140.164px 81.6px",
        },
      });
    }),
  ],
  theme: {
    backdropBlur: {
      sm: "4px",
    },
    backdropSaturate: {
      180: "1.80",
    },
    extend: {
      animation: {
        gradient: "gradient 8s infinite alternate",
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
        sans: ["var(--font-lato)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        gradient: {
          from: {
            backgroundPosition: "left",
            backgroundSize: "400%",
          },
          to: {
            backgroundPosition: "right",
            backgroundSize: "400%",
          },
        },
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
      opacity: {
        15: "0.15",
      },
    },
    zIndex: {
      header: "1",
      "header-logo": "3",
      menu: "4",
      navigation: "2",
      snackbar: "5",
    },
  },
};

module.exports = tailwindCssConfig;
