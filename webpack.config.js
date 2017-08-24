const path = require('path')
const version = require('./package.json').version
const webpack = require('webpack')

const banner =
'/*!\n' +
' * vue-nani-kore v' + version + ' (https://github.com/goto10hq/vue-nani-kore)\n' +
' * (c) ' + new Date().getFullYear() + ' Frohikey / Goto10 \n' +
' * Released under the MIT License.\n' +
' */'

module.exports = {    

    context: __dirname,

    entry: {
        index: ['./src/index.js']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'vue-nani-kore',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue'],
    },

    externals: {
        vue: 'vue',
    },

    plugins: [
        new webpack.BannerPlugin({
          banner: banner,
          raw: true,
          entryOnly: true
        })
    ]
};
