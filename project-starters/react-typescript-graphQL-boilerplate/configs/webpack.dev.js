const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve }  = require('path');

function srcPath(subDir) {
    return [resolve(__dirname, '../src'), subDir].join("");
}

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
        mainFields: ['browser', 'main', 'module'],
        alias: {
            components: srcPath("/components/"),
            constants: srcPath("/constants/"),
            style: srcPath("/style/")
        }
    },
    context: resolve(__dirname, '../src'),
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: 'awesome-typescript-loader' 
            },
            { 
                test: /\.js$/, 
                loader: 'source-map-loader' 
            },
            { 
                test: /\.scss$/,
                loaders: [ 'style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'sass-loader' ],
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    performance: {
        hints: false,
    },

    entry: [
        './index.tsx',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
    ],
    devtool: 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({template: '../src/index.html'}),
    ]  
};