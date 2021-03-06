import babelPlugin from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { presets, plugins } from '../common/babelOpts'
import externals from '../common/externals'
import externalHelpers from 'babel-plugin-external-helpers'

const babelOptions = {
  presets,
  babelrc: false,
  exclude: 'node_modules/**',
  plugins: plugins.concat(externalHelpers)
}

export const inputOptions = {
  external: Object.keys(externals),
  plugins: [
    resolve(),
    babelPlugin(babelOptions)
  ]
}

export const outputOptions = {
  format: 'umd',
  globals: externals,
  exports: 'named'
}