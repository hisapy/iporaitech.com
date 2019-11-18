/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    filename: "main-[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.IgnorePlugin(/(\.flow|\.ts)$/),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "template.html",
      language: "en"
    }),
    new HtmlWebpackPlugin({
      template: "template.html",
      filename: "es/index.html",
      language: "es"
    }),
    new FaviconsWebpackPlugin({
      logo: "./images/favicon.png",
      background: "#fff",
      prefix: "icons/"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: path.resolve(__dirname, "src", "template.html"),
        use: ["html-loader"]
      },
      {
        // file-loader for images
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./images/"
            }
          }
        ]
      }
    ]
  }
};
