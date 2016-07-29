var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "dist",
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html'
    })
  ],
  devServer: {
    host: "0.0.0.0"
  }
};
