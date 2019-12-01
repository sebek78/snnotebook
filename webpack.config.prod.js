'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require("webpack-bundle-analyzer");
const webpack = require("webpack");

process.env.NODE_ENV = "production";

module.exports = {
    entry: './app/app.module.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.bundle.js'
    },
    mode: 'production',
    target: 'web',
    devtool: 'source-map',
    plugins: [
        new webpackBundleAnalyzer.BundleAnalyzerPlugin({
            analyzerMode: "static"
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
                template: './app/index.html',
                favicon: "./app/snn-icon.png",
                minify: {
                    // see https://github.com/kangax/html-minifier#options-quick-reference
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                }
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        })
    ],
    module: {
        rules: [
            {
                test: [/.css$|.scss$/],
                use: [
                        MiniCssExtractPlugin.loader,
                        {
                        loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'sass-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("cssnano")],
                            sourceMap: true
                        }
                    }

                    ]
                },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["angularjs-annotate"]

                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                ],
            },
        ]
    }

};