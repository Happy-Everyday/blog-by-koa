const config = {
    mode: 'none',
    entry: {
        home: './src/js/home.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: __dirname + '/public/js',
      publicPath: '/public/'
    }
  };
  
  module.exports = config;