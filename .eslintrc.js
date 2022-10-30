// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: ["./.eslintrc.base.js", "next/core-web-vitals", "prettier"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  root: true,
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
    "react/display-name": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        ignoreCase: true,
      },
    ],
  },
};

module.exports = eslintConfig;
