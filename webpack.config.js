const path = require('path');
module.exports = {
    entry: ['./src/stopwatch/stopwatch.ts',
        './src/dragdrop/dragdrop.ts',
        './src/piglatin/piglatin.ts',
        './src/typeahead/typeahead.ts',
        './src/mosaic/mosaic.ts'],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src')
    }
};