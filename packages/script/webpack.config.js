var path = require("path");

module.exports = {
  entry: {
    ping: path.resolve(__dirname, "src", "ping.js"),
  },
  // mode: "development",
  mode: "production",
  devtool: false,
  target: "web",
  optimization: {
    concatenateModules: true,
  },
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "dist"),
    // library: "FlayyerPing", // Desired name for the global variable when using as a drop-in script-tag.
    // libraryTarget: "var",
    // globalObject: "this", // not sure
    iife: true,
  },
};
