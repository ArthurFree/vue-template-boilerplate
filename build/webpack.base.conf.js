const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const formatter = require('eslint-friendly-formatter');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

// remove warning
// see: https://github.com/vuejs/vue-loader/issues/666
process.noDeprecation = true;

module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter,
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
                options: {
                    presets: [
                        'flow',
                        ['env', { modules: false }],
                        'stage-2',
                    ],
                },
            },
            {
                test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                },
            },
        ],
    },
};
