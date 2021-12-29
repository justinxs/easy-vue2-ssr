const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = target => {
    return {
        performance: {
            // 资源文件最大限制大小warning提示 1000kb
            maxAssetSize: 1000 * 1024,
            maxEntrypointSize: 1000 * 1024,
        },
        output: {
            filename: '[name].js',
            chunkFilename: 'js/[name].js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.m?js$/,
                    loader: 'babel-loader',
                    exclude: file => {
                        return /node_modules/.test(file)
                    }
                },
                {
                    test: /\.s?css$/i,
                    use: [
                        target == 'server' ? {
                            loader: 'null-loader'
                        } : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // 相对路径，针对本地打开
                                // publicPath: '../'
                            }
                        },
                        {
                            loader: "css-loader",
                            options: { importLoaders: 1 },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "autoprefixer",
                                            {
                                                // Options
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                // Prefer dart-sass or node-sass defalut: dart-sass
                                // dart-sass比node-sass编译慢一倍左右
                                implementation: require("sass"),
                            },
                        }
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                    // asset 自动地在 asset/resource 和 asset/inline 之间进行选择, 默认size < 8kb 实行asset/inline
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 // 4kb
                        }
                    },
                    generator: {
                        filename: 'images/[name].[hash][ext]',
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    // asset 自动地在 asset/resource 和 asset/inline 之间进行选择, 默认size < 8kb 实行asset/inline
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 // 4kb
                        }
                    },
                    generator: {
                        filename: 'fonts/[name].[hash][ext]',
                    },
                },
            ],
        },
        plugins: [
            new ESLintPlugin(),
            new VueLoaderPlugin(),
            // 注入webpack编译时js中的全局变量
            new webpack.DefinePlugin({
                'process.env.THEME': JSON.stringify(process.env.THEME)
            })
        ],
        resolve: {
            // 路径别名以及文件默认查找后缀数组
            alias: {
                '@': path.resolve(__dirname, '../src'),
                '@styles': path.resolve(__dirname, '../src/styles'),
                '@images': path.resolve(__dirname, '../src/images'),
                '@theme': path.resolve(__dirname, `../src/styles/themes/${process.env.THEME}.scss`)
            },
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
        }
    };
};