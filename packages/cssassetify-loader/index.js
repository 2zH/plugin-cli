const loaderUtils = require('loader-utils')
const fs = require('fs')

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

  const { path } = getLoaderConfig(this)
  
  if (path) {
    const dirs = path.split('/')
    console.log(dirs)
    // fs.writeFileSync()
  }

  return content
}