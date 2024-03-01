const path = require("path");

module.exports = {
  entry: {
    "djinni-apply": "./src/scripts/content/djinni/djinni-apply.js",
    "djinni-apply-succeded":
      "./src/scripts/content/djinni/djinni-apply-succeded.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
