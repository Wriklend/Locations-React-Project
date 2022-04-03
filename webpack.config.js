const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

const SRC_DIR = resolve(__dirname, './src');
const environment = process.env.NODE_ENV || 'development';
const development = environment === 'development';
const DIST_DIR = resolve(__dirname, './dist');

module.exports = {
  context: SRC_DIR,
  mode: 'development',
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
          { loader: 'postcss-loader', options: { sourceMap: 'inline' } },
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
  ],
};
