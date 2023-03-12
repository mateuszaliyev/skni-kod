// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  env: {
    es6: true,
  },
  extends: ["@matali/eslint-config/next"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
};

module.exports = eslintConfig;
