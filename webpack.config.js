const path = require("path");

module.exports = {
  entry: [
  "./js/util.js",
  "./js/constants.js",
  "./js/server.js",
  "./js/card.js",
  "./js/pin.js",
  "./js/map.js",
  "./js/page.js",
  "./js/form-validation.js",
  "./js/form.js",
  "./js/form-filtering.js",
  "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
