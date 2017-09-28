const path = require('path');
const require_esm = require('@std/esm')(module);
const babelOpts = require_esm('../babelOpts').default;
const external = require_esm('../externals').default;
const babel = require('rollup-plugin-babel');

module.exports = {
  input: path.join(__dirname, '../../src/main.js'),
  output: {
    file: path.join(__dirname, '../../dist/as-core.ru.js'),
    format: 'umd',
    name: 'as'
  },
  external,
  globals: {
    jquery: '$'
  },
  plugins: [
    babel({
      presets: babelOpts,
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ]
}