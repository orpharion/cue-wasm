const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                // exclude: /node_modules/,
            },
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({

            title: 'Output Management',

        }),

    ],
    resolve: {
        extensions: ['.ts', 'js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};