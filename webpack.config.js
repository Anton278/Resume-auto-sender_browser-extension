const path = require("path");

module.exports = {
  entry: {
    djinni: "./djinni-apply.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "djinni-apply.js",
  },
};
