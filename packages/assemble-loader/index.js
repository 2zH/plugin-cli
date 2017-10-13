const app = require('assemble')()
const loaderUtils = require('loader-utils')

function getLoaderConfig(context) {
  const query = loaderUtils.getOptions(context) || {}
  const { config: configKey = 'assembleLoader', ...others } = query
  const config = context.options && context.options.hasOwnProperty(configKey)
    ? context.options[configKey]
    : {};
  return {
    ...config,
    ...others
  };
}

module.exports = function(content) {
  const asyncify = this.async()

  if (this.cacheable) {
    this.cacheable()
  }

  const keys = [
    'partials',
    'layouts',
    'data',
    'helpers',
    'pages'
  ]

  const config = getLoaderConfig(this)

  app.option('layout', 'default')

  for (const key of keys) {
    if (config[key]) {
      app[key](config[key])
    }
  }

  app.page('plugin.hbs', {
    content
  })

  app.render('plugin.hbs',  (err, { content }) => {
    if (err) {
      return asyncify(err)
    }
    asyncify(null, content)
  })
}