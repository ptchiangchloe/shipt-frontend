const webpack = require("webpack");
const path = require("path");

let DIST_DIR = path.resolve(__dirname, "dist");
let SRC_DIR = path.resolve(__dirname, "src");

let config = {
    devtool: 'eval',
    entry: ['babel-polyfill', SRC_DIR + "/index.js"],
    target: 'web',
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
        publicPath: '/'
    },
    // devtool: 'inline-source-map',
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: /flexboxgrid/
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
};

module.exports = config;
