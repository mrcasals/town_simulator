var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: "dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        loaders: ["babel", "awesome-typescript"],
        test: /\.ts$/,
        exclude: /node_modules/
      },
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
  resolve: {
    extensions: ['', '.ts', '.js', '.css'],
  },
  devServer: {
    host: "0.0.0.0"
  }
};
