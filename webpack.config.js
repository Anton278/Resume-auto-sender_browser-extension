const path = require("path");

module.exports = {
  entry: {
    "djinni-apply": "./djinni-apply.js",
    "djinni-apply-succeded": "./djinni-apply-succeded.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
