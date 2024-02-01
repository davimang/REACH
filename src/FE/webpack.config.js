const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './FEsrc/index.tsx',

    plugins: [
        new HTMLWebpackPlugin({
            template: './FEsrc/index.html'
        })
    ],
    devServer: {
        allowedHosts: 'all',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                exclude: /node_modules/,
                type: 'asset/resource'
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', "..."]
    }

}
