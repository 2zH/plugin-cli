import resolveFrom from 'resolve-from'
import {
  projectPath
} from '../../../lib'

export const presets = [
  [resolveFrom(projectPath, 'babel-preset-env'), {
    modules: false,
    target: {
      browser: [
        'Chrome >= 52',
        'FireFox >= 44',
        'Safari >= 7',
        'Explorer 11',
        'last 4 Edge versions'
      ]
    },
    useBuiltIns: false
  }]
]

export const plugins = [
  'babel-plugin-transform-decorators-legacy',
  'babel-plugin-transform-object-rest-spread',
  'babel-plugin-transform-class-properties'
].map((babelPlugin) => resolveFrom(projectPath, babelPlugin))