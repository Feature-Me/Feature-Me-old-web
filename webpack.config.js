const path = require("path");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/client", "App", "index.tsx"),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist/scripts"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        plugins: [
            new TsConfigPathsPlugin({ configFile: path.join(__dirname, "src/client", "tsconfig.json") }),
        ]
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.(js[x]?|ts[x]?)$/, loader: 'babel-loader',
                options: {
                    presets: ['solid', '@babel/preset-typescript'],
                    plugins: ["@babel/plugin-syntax-jsx"]
                },
            },
            {
                test: /\.module\.[s]?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: true }
                    },
                    'postcss-loader', 'sass-loader'
                ],
            },
            {
                test: /\.[s]?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                    'postcss-loader', 'sass-loader'
                ],
                exclude: /\.module\.[s]?css/
            },
            {
                test: /\.cur?$/,
                type: "asset/inline",
                generator: { dataUrl: context => "data:image/cur;base64," + context.toString("base64") }
            },
            { test: /\.(jpg|png|ico)$/, type: "asset/inline" },
            { test: /\.(ttf|TTF|otf|OTF)$/, type: "asset/inline" },
            { test: /\.svg$/, type: "asset/inline" },
            { test: /\.mp3$/, type: "asset/inline" },
            { test: /\.mp4|\.m4a$/, type: "asset/inline" },
        ]
    }
}