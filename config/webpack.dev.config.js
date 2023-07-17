/**
 * Created by junxie on 18/5/27.
 */
const path = require('path');

const {
    merge
} = require('webpack-merge');

const baseConfig = require('./webpack.basic');

const devConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.join(__dirname, '../example/src/app.js'),
    output: {
        path: path.join(__dirname, '../example/src/'),
        filename: 'bundle.js'
    },
    devServer: {
        static: path.join(__dirname, '../example/src/'),
        compress: true,
        host: 'localhost',
        open: true
    }
};
module.exports = merge(devConfig, baseConfig);

