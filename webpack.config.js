const path = require("path");

module.exports = {
    entry: {
        index: './codes/home.js',
        simulation: './codes/simulation.js',
        basis: './codes/basis.js',
        inputs: './codes/inputs.js',
        
        /*index: {
            import: './codes/home.js',
            dependOn: 'shared',
          },
          simulation: {
            import: './codes/simulation.js',
            dependOn: 'shared',
          },
          shared: 'babylonjs',*/
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'result'),
        clean: true,
    },
  /*   optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
   },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
          ],
        /*
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },*/
    mode: "none"
};