const require_esm = require('@std/esm')(module);

const webpack = require('webpack');
const path = require('path');
const rules = require_esm('./webpack.rules').default;
const externals = require_esm('../externals').default;

const entry = path.join(__dirname, '../../src/main.js');
const output = {
  filename: 'as-core.js',
  path: path.join(__dirname, '../../dist'),
  library: 'As',
  libraryTarget: 'umd'
}

module.exports = {
  entry,
  output,
  module: {
    rules
  },
  externals: {
    jquery: 'jQuery'
  }
}