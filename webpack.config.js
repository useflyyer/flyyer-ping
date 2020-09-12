const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    // library: "FlayyerPing",
    //libraryTarget: "amd",
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
