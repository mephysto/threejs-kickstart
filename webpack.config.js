const path = require("path");

module.exports = {
  entry: "./src/script.js",
  watch: true,
  optimization: {
    minimize: false,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
