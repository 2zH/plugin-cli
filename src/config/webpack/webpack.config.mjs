import {
  projectPath,
  pkgConfig
} from '../../../lib'
import {
  getPluginsPath
} from '../path'
import fs from 'fs'
import path from 'path'
import Webpack from 'webpack'
import rules from './webpack.rules'
import externals from '../common/externals'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import resolveModules from '../common/resolveModules'

const rootPath = pkgConfig.root
export default function config(name) {
  const { 
    jsPath,
    scssPath,
    hbsPath,
    coreCssPath,
    modulePath
  } = getPluginsPath(name)
  const cssIsExists = fs.existsSync(scssPath)
  const entry = cssIsExists ? [jsPath, scssPath, hbsPath] : [jsPath, hbsPath]
  const output = {
    filename: `plugins/${name}/${name}.js`,
    path: path.join(projectPath, './build'),
    publicPath: '/',
    library: `@plugin/${name}`,
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
            includePaths: resolveModules.concat(coreCssPath)
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
          partials: path.join(rootPath, 'src/html/partials/*.hbs'),
          layouts: path.join(rootPath, 'src/html/layouts/*.hbs'),
          data: path.join(rootPath, 'src/html/data/*.{json,yml}'),
          helpers: path.join(rootPath, 'src/html/helpers/*.js'),
          pages: path.join(rootPath, 'src/html/pages/*.hbs')
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
    context: projectPath,
    resolve: {
      modules: resolveModules
    },
    resolveLoader: {
      modules: resolveModules.concat('packages'),
      alias: {
        'assemble-loader': path.join(projectPath, 'packages/assemble-loader')
      }
    },
    plugins: fs.existsSync(path.join(modulePath, 'src/assets'))
      ? plugins.concat(
        new CopyWebpackPlugin([{
          from: path.join(modulePath, 'src/assets'),
          to: `plugins/${name}/assets`
        }])
      )
      : plugins
  }

  const devOps = {
    contentBase: path.join(projectPath, './build'),
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

  return { webpackConfig, devOps }
}