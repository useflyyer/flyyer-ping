// eslint-disable-next-line no-undef
module.exports = {
  // parserOptions: {
  //   ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
  //   sourceType: "module", // Allows for the use of imports
  // },
  env: {
    // "jest/globals": true,
    browser: true,
    // node: true, // to allow "module.exports"
  },
  extends: [
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:jest/recommended",
    "plugin:jest/style",
  ],
  plugins: ["jest"],
  rules: {
    eqeqeq: "error",
    "no-alert": "warn",
    "no-console": "warn",
    "no-undef": "error",
    "no-use-before-define": "error",
  },
};
