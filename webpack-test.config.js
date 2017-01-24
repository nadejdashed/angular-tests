module.exports = {
    entry: {},
    output: {},
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }, {
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'isparta-instrumenter'
        }, {
           test: /\.html$/,
            loader: 'raw'
        }]
    }
};