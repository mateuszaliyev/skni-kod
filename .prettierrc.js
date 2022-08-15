// @ts-check

/** @type {import("prettier").Options} */
const prettierConfig = {
  arrowParens: "always",
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: false,
  plugins: [require("prettier-plugin-tailwindcss")],
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
};

module.exports = prettierConfig;
