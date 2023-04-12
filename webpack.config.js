const path = require("path");

module.exports = {
    entry: {
        index: './codes/home.js',
        interaction: './codes/interaction.js',
        simulation: './codes/simulation.js',
        inputs: './codes/inputs.js',
        render1:'./codes/render1.js',
        customs:'./codes/customs.js'
        //gear: './babylonthingtemp/gear.js'
        
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
    },*/
    module: {
            rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      }]
    },
      /*
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