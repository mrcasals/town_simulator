module.exports = {
  entry: "./src/index.js",
  output: {
    path: "dist",
    publicPath: "/dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        loaders: ["babel"],
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
