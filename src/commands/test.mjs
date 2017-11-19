import {
  getPluginsPath
} from '../config/path'
import {
  pkgConfig,
  projectPath,
  readContent,
  upperFirstWord,
  compilerThenWrite,
  fixDir
} from '../../lib'
import karma from 'karma';
import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import webpackRule from '../config/webpack/webpack.rules'
import resolveModules from '../config/common/resolveModules'

export default async function test(name, options) {
  if (options.buildTest) {
    await buildTest(name)
  }
  const { testPath } = getPluginsPath(name)
  const karmaOptions = {
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
        modules: resolveModules
      },
      resolveLoader: {
        modules: resolveModules
      }
    }
  }
  process.env.CHROME_BIN = puppeteer.executablePath()
  const KarmaServer = new karma.Server(karmaOptions)
  KarmaServer.start()
}

async function buildTest(name) {
  const { constantPath, modulePath } = getPluginsPath(name)
  const { methods, classes, events } = await readContent.fork(constantPath)
  const compileOptions = {
    namespace: name,
    Namespace: upperFirstWord(name),
    methods: Boolean(methods),
    classes: Boolean(classes),
    events: Boolean(events),
  }
  const input = path.join(projectPath, 'src/templates/test/plugin.spec.js')
  const outPut = path.join(modulePath, `test/unit/${name}.spec.js`)
  if (fs.existsSync(outPut)) {
    fs.copyFileSync(outPut, fixDir(path.join(modulePath, `.plugin-cache/${name}.spec.bak.js`)))
  }
  const compiler = compilerThenWrite(input, outPut)
  return compiler(compileOptions)
}