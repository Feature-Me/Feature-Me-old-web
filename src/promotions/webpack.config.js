const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname,"script.js"),
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: path.join(__dirname,"../","tsconfig.json") })]
    },
    target: "web",
    module: {
        rules: [
        ]
    }
}