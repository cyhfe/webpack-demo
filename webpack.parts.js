const path = require('path')
const { WebpackPluginServe } = require("webpack-plugin-serve");
const {
  MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


exports.devServer = () => ({
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: parseInt(process.env.PORT, 10) || 8080,
      static: "./dist", // Expose if output.path changes
      liveReload: true,
      waitForBuild: true,
    }),
  ],
});

exports.page = ({ title }) => ({
  plugins: [new MiniHtmlWebpackPlugin({ context: { title } })],
});

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options },
            "css-loader",
          ].concat(loaders),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  };
};

exports.tailwind = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: { plugins: [require("tailwindcss")()] },
  },
});

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: { plugins: [require("autoprefixer")()] },
  },
});

exports.loadImages = ({ limit } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: limit } },
      },
    ],
  },
});

const APP_SOURCE = path.join(__dirname, "src");

exports.loadJavaScript = () => ({
  module: {
    rules: [
      // Consider extracting include as a parameter
      { test: /\.js$/, include: APP_SOURCE, use: "babel-loader" },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({ devtool: type });

exports.clean = () => ({
  output: {
    clean: true,
  },
});

exports.loader = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, './loader.js'),
          },
        ],
      },
    ],
  }
})

