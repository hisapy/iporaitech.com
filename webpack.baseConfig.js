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
      // favicon: "favicon.ico",
      language: "es"
    }),
    new HtmlWebpackPlugin({
      template: "template.html",
      filename: "en/index.html",
      // favicon: "favicon.ico",
      language: "en"
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: "./images/favicon.png",
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: "#60a6b4",
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: "Iporaitech",

      // generated absolute path in order to make it work with generated en/index.html
      prefix: "/icons-[hash]/",

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        windows: true
      }
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
