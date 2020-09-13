module.exports = {
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
