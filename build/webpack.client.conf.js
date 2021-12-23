const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js')('client');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isProd = env.NODE_ENV === 'production';
    const commonOptimization = {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor", // node_modules内的依赖库
                    chunks: "initial", // 只打包初始时依赖，异步引入单独打包
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    minChunks: 1,
                    minSize: 0
                },
                // 将非异步引入的 styles 文件夹内的样式 合并到一个css文件
                global: {
                    name: "global",
                    chunks: "initial",
                    test: /[\\/]src[\\/]styles[\\/]/,
                    priority: 10,
                    minChunks: 1,
                    minSize: 0
                },
                // 其他样式 合并到 component.css， 主要是 .vue 文件中的 style 或者异步组件中 import 的样式
                component: {
                    name: "component",
                    chunks: "all",
                    type: "css/mini-extract",
                    // 只合并 .vue 文件中的 style 样式
                    // test: module => {
                    //     if (module.type === 'css/mini-extract' && /[\\/]src[\\/].+?\.vue\?vue&type=style/.test(module._identifier)) {
                    //         return true
                    //     }
                    //     return false
                    // },
                    enforce: true
                },
            }
        }
    };
    const prodOptimization = {
        minimize: true,
        minimizer: [
            // webpack v5 开箱即带有最新版本的 terser-webpack-plugin，自定义配置仍需安装
            new TerserPlugin({
                extractComments: false,
                parallel: true
            }),
            // 这个插件使用 cssnano 优化和压缩 CSS
            new CssMinimizerPlugin()
        ]
    };

    return merge(baseConfig, {
        mode: env.NODE_ENV,
        entry: './src/entry-client.js',
        plugins: [
            // 提取style生成 css文件
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
                ignoreOrder: true
            }),
            new webpack.DefinePlugin({
                'process.env.VUE_ENV': '"client"'
            }),
            // 此插件在输出目录中
            // 生成 `vue-ssr-client-manifest.json`。
            new VueSSRClientPlugin()
        ],
        optimization: isProd ? Object.assign(commonOptimization, prodOptimization) : commonOptimization
    });
};