module.exports = {
    entry: {},
    output: {},
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