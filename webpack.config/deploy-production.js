const _base = require('./_base')
const merge = require('webpack-merge')
const webpack = require('webpack')
module.exports = merge(_base, {
    output: {
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
})
