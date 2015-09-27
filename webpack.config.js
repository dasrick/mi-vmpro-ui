module.exports = {
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  devtool: 'inline-source-map'
};