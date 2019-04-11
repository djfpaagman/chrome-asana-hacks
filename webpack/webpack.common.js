const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        settings: path.join(__dirname, '../src/settings.ts'),
        "asana-hacks": path.join(__dirname, '../src/asana-hacks.ts'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};
