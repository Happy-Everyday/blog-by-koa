const config = {
    mode: 'none',
    entry: {
        diary: './src/js/diary.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: __dirname + '/public/js',
      publicPath: '/public/'
    }
  };
  
  module.exports = config;