const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './FEsrc/index.tsx',

    plugins: [
        new HTMLWebpackPlugin({
            template: './FEsrc/index.html'
        })
    ],

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
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', "..."]
    }

}
