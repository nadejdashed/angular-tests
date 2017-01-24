var path = require('path');

module.exports = {
    entry: {
        bundle: './app/scripts/app.module.js',
        mock: './app/mocks/app-mocks.module.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }, {
           test: /\.html$/,
            loader: 'raw'
        }]
    }
};