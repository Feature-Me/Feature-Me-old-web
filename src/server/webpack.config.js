const path = require("path");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const compressionWebpackPlugin = require("compression-webpack-plugin");


module.exports = {
    entry: path.resolve(__dirname,"server.ts"),
    mode: "production",
    output: {
        path: path.resolve(__dirname, "../../dist/server"),
        filename: "server.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        plugins:[
            new TsConfigPathsPlugin({ configFile: path.join(__dirname,"tsconfig.json") }),
        ]
    },
    target: "node",
    module: {
        rules: [
            /* { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.ts?$/, loader: 'ts-loader' },
            { test: /\.jsx?$/, loader: 'babel-loader' }, */
            {
                test: /\.(js[x]?|ts[x]?)$/, loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                    plugins: ["@babel/plugin-syntax-jsx"]
                },
            }
            //{ test: /\.json$/, loader: 'json-loader' },

        ]
    }
}