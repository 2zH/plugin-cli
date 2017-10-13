export const presets = [
  ['env', {
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
  'transform-decorators-legacy',
  'transform-object-rest-spread',
  'transform-class-properties'
]