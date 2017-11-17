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
    cssCachePath: `${outputPluginPrefix}/${moduleName}/css`,
    jsCachePath: `${outputPluginPrefix}/${moduleName}`,
    mdCachePath: `${outputPluginPrefix}/${moduleName}/${moduleName}.md`,
    docJsCachePath: `${outputPrefix}/docs/${moduleName}.mjs`
  }
  Object.values(cachePath)
    .forEach(fixDir)
  return cachePath
}

export const getPluginsPath = (moduleName) => {
  const configGen = fs.readdirSync(rootPath)
    .find((str) => str === 'lerna.json')
      ? pluginsLernaConfig
      : pluginsConfig
  const config = configGen(rootPath, moduleName)
  if (!fs.existsSync(config.modulePath)) {
    throw new Error('module not Found!')
  }
  Object.entries(config)
    .filter(([key, value]) => ['jsDistPath', 'cssDistPath'].includes(key))
    .map(([key, value]) => value)
    .forEach(fixDir)
  return config
}