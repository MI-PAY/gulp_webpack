module.exports = {
    entry: {
      index: 'c.js'
    },
    output: {
        path: __dirname,
        filename: "[hash].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
              // "test" is commonly used to match the file extension
              test: /\.jsx$/,

              // "include" is commonly used to match the directories
              include: [
                path.resolve(__dirname, "app/src"),
                path.resolve(__dirname, "app/test")
              ],

              // "exclude" should be used to exclude exceptions
              // try to prefer "include" when possible

              // the "loader"
              loader: "babel-loader"
          }
        ]
    }
};
