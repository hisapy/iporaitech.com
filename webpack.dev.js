/* eslint-disable import/no-extraneous-dependencies */
const merge = require("webpack-merge");
const baseConfig = require("./webpack.baseConfig.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-eval-source-map",
  devServer: {
    contentBase: "./dist",
    host: "0.0.0.0"
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
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      }
    ]
  }
});
