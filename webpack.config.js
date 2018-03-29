const path = require('path')
// const UglifyJs = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const env = process.env.NODE_ENV
module.exports = {
    mode: env || 'development',
    entry: {
        index: './src/index2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][chunkhash].js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        port: '3143',
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'url-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new UglifyJs(),
        new HtmlWebpackPlugin({
            minify: { },
            hash: true,
            template: './src/index.html',
        }),
        new OpenBrowserPlugin({
            url: 'http://127.0.0.1:3143',
        }),
    ],
}