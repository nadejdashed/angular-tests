module.exports = {
    entry: {},
    output: {},
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