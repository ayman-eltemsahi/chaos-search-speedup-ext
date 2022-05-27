const path = require('path');

module.exports = {
  devtool: false,
  entry: {
    'chaossearch': './dist/chaossearch/index.js',
    'monkey-patch-fetch': './dist/monkey-patch-fetch.js',
    'popup': './dist/ui/popup.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'unpacked')
  }
};
