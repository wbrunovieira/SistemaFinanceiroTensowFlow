// webpack.dev.js

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { paths, templateContent } = require("../scripts/utils");

module.exports = {
    name: "client",
    mode: "development",
    target: "web",
    devtool: "source-map",
    entry: {
        bundle: [
            require.resolve("core-js/stable"),
            require.resolve("regenerator-runtime/runtime"),
            paths.client,
        ],
    },
    output: {
        path: path.join(paths.build, paths.publicPath),
        filename: "bundle.js",
        publicPath: paths.publicPath,
    },
    resolve: {
        modules: [paths.src, "node_modules"],
        extensions: [".js", ".jsx"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
        fallback: {
            process: require.resolve("process/browser"),
        },
    },
    module: require("./loaders.js"),
    plugins: [
        new HtmlWebpackPlugin({
            templateContent,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ],
    stats: "minimal",
};
