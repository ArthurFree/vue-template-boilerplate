const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
    const option = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: option.sourceMap,
        },
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [cssLoader];
        if (loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                }),
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader',
            });
        }
        return ['vue-style-loader'].concat(loaders);
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        styus: generateLoaders('stylus'),
        styl: generateLoaders('stylus'),
    };
};

// Generate loader for standalone style files (outside of .vue)
exports.styleLoaders = function styleLoaders(options) {
    const output = [];
    const loaders = exports.cssLoaders(options);
    // for (const extension in loaders) {
    //     if ({}.hasOwnProperty.call(loaders, extension)) {
    //         const loader = loaders[extension];
    //         output.push({
    //             test: new RegExp(`\\.${extension}$`),
    //             use: loader,
    //         });
    //     }
    // }
    Object.keys(loaders).forEach((item) => {
        const loader = loaders[item];
        output.push({
            test: new RegExp(`\\.${item}$`),
            use: loader,
        });
    });
    return output;
};
