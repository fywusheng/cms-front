const _base = require('./_base')
const merge = require('webpack-merge')
const webpack = require('webpack')
module.exports = merge(_base, {
    output: {
        publicPath: 'http://139.9.51.110/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
})
