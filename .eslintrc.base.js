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
          [`^(${require("module").builtinModules.join("|")})(\\/.*|$)`],
          ["^react"],
          ["^next"],
          ["^@?\\w"],
          ["^(@\\/environment)(\\/.*|\\u0000$|$)"],
          ["^(@\\/i18n)(\\/.*|\\u0000$|$)"],
          ["^(@\\/pages)(\\/.*|\\u0000$|$)"],
          ["^(@\\/providers)(\\/.*|\\u0000$|$)"],
          ["^(@\\/server)(\\/.*|\\u0000$|$)"],
          ["^(@\\/styles)(\\/.*|\\u0000$|$)"],
          ["^(@\\/theme)(\\/.*|\\u0000$|$)"],
          ["^(@\\/types)(\\/.*|\\u0000$|$)"],
          ["^(@\\/ui)(\\/.*|\\u0000$|$)"],
          ["^(@\\/utilities)(\\/.*|\\u0000$|$)"],
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
