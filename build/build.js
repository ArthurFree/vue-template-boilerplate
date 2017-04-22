require('./check-versions')()

process.env.NODE_ENV = 'production'

// Elegant terminal spinner
// https://www.npmjs.com/package/ora
var ora = require('ora')

// The UNIX command rm -rf for node.
// https://www.npmjs.com/package/rimraf
var rm = require('rimraf')

var path = require('path')

// 见 build/check-versions.js
var chalk = require('chalk')

var webpack = require('webpack')

var config = require('../config')

var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for prroduction...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err;
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');
        console.log(chalk.cyan('   Build complete.\n'));
        console.log(chalk.yellow(
            '   Tip: built files are meant to be served over an HTTP server.\n' + 
            '   Opeaning index.html over file:// worn\'t work.\n'
        ))
    })
})