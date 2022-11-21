/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  ignorePatterns: ["*.js", "**/generated/*", "tests"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },

    "import/resolver": {
      typescript: {},
    },
  },
  env: {
    jest: true,
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "unused-imports",
    "prettier",
    "import",
    "react",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "react-app",
  ],
  rules: {
    "jsx-a11y/alt-text": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "react/jsx-uses-react": "off",
    "react/display-name": "off",
    "react/jsx-key": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    // 'import/no-unresolved': ['error', { ignore: ['^swiper', '@ionic/react-hooks/keyboard'] }],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            group: "internal",
            pattern: "@/**",
          },
          {
            group: "builtin",
            pattern: "react",
            position: "before",
          },
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",

        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["src/*"],
            message: 'Please use "@/..." for absolute import',
          },
        ],
      },
    ],
    "prettier/prettier": "warn",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "warn",
  },
};
