var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ReplacePlugin = require('replace-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var moment = require('moment');

module.exports = {
    entry: {
      index: './js/c.js',
      index1: './js/c.js'
    },
    output: {
        path: path.join( __dirname,"/dist/js/"),
        filename: "[name].[hash:8].bundle.js",
        publicPath: "./js"
    },
    // resolve: { //可以把公共库转变为局部变量
    //     //root: path.join(__dirname,'/src/components/'),
    //     //root: "./src",
    //     modulesDirectories: ['node_modules','src'],
    //     extensions: ["", ".js", ".css", ".json"]
    // },
    module: {
      loaders: [
          {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: "babel",
              query:{
                  presets: ['es2015']
                  // ,
                  // plugins: [["antd", {"style":false}]]
              }
              // loader:"babel-loader" ---用这个就不需要.babelrc
          },
          {
              test: /\.css$/,
              loader: "style-loader!css-loader"
          }
          // {
          //   test: /\.css$/,
          //   loader: ExtractTextPlugin.extract({
          //       fallbackLoader: "style-loader",
          //       loader: "css-loader"
          //   })
          // }
          ,
          {
              test: /\.less$/,
              loader: "style!css!less"
          },
          { test:/\.(png|woff|svg|ttf|eot|jpg)$/,loader:'url-loader?limit=10000'}//限制大小小于10k的

      ]
    },
    plugins: [
        // new CleanWebpackPlugin(['dist'], {
        //     verbose: true  //清除构建目录
        // }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('prd')}),

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin({
          compress:{
              warnings: false,
              dead_code: true,
              drop_debugger: true,
              unused:true,
              drop_console: true,
              collapse_vars: true
          },
            /* 清除所有注释 */
            comments: function () {
                return "";
            }
        }),
        new webpack.BannerPlugin("gamdale erp pkg time:" + moment().format()),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:["libs"],
        //     // filename:'libs.min.js',
        //     minChunks:Infinity,
        //     async:true
        // }),
        // new webpack.optimize.AggressiveMergingPlugin(),

        new HtmlWebpackPlugin({
            template: "dist/temphtml/index.html",
            filename: "../index.html",
            inject: "body",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            template: "dist/temphtml/index1.html",
            filename: "../index1.html",
            inject: "body",
            chunks: ["index1"]
        })
        // new HtmlWebpackPlugin({
        //     template: "html/index.html",
        //     filename: "../temphtml/index.html",
        //     inject: "body",
        //     chunks: ["index"]
        // }),
        // new HtmlWebpackPlugin({
        //     template: "html/index1.html",
        //     filename: "../temphtml/index1.html",
        //     inject: "body",
        //     chunks: ["index1"]
        // })
        // "htmlWebpackPlugin": {
        //   "files": {
        //     "css": [ "main.css" ],
        //     "js": [ "assets/head_bundle.js", "assets/main_bundle.js"],
        //     "chunks": {
        //       "head": {
        //         "entry": "assets/head_bundle.js",
        //         "css": [ "main.css" ]
        //       },
        //       "main": {
        //         "entry": "assets/main_bundle.js",
        //         "css": []
        //       },
        //     }
        //   }
        // }
        // new ExtractTextPlugin("styles.css"),
        // new CopyWebpackPlugin([
        //     {from:"./images",to:"../images/"},
        //     {from:"./css",to:"../css/"}
        // ])
    ]
};
