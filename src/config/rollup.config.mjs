import babelOpts from './babelOpts'
import babelPlugin from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export const inputOptions = {
  external: ['jquery', 'As', 'animejs'],
  plugins: [
    resolve(),
    babelPlugin(babelOpts)
  ]
}

export const outputOptions = {
  format: 'umd',
  globals: {
    jquery: 'jquery',
    As: 'As',
    animejs: 'animejs'
  }
}