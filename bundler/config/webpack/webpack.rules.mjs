import babelOpts from '../babelOpts';

const jsRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets,
      cacheDirectory: true
    }
  }
}

const rules = [
  jsRule
]

export default rules
