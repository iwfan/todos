const path = require('path')

const env = process.env.NODE_ENV
module.exports = {
    mode: env || 'development',
    entry: {
        index: './src/index.js',
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
    module: {},
    plugins: [],
}