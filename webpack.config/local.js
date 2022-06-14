const _ = require('lodash')
const os = require('os')
const IP = _.reduce(os.networkInterfaces(), (result, value) => result || _.find(value, {
    family: 'IPv4',
    internal: false
}), null).address
const _base = require('./_base')
const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = merge(_base, {
    output: {
        chunkFilename: 'component-[name].js',
        filename: '[name].js',
        publicPath: `http://${IP}:9091/`
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/app/assets/template.html',
            var: {
                CORE: '<script>var CORE = "LOCAL"</script>'
            }
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: 9091,
        disableHostCheck: true
    },
    devtool: 'cheap-source-map',
    watch: true
})
// 去掉css文件名的hash
config.plugins.splice(5, 1, new ExtractTextPlugin({ filename: '[name].css', allChunks: true }));
module.exports = config;
