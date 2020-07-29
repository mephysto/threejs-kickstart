const path = require('path');

module.exports = {
  entry: './src/script.js',
  watch: true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};