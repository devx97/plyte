const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  entry: './',
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()]
}

const clientConfig = {
  entry: './client/src',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  },
}

module.exports = [ serverConfig, clientConfig ];