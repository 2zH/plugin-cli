import {
  getPluginsPath
} from '../config/path'
import {
  pkgConfig,
  projectPath
} from '../../lib'
import karma from 'karma';
import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import webpackRule from '../config/webpack/webpack.rules'

const rootPath = pkgConfig.root
const nodePath = path.join(projectPath, 'node_modules')
export default function test(name) {
  const { testPath } = getPluginsPath(name)
  const options = {
    configFile: path.join(projectPath, `src/config/karma/karma.config.js`),
    files: [
      testPath,
      'node_modules/jquery/dist/jquery.js'
    ],
    basePath: rootPath,
    singleRun: true,
    reporters: ['mocha'],
    webpack: {
      module: {
        rules: webpackRule
      },
      resolve: {
        modules: [nodePath, 'node_modules']
      },
      resolveLoader: {
        modules: [nodePath, 'node_modules']
      }
    }
  }
  process.env.CHROME_BIN = puppeteer.executablePath()
  const KarmaServer = new karma.Server(options)
  KarmaServer.start()
}