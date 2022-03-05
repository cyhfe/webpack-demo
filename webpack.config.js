const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  devServer: {
    static: "./dist",
  },
  plugins: [new HtmlWebpackPlugin()],
}
