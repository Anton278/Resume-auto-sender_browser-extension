const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    djinni: "./src/scripts/content/djinni/djinni.js",
    "djinni-apply": "./src/scripts/content/djinni/djinni-apply.js",
    "djinni-apply-succeded":
      "./src/scripts/content/djinni/djinni-apply-succeded.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json" },
        { from: "./src/scripts/background/background.js" },
        { from: "./src/scripts/content/djinni/worker.js" },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
