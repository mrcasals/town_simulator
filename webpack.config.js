var path              = require('path'),
    webpack           = require('webpack'),
    phaserModule      = path.join(__dirname, '/node_modules/phaser/'),
    phaser            = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi              = path.join(phaserModule, 'build/custom/pixi.js'),
    p2                = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "dist",
    publicPath: "/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.css'],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    }
  },
  module: {
    loaders: [
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' },
      { test: /\.(ttf|png|xml|json|ogg|wav|mp3)/, loader: 'file-loader' },
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
