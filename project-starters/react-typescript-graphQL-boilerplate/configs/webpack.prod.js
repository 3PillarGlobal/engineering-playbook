const {resolve} = require('path');

module.exports = {
    mode: 'production',
    entry: './index.tsx',
    context: resolve(__dirname, '../src'),
    output: {
        filename: 'js/bundle.[hash].min.js',
        path: resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            { test: /\.css$/, loader: 'typings-for-css-modules-loader?modules&namedExport&camelCase' }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    performance: {
        hints: false,
    },
    devtool: 'source-map',
    plugins: []
};