// @ts-check

const { readdirSync } = require("fs");
const { builtinModules } = require("module");
const { resolve } = require("path");

const nodeBuiltinModules = builtinModules.join("|");

const srcDirectories = ["assets", ...readdirSync(resolve(__dirname, "./src"))];

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  env: {
    es6: true,
  },
  extends: ["eslint:recommended", "next/core-web-vitals"],
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["typescript-sort-keys"],
      rules: {
        "@typescript-eslint/ban-types": [
          "error",
          {
            extendDefaults: true,
            types: {
              /**
               * The type `{}` doesn't mean "any empty object", it means "any
               * non-nullish value". There is just one case where it actually
               * does mean something akin to "empty object"; in an intersection
               * type. This is technically safe in this instance, because the
               * `{}` type is passed into an intersection type.
               *
               * @see {@link https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492 See this comment for more information}
               */
              "{}": false,
            },
          },
        ],
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: {
              /**
               * @see {@link https://github.com/typescript-eslint/typescript-eslint/pull/4623}
               */
              attributes: false,
            },
          },
        ],
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
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
    "no-unused-vars": "off",
    "react/display-name": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        ignoreCase: true,
      },
    ],
    "simple-import-sort/exports": "warn",
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
