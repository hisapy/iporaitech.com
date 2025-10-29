/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.baseConfig.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    host: "0.0.0.0",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
});
