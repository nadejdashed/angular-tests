module.exports = {
    entry: {},
    output: {},
    devtool: 'eval',
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