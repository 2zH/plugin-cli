import {
  projectPath,
  pkgConfig,
  fixDir
} from '../../../lib'
import fs from 'fs'
import pluginsLernaConfig from './plugins.lerna'
import pluginsConfig from './plugins'
import path from 'path'

const rootPath = pkgConfig.root
const outputPrefix = path.join(projectPath, './build')
const outputPluginPrefix = `${outputPrefix}/plugins`

export const getCachePath = (moduleName) => {
  const cachePath = {
    cssCachePath: `${outputPluginPrefix}/${moduleName}/css/${moduleName}.css`,
    jsCachePath: `${outputPluginPrefix}/${moduleName}/${moduleName}.js`,
    mdCachePath: `${outputPluginPrefix}/${moduleName}/${moduleName}.md`,
    docJsCachePath: `${outputPrefix}/docs/${moduleName}.mjs`
  }
  Object.values(cachePath).forEach(fixDir)
  return cachePath
}

export const getPluginsPath = (moduleName) => {
  const fixPluginsDir = (config) => {
    Object.entries(config)
      .filter(([key, value]) => ['jsDistPath', 'cssDistPath'].includes(key))
      .map(([key, value]) => value)
      .forEach(fixDir)
    return config
  }
  const config = fs.readdirSync(rootPath).find((str) => str === 'lerna.json') ? pluginsLernaConfig : pluginsConfig
  return fixPluginsDir(config(rootPath, moduleName))
}