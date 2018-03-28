const path = require('path')

const env = process.env.NODE_ENV
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    config: {
        mode: env || 'development',
    },
}