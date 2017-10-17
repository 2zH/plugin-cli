import config from '../config/webpack/webpack.config'
import WebpackDevServer from 'webpack-dev-server'
import Webpack from 'webpack'
import chalk from 'chalk'
import opn from 'opn'

export default function watch (name) {
  const { webpackConfig, devOps } = config(name)
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devOps)
  const compiler = Webpack(webpackConfig)
  const devServer = new WebpackDevServer(compiler, devOps)
  devServer.listen(8080, '127.0.0.1', () => {
    console.log(chalk`{yellow Starting server on http://localhost:8080}`)
    opn('http://localhost:8080')
  })
}
