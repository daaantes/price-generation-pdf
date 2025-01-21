const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
  entry: {
    app: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./app/[name].[contenthash].bundle.js",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: "single",
    minimize: true,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["app"],
      template: "./src/index.html",
      inject: "body",
      scriptLoading: "blocking",
      chunksSortMode: "manual",
    }),
    new MiniCssExtractPlugin({ filename: "./styles/[name].[contenthash].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: { esModule: false },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[contenthash].[ext]",
          outputPath: "./assets/fonts/",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[contenthash].[ext]",
          outputPath: "./assets/images/",
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|test)$/,
        loader: "babel-loader",
      },
    ],
  },
};
