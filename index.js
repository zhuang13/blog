'use strict;';
require('babel-core/register');

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
    return obj.css.toString().replace('\n', '').replace(/\"/g, '\\\"');
}

// 重写scss文件的引入
global.scss = '';
var old = require.extensions['.js'];
require.extensions['.scss'] = function (mod, filename) {
    var compile = mod._compile;

    mod._compile = function (code, filename) {
        // let scssDir = path.dirname(filename);
        // code = loadSass(code, scssDir);
        // code = `global.scss += "${code}"`;
        code = '';
        compile.call(mod, code, filename);
    }

    old(mod, filename);
}

require('./src/node/app');