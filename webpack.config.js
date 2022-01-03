const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const config = { mode: "development" };
  if (!isDev) {
    config.mode = "production";
  }
  return {
    ...config,
    target: ["web", "es5"],
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      extensions: [".jsx", ".js", ".json"],
    },
    devServer: {
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
    ].concat(
      isDev
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: "[name].css",
              chunkFilename: "[id].css",
              ignoreOrder: false,
            }),
          ]
    ),
  };
};
