const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const outputDirectory = 'public';

const clientConfig = {
  mode: 'development',
  entry: ['core-js/stable', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-env", {
              debug: true,
              useBuiltIns: 'usage',
              corejs: 3,
            }],
            ["@babel/preset-react"]
          ],
          plugins: ["@babel/plugin-proposal-class-properties", "react-hot-loader/babel"]
        }
      }
    }, {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader"
        }
      ]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
}

const serverConfig = {
  entry: './server.js',
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()]
}

module.exports = [clientConfig, serverConfig]