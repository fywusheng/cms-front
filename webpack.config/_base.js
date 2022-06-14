const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InlineManifestPlugin = require('inline-manifest-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [ 'env' ],
        plugins: [
            "syntax-dynamic-import",
            "transform-object-rest-spread",
            "transform-runtime",
            ['import', {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
            }, 'vant']
        ]
    }
}
const sassLoader = [
    'style-loader',
    'css-loader',
    {
        loader: 'sass-loader',
        options: {
            data: '@import "~root/app/mixins/index.scss";'
        }
    }
]
module.exports = {
    entry: {
        'app-main': path.join(__dirname, '../src/index.js'),
        'pc-main': path.join(__dirname, '../src/index-pc.js'),
        'vendor': [
            'vue',
            'axios',
            'lodash',
            'js-cookie',
            'vue-lazyload',
            'vue-awesome-swiper'
        ],
    },
    output: {
        path: path.join(__dirname, '../cms-front'),
        chunkFilename: '[name]-[chunkhash:8].js',
        filename: '[name]-[chunkhash:8].js',
        library: 'Topic',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: babelLoader,
                            scss: sassLoader,
                            sass: sassLoader,
                            css: sassLoader
                        }
                    }
                }
            },
            {
                test: /\.js$/,
                use: babelLoader,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: _.tail(sassLoader)
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: _.tail(sassLoader)
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)(\?\S*)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/assets/template.html',
            filename: 'index-h5.html',
            chunks: ['vendor','app-main'],
            var: {
                CORE: '<CORE></CORE>'
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/app/assets/template.html',
            chunks: ['vendor','app-main'],
            filename: 'topic-frame.html',
            var: {
                CORE: '<script>var CORE = "BACKEND"</script>'
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/app/assets/template.html',
            chunks: ['vendor','pc-main'],
            filename: 'index-pc.html',
            var: {
                CORE: '<CORE></CORE>'
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/app/assets/template.html',
            chunks: ['vendor','pc-main'],
            filename: 'topic-pc-frame.html',
            var: {
                CORE: '<script>var CORE = "BACKEND"</script>'
            }
        }),
        new InlineManifestPlugin(),
        new ManifestPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'vendor', 'manifest' ]
        }),
        new ExtractTextPlugin({
            filename: '[name].[chunkhash:8].css',
            allChunks: true
        }),
        new CleanWebpackPlugin([ 'cms-front' ], {
            root: path.join(__dirname, '..')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            Axios: 'axios',
            Cookie: 'js-cookie',
            Vue: [ 'vue', 'default' ],
            XIU: [ 'XIU', 'default' ],
            ENV: [ 'root/config/env', 'default' ]
        })
    ],
    resolve: {
        extensions: [ '.js', '.vue', '.css', '.scss', '.json' ],
        alias: {
            root: path.join(__dirname, '../src'),
            XIU: path.join(__dirname, '../src/app/js/XIU')
        }
    }
}
