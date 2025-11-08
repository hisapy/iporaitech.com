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
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /(\.flow|\.ts)$/,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "template.html",
      language: "en",
      minify: {
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: "template.html",
      filename: "es/index.html",
      language: "es",
      minify: {
        collapseWhitespace: false,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: "./images/favicon.png",
      prefix: "icons/",
      favicons: {
        appName: "Iporaitech",
        appDescription: "Static web page",
        background: "#fff",
        icons: {
          // Only generate the basics
          favicons: true, // favicon.ico + favicon.png
          appleIcon: true,
          android: false,
          appleStartup: false,
          coast: false,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        exclude: path.resolve(__dirname, "src", "template.html"),
        use: [
          {
            loader: "html-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        // file-loader for images
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./images/",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
