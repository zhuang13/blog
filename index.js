'use strict;';
require('babel-core/register');

var exec = require('child_process').exec; 
const path = require('path');
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
    'utils': path.join(__dirname, './src/utils'),
    'app': path.join(__dirname, './src/app'),
    'components': path.join(__dirname, './src/components'),
    'page': path.join(__dirname, './src/page'),
    'assets': path.join(__dirname, './src/assets'),
    'scss': path.join(__dirname, './src/scss'),
    'node': path.join(__dirname, './src/node'),
});

var config = require('config');

// 解析scss
var sass = require('node-sass');
var loadSass = function(scss_content, scss_dir) {
    var obj = sass.renderSync({
        data: scss_content,
        outputStyle: 'compressed',
        indentedSyntax: false,
        importer: function(url, prev) {
            return { file: path.join(scss_dir, url) }
        }
    });
    return obj.css.toString();
}

require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    name: '[name].[hash].[ext]',
    publicPath: config.CDN + '/assets/images/',
    limit: 8096
})

var replaceImagePath = function(scssDir, imagePath) {
    let p = imagePath.slice(4, imagePath.length-1);
    let imageAbsolutePath = path.join(scssDir, p);
    let value = imagePath;
    try { value = require(imageAbsolutePath); } catch(err) { }
    return 'url(' + value + ')';
}

// 重写scss文件的引入
var old = require.extensions['.js'];
require.extensions['.scss'] = function (mod, filename) {
    var compile = mod._compile;

    mod._compile = function (code, filename) {
        let scssDir = path.dirname(filename);
        let imagePaths = code.match(/url\((.*?)\)/g) || [];
        for (var i=0; i<imagePaths.length; i++) {
            code = code.replace(imagePaths[i], replaceImagePath(scssDir, imagePaths[i]));
        }
        code = loadSass(code, scssDir).replace('\n', '').replace(/\"/g, '\\\"');
        code = `var css = "${code}";module.exports = css;`;
        compile.call(mod, code, filename);
    }

    old(mod, filename);
}

if (config.PRODUCTION) {
    let webpack = require("webpack");
    let webpackConfig = require('./webpack.config.js');

    webpack(webpackConfig, (err, stats) => {
        let output = stats.toJson();
        if (err || stats.hasErrors() || stats.hasWarnings()) {
            console.log('err:', err, output);
        } else {
            exec('sh moveStatic.sh', function(err,stdout,stderr){console.log('moveStatic.sh', err, stdout,stderr)});
            let bundleName = output.assetsByChunkName.bundle;
            let createApp = require('./src/node/app').default;
            createApp(bundleName);
            console.log(`open in ${config.HOST}`);
        }
    });
} else {
    let createApp = require('./src/node/app').default;
    createApp();
    console.log(`open in ${config.HOST}:${config.PORT}`);
}