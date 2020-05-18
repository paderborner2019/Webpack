const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimazeCssAccessPlugi = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

const isDev = process.env.NODE_ENV ==="development"
const isProd = !isDev

const optimization = () => {
    const config ={
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer =[
            new OptimazeCssAccessPlugi(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties"
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }
    return opts
}

const cssLoader = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr : isDev,
                reloadAll: true
            }
        },"css-loader"
    ]
    if (extra) {
        loaders.push(extra)   
    }
    return loaders
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }
   return loaders
} 

const fileName = ext => isDev ?`[name].${ext}`: `[name].[hash].${ext}`

console.log('isDev:', isDev)
module.exports = {
    context: path.resolve(__dirname,"src"),
    mode: 'development',
    entry: {
        main:['@babel/polyfill','./index.jsx'],
        analytics: "./analytics.ts"
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname,'dist')
    },
    resolve: {
        extensions: ['.js','.png'],
        alias: {
            '@models': path.resolve(__dirname,'src/models'),
            '@': path.resolve(__dirname,'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:fileName('css')
        })
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname,"src/favicon.ico"),
        //         to: path.resolve(__dirname,'dist')
        //     }
        // ])
    ],
    devtool: isDev ? 'source-map' : '',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader()
            },
            {
                test: /\.less$/,
                use: cssLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoader("sass-loader")
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test:/\.(xml)/,
                use: ['xml-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions("@babel/preset-typescript")
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions("@babel/preset-react")
                }
            }
        ]
    }
}