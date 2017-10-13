import { presets, plugins } from '../common/babelOpts';
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const jsRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets,
      plugins
    }
  }
}

const rules = [
  jsRule
]

export default rules
