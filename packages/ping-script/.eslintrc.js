module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    browser: true,
    node: true, // to allow "module.exports"
  },
  extends: ["plugin:prettier/recommended"],
  rules: {
    eqeqeq: "error",
    "no-alert": "warn",
    "no-console": "warn",
    "no-undef": "error",
    "no-use-before-define": "error",
  },
};
