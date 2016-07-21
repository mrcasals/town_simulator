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
      },
      {
        test: /\.sass$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  devServer: {
    host: "0.0.0.0"
  }
};
