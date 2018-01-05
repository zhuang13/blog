var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
var config = require('config');

module.exports = {
    entry: {
        bundle: "./src/page/client.jsx"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: config.CDN + '/',
        filename: "index.js",
        chunkFilename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    module: {
        loaders: [
            { test: /\.html$/, exclude: /node_modules/, loader: 'html-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ['es2015']} },
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ['es2015', 'react', 'stage-0']} },
            { test: /\.css$/, exclude: /node_modules/, loader: "to-string-loader!css-loader" },
            { 
                test: /\.scss$/,
                use: [
                    'to-string-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'compressed',
                            data: '$CDN: "' + config.CDN + '";'
                        }
                    }
                ]
            },
            { test: /\.(png|jpg|gif|jpeg)$/, exclude: /node_modules/, loader: "url-loader", query: {limit: 8096, name: "assets/images/[name].[ext]"} }
        ]
    },
    resolve: {
        alias: {
            utils: path.join(__dirname, './src/utils'),
            app: path.join(__dirname, './src/app'),
            components: path.join(__dirname, './src/components'),
            page: path.join(__dirname, './src/page'),
            assets: path.join(__dirname, './src/assets'),
            scss: path.join(__dirname, './src/scss')
        }
    },
    devServer: {
        historyApiFallback:{
            index: '/',
            rewrites: [
                {
                    from: /^\/api\/.*$/,
                    to: function(context) {
                        return './src' + context.parsedUrl.pathname
                    }
                },
                {
                    from: /^\/public\/.*$/,
                    to: function(context) {
                        return './src' + context.parsedUrl.pathname
                    }
                }
            ]
        }
    },
}