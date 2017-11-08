import {
  getPluginsPath
} from '../config/path'
import {
  readContent,
  projectPath,
  pkgConfig
} from '../../lib'
import webpackConfigGen from '../config/webpack/webpack.config'
import WebpackDevServer from 'webpack-dev-server'
import Webpack from 'webpack'
import chalk from 'chalk'
import opn from 'opn'
import build from './build'
import commonLibrary from '../config/common/externals'
import fs from 'fs'
import path from 'path'
import config from './config'

export default async function run (moduleName, options) {
  if (pkgConfig[moduleName]) {
    if (options.dependenciesRebuild) {
      await buildDependencies(moduleName)
    }
    if (options.coreRebuild) {
      await build('core')
    }
  } else {
    config('set', moduleName, true)
    await buildDependencies(moduleName)
  }
  const { webpackConfig, devOps } = webpackConfigGen(moduleName)
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devOps)
  const compiler = Webpack(webpackConfig)
  const devServer = new WebpackDevServer(compiler, devOps)
  devServer.listen(8080, '0.0.0.0', () => {
    console.log(chalk`{yellow Starting server on http://localhost:8080}`)
    opn('http://localhost:8080')
  })
}

async function buildDependencies(moduleName) {
  const { constantPath } = getPluginsPath(moduleName)
  console.log(constantPath)
  const { dependencies = [] } = await readContent.fork(constantPath)
  console.log('Building dependencies...\n')
  await dependencies
    .concat('core')
    .filter((lib) => !Object.keys(commonLibrary).includes(lib))
    .reduce(async(res, lib) => await build(lib), 1)
  return console.log('\nBuilding complete!\n')
} 
