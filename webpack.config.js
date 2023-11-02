const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "MyReactPackage",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [ 
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.tsx?$/,
      //   use: "ts-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: [/\.js?$/, /\.ts?$/, /\.jsx?$/, /\.tsx?$/],
        enforce: "pre",
        exclude: /node_modules/,
        use: ["source-map-loader"],
      }, 
      {
        test: /\.(png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  devtool: "source-map",

  externals: {
    react: "react",
    "react-dom": "react-dom",
  }, 
  ignoreWarnings: [/Failed to parse source map/],
};
