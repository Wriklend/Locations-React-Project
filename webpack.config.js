const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { resolve } = require('path');

const SRC_DIR = resolve(__dirname, './src');
const DIST_DIR = resolve(__dirname, './dist');

const environment = process.env.NODE_ENV || 'development';
const development = environment === 'development';
const API = 'api';
const BACKEND_URL = 'https://dev-api.confidence.org/v2/confidence';

module.exports = {
  context: SRC_DIR,
  mode: environment,
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [
      SRC_DIR,
      'node_modules',
    ],

    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  entry: {
    main: 'index.tsx',
  },

  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: development ? 'js/[name].js' : 'js/[name].[chunkhash:6].js',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },

      {
        test: /\.s?css$/,
        use: [
          { loader: development ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: false, importLoaders: 3 } },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },

      {
        test: /\.(jpe?g|png|webp|gif|ico|zip|pdf|mp4)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.svg$/,
        issuer: /\.tsx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  { removeViewBox: false },
                  { prefixIds: false },
                ],
              },
            },
          },
        ],
      },

      {
        test: /\.svg$/i,
        issuer: /\.s?css$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),

    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify(environment),
      'process.env.API': JSON.stringify(API),
      'process.env.BACKEND_URL': JSON.stringify(BACKEND_URL),
    }),
  ],

  devServer: {
    proxy: {
      '/api': {
        target: 'https://dev-api.confidence.org/v2/confidence',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '/api': '' },
      },
    },
  },
};
