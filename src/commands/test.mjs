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

const rootPath = pkgConfig.root

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
    reporters: ['mocha']
  }
  process.env.CHROME_BIN = puppeteer.executablePath()
  const KarmaServer = new karma.Server(options)
  KarmaServer.start()
}