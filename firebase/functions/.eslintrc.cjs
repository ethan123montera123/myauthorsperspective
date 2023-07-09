module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: 2017,
  },
  plugins: ["@typescript-eslint/eslint-plugin", "import"],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: [
    "dist/**/*",
    ".react-email/**/*",
    "node_modules/**/*",
    "*.cjs",
  ],
  rules: {
    "import/no-unresolved": [
      "error",
      { ignore: ["^firebase-functions/.+", "^firebase-admin/.+"] },
    ],
    "valid-jsdoc": [
      "error",
      {
        requireReturnType: false,
        requireReturn: false,
        requireReturnDescription: false,
        requireParamType: false,
      },
    ],
  },
};
