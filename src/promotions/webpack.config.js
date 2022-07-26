const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname,"script.js"),
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: path.join(__dirname,"../","tsconfig.json") })]
    },
    target: "web",
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.ts?$/, loader: 'ts-loader' },
            { test: /\.jsx?$/, loader: 'babel-loader' },
            { test: /\.(scss|css)$/, use: ['style-loader', { loader: 'css-loader', options: { modules: true } }, 'postcss-loader', 'sass-loader'] },
            { test: /\.(jpg|png|ico)$/, type: "asset/inline" },
            { test: /\.(ttf|TTF|otf|OTF)$/, /* loader: 'url-loader', */type: "asset/inline",/* generator: {dataUrl:context=> "data:font/otf;base64,"+context.toString("base64")} */ },
            { test: /\.cur?$/, type: "asset/inline", generator: { dataUrl: context => "data:image/cur;base64," + context.toString("base64") } },
            { test: /\.svg$/, type: "asset/inline" },
        ]
    }
}