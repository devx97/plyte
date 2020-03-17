const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const outputDirectory = 'public';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const clientConfig = {
  mode,
  devtool: 'eval-source-map',
  entry: ['core-js/stable', './src/client/index.js'],
  stats: 'errors-warnings',
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
              useBuiltIns: 'usage',
              corejs: 3,
            }],
            ["@babel/preset-react"]
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            mode === 'development' && require.resolve("react-refresh/babel")
          ],
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
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'}),
    mode === 'development' && new ReactRefreshWebpackPlugin({disableRefreshCheck: true})
  ]
}

const serverConfig = {
  entry: './src/server/server.js',
  target: 'node',
  mode,
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, outputDirectory),
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ],
  }
}

module.exports = [clientConfig, serverConfig]