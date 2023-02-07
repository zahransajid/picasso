const prod = process.env.NODE_ENV === 'production';
const basename = prod ? '/picasso/': "/";

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/build/',
    publicPath: basename
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.wasm$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  devtool: prod ? undefined : 'source-map',
  devServer : {
    historyApiFallback : true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      publicPath: basename
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __production__: JSON.stringify(prod),
      __basename__ : JSON.stringify(basename)
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: "public/mobilenet"}
      ]
    })
    // new webpack.ProvidePlugin({
    //   Buffer: ['buffer', 'Buffer'],
    // }),
  ],
};