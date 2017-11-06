import {
  getPluginsPath
} from '../config/path'
import {
  readContent,
  projectPath
} from '../../lib'
import config from '../config/webpack/webpack.config'
import WebpackDevServer from 'webpack-dev-server'
import Webpack from 'webpack'
import chalk from 'chalk'
import opn from 'opn'
import build from './build'
import commonLibrary from '../config/common/externals'
import fs from 'fs'
import path from 'path'

export default async function run (moduleName, options) {
  if (options.dependenciesRebuild || !fs.existsSync(path.join(projectPath, 'build/plugins'))) {
    const { constantPath } = getPluginsPath(moduleName)
    const { dependencies = [] } = await readContent.fork(constantPath)
    console.log('Building dependencies...\n')
    await dependencies
      .concat('core')
      .filter((lib) => !Object.keys(commonLibrary).includes(lib))
      .reduce(async(res, lib) => await build(lib), 1)
    console.log('\nBuilding complete!\n')
  }
  if (options.coreRebuild) {
    await build('core')
  }

  const { webpackConfig, devOps } = config(moduleName)
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devOps)
  const compiler = Webpack(webpackConfig)
  const devServer = new WebpackDevServer(compiler, devOps)
  devServer.listen(8080, '127.0.0.1', () => {
    console.log(chalk`{yellow Starting server on http://localhost:8080}`)
    opn('http://localhost:8080')
  })
}
