const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 获取themes文件夹的所有主题（不包含以 _ 开头的scss文件）
 * webpack 启动和每当 监听文件变化 时都会触发 动态入口 自动编译
 * 注：开发环境中，新增主题scss文件由于之前并未被引用所以不被webpack监听到，需要手动触发文件变化或者重新编译 npm run start
 */
function getThemesEntry() {
    let entry = {};
    const dir = fs.readdirSync(path.resolve(__dirname, '../src/styles/themes'), { withFileTypes: true });
    for (const dirent of dir) {
        let name = dirent.name, entryName = name.split('.').slice(0, -1).join('.').toLowerCase();
        if (dirent.isFile() && !/^_/.test(name) && entryName !== process.env.THEME.toLowerCase()) {
            entry[entryName] = path.resolve(__dirname, '../src/styles/themes/', name);
        }
    }
    return entry;
}

module.exports = (env) => {
    return {
        mode: env.NODE_ENV,
        entry: getThemesEntry,
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'themes/js/[name].js',
            publicPath: ''
        },
        performance: {
            // 资源文件最大限制大小warning提示
            maxAssetSize: 500 * 1024,
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|webp)$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 // 4kb
                        }
                    },
                    generator: {
                        filename: 'images/[name].[hash][ext]',
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 // 4kb
                        }
                    },
                    generator: {
                        filename: 'fonts/[name].[hash][ext]',
                    }
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        },
                        'css-loader',
                        { 
                            loader: 'postcss-loader', 
                            options: { 
                                postcssOptions: loader => {
                                    return {
                                        plugins: [
                                            require('postcss-import')({ root: loader.resourcePath }),
                                            require('autoprefixer')({
                                                overrideBrowserslist: ['Android >= 9', 'iOS >= 11']
                                            }),
                                            require('cssnano')()
                                        ]
                                    }
                                }
                            } 
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                // Prefer dart-sass or node-sass defalut: dart-sass
                                // dart-sass比node-sass编译慢一倍左右
                                implementation: require("sass"),
                            },
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'themes/[name].css',
                ignoreOrder: false
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src'),
                '@styles': path.resolve(__dirname, '../src/styles'),
                '@images': path.resolve(__dirname, '../src/images')
            },
            extensions: ['.js', '.vue', '.json'],
        }
    };
};