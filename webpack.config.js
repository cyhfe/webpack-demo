const HtmlWebpackPlugin = require("html-webpack-plugin")
const { merge } = require("webpack-merge")

const commonConfig = {
  plugins: [new HtmlWebpackPlugin()],
}

const productionConfig = {}

const developmentConfig = {
  devServer: {
    static: "./dist",
  },
}

module.exports = (env, args) => {
  switch (args.mode) {
    case "development":
      return merge(commonConfig, developmentConfig, { mode: args.mode })
    case "production":
      return merge(commonConfig, productionConfig, { mode: args.mode })
    default:
      throw new Error("No matching configuration was found!")
  }
}
