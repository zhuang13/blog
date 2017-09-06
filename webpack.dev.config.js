var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        bundle: "./src/page/index.jsx"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: "index.js",
        chunkFilename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            PRODUCTION: 'false',
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    module: {
        loaders: [
            { test: /\.html$/, exclude: /node_modules/, loader: 'html-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ['es2015']} },
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ['es2015', 'react', 'stage-0']} },
            { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" },
            { test: /\.scss$/, exclude: /node_modules/, loader: "style-loader!css-loader!sass-loader" },
            { test: /\.(png|jpg|gif|jpeg)$/, exclude: /node_modules/, loader: "url-loader", query: {limit: 100, name: "assets/images/[name].[ext]"} }
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
                    from: /^\/assets\/.*$/,
                    to: function(context) {
                        return './src' + context.parsedUrl.pathname
                    }
                },
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