// @ts-check

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{js,ts,tsx}"],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addUtilities, matchUtilities, theme }) => {
      addUtilities({
        ".bg-prism": {
          backgroundImage: "url('/assets/images/prism.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "140.164px 81.6px",
        },
      });
      matchUtilities(
        {
          "animation-delay": (value) => ({
            "animation-delay": value,
          }),
        },
        {
          values: theme("transitionDelay"),
        }
      );
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
        "fade-in": "fade-in 1.2s ease backwards",
        gradient: "gradient 8s infinite alternate",
        marquee: "marquee var(--marquee-duration) linear 0s infinite",
        path: "path 8s linear 0s infinite backwards",
      },
      colors: {
        botland: "#e74c3c",
        deloitte: "#80c342",
        gray: {
          1000: "#090C14",
        },
        ideo: "#0f76a4",
        opteam: "#004e9f",
        "sklep-elektronika": "#e13322",
      },
      fontFamily: {
        sans: ["var(--font-lato)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "none",
          },
        },
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
      "-1": "-1",
      0: "0",
      1: "1",
      header: "2",
      menu: "3",
      navigation: "4",
      snackbar: "5",
    },
  },
};

module.exports = tailwindCssConfig;
