export default [
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
  }],
  'stage-0'
]
