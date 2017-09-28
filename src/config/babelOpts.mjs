export default {
  presets: [
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
  ],
  babelrc: false,
  exclude: 'node_modules/**',
  plugins: [
    'transform-decorators-legacy',
    'transform-object-rest-spread',
    'transform-class-properties',
    'external-helpers'
  ]
}