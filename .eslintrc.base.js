// @ts-check

const { readdirSync } = require("fs");
const { builtinModules } = require("module");
const { resolve } = require("path");

const nodeBuiltinModules = builtinModules.join("|");

const srcDirectories = readdirSync(resolve(__dirname, "./src"));

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended"],
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      plugins: ["typescript-sort-keys"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "typescript-sort-keys/interface": [
          "warn",
          "asc",
          {
            caseSensitive: false,
            natural: true,
          },
        ],
        "typescript-sort-keys/string-enum": "warn",
      },
    },
  ],
  plugins: [
    "simple-import-sort",
    "sort-destructure-keys",
    "sort-keys",
    "unused-imports",
  ],
  rules: {
    "no-unused-vars": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          [`^(${nodeBuiltinModules})(\\/.*|$)`],
          ["^react"],
          ["^next"],
          ["^@?\\w"],
          ...srcDirectories.map((directory) => [
            `^(@\\/${directory})(\\/.*|\\u0000$|$)`,
          ]),
          ["^\\u0000"],
          ["^\\.\\.(?!\\/?$)", "^\\.\\.\\/?$"],
          ["^\\.\\/(?=.*\\/)(?!\\/?$)", "^\\.(?!\\/?$)", "^\\.\\/?$"],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "sort-destructure-keys/sort-destructure-keys": [
      "warn",
      { caseSensitive: false },
    ],
    "sort-keys": "off",
    "sort-keys/sort-keys-fix": [
      "warn",
      "asc",
      {
        caseSensitive: false,
        natural: true,
      },
    ],
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],
  },
};

module.exports = eslintConfig;
