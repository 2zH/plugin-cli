import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import rules from '../config/webpack/webpack.rules'
import externals from '../config/common/externals'
import fs from 'fs'
import opn from 'opn'

import chalk from 'chalk'
import path from 'path'
import meta from '../../package.json'
import { projectDir } from '../../lib'

const rootDir = meta['plugin-cli'].root

export default function watch (name) {
  const pluginDir = path.join(rootDir, `plugins/${name}`)

  const jsPath = path.join(pluginDir, './main.js')
  const hbsPath = path.join(pluginDir, `./html/${name}.hbs`)
  const cssPath = path.join(pluginDir, `./css/${name}.scss`)
  const cssIsExists = fs.existsSync(cssPath)

  const entry = cssIsExists ? [jsPath, cssPath, hbsPath] : [jsPath, hbsPath]
  const output = {
    filename: `plugins/${name}/${name}.js`,
    path: path.join(projectDir, './build'),
    publicPath: '/',
    library: name,
    libraryTarget: 'umd'
  }
  const cssRule = {
    test: /\.scss$/,
    use:  ['css-hot-loader'].concat(
      ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, { 
          loader: 'sass-loader',
          options: {
            outputStyle: 'nested',
            includePaths: ['./plugins/core/css', 'node_modules']
              .map((addr) => path.join(rootDir, addr))
          }
        }]
      })
    )
  }
  const htmlRule = {
    test: /\.hbs$/,
    use: [
      {
        loader: 'html-loader',
      },
      {
        loader: 'assemble-loader',
        options: {
          partials: path.join(rootDir, 'src/html/partials/*.hbs'),
          layouts: path.join(rootDir, 'src/html/layouts/*.hbs'),
          data: path.join(rootDir, 'src/html/data/*.{json,yml}'),
          helpers: path.join(rootDir, 'src/html/helpers/*.js'),
          pages: path.join(rootDir, 'src/html/pages/*.hbs')
        }
      }
    ]
  }
  const module = { 
    rules: rules.concat([
      cssRule,
      htmlRule
    ])
  }
  const plugins = [
    new Webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin(`plugins/${name}/css/${name}.css`),
    new HtmlWebpackPlugin({
      template: hbsPath,
      inject: false
    })
  ]
  const webpackConfig = {
    entry,
    output,
    externals,
    module,
    resolve: {
      modules: ['node_modules']
    },
    resolveLoader: {
      modules: ['node_modules', 'packages']
    },
    plugins
  }

  const devOps = {
    contentBase: path.join(projectDir, './build'),
    hot: true,
    publicPath: '/',
    port: 8080,
    host: 'localhost',
    stats: {
      colors: true
    },
    watchOptions: {
      poll: true
    }
  }
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devOps)
  const compiler = Webpack(webpackConfig)
  const devServer = new WebpackDevServer(compiler, devOps)
  devServer.listen(8080, '127.0.0.1', () => {
    console.log(chalk`{yellow Starting server on http://localhost:8080}`)
    opn('http://localhost:8080')
  })
}