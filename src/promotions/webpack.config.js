const path = require("path");
module.exports = {
    entry: path.resolve(__dirname,"script.js"),
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    target: "web",
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.ts?$/, loader: 'ts-loader' },
            { test: /\.jsx?$/, loader: 'babel-loader' },
            { test: /\.(scss|css)$/, use: ['style-loader', { loader: 'css-loader', options: { modules: true } }, 'postcss-loader', 'sass-loader'] },
            { test: /\.(jpg|png)$/, loader: 'url-loader',type:"asset/inline" },
            { test: /\.(ttf)$/, /* loader: 'url-loader', */type: "asset/inline", generator: {dataUrl:context=> "data:font/ttf;base64,"+context.toString("base64")}},
            { test: /\.(otf|OTF)$/, /* loader: 'url-loader', */type: "asset/inline", generator: {dataUrl:context=> "data:font/otf;base64,"+context.toString("base64")}},
            //{ test: /\.json$/, loader: 'json-loader' },

        ]
    }
}