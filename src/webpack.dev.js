const {merge} = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: "development",
    // entry: "./FE/index.tsx",
    devServer: {
        port: 42237
    }
});
