/* eslint-disable no-undef */

const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  mode: "production",
  target: "web",
  optimization: {
    providedExports: false,
    usedExports: false,
  },
  output: {
    // library: "FlayyerPing",
    // libraryTarget: "amd",
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
