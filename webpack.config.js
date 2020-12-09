const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const sourceDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

const babelOptions = {
  babelrc: false,
  presets: [
    ['@babel/preset-env', {
      targets: {browsers: ['last 2 versions']},
    }],
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
  plugins: [
    ...(devMode ? [require.resolve('react-refresh/babel')] : []),
  ]
}

module.exports = {
  target: 'web',
  mode: devMode ? 'development' : 'production',
  optimization: {
    moduleIds: 'named',
  },
  devtool: 'source-map',
  entry: `${sourceDir}/index.js`,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: babelOptions,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[contenthash:base64:3]',
              },
              sourceMap: true,
            },
          }
        ],
      }
    ],
  },
  output: {
    path: distDir,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${distDir}/index.html`,
      template: `${__dirname}/index.html`,
    }),
    new webpack.EnvironmentPlugin({
      "process.env.NODE_ENV": process.env.NODE_ENV || 'development',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      PropTypes: 'prop-types',
    }),
    ...(devMode ? [new ReactRefreshWebpackPlugin()] : []),
    ...(devMode ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
}
