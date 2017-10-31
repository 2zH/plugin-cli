import config from '../config/webpack/webpack.config'
import WebpackDevServer from 'webpack-dev-server'
import Webpack from 'webpack'
import chalk from 'chalk'
import opn from 'opn'
import build from './build'
import {
  getPluginsPath
} from '../config/path'
import {
  readContent
} from '../../lib'
import commonLibrary from '../config/common/externals'

export default async function watch (moduleName, options) {
  if (options.dependenciesRebuild) {
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
