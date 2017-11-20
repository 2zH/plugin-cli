import {
  pkgConfig
} from '../../lib'
import {
  inputOptions,
  outputOptions
} from '../config/rollup/rollup.config'
import path from 'path'
import rollup from 'rollup'
import chalk from 'chalk'
import Ora from 'ora'
import sass from 'node-sass'
import fs from 'fs'
import {
  getCachePath,
  getPluginsPath
} from '../config/path'
import resolveModules from '../config/common/resolveModules'
import childProcess from 'child_process'

const rootPath = pkgConfig.root
export default async function build(moduleName, options = {}) {
  const {
    jsPath,
    scssPath,
    coreCssPath,
    moduleDistPath
  } = getPluginsPath(moduleName)
  const {
    jsCachePath,
    cssCachePath
  } = getCachePath(moduleName)

  const jsSpinner = new Ora({
    text: chalk`{yellow Bundling scripts...}`
  })
  try {
    jsSpinner.start()
    const { external, ...standaloneInputOption } = inputOptions
    const { globals, ...standaloneOutputOption } = outputOptions
    const inputOps = options.standalone ? standaloneInputOption : inputOptions
    const outputOps = options.standalone ? standaloneOutputOption : outputOptions
    const format = options.es ? 'es' : 'umd'
    const name = `@plugin/${moduleName}`
    const ext = options.standalone ? '.standalone.js' : '.js'
    const ruBundle = await rollup.rollup({ input: jsPath, ...inputOps })
    const { code: jsBundle } = await ruBundle.generate({ name, format, ...outputOps })
    fs.writeFileSync(`${jsCachePath}/${moduleName}${ext}`, jsBundle)
    fs.writeFileSync(`${moduleDistPath}/${moduleName}${ext}`, jsBundle)
    jsSpinner.succeed(chalk`{blue.bold ${moduleName}${ext} has bundling complate by rollup!}`)
  } catch(err) {
    console.log(chalk`{bold \n${err}}`)
    return jsSpinner.fail(chalk`{red.bold We got a error}`)
  }

  if (!fs.existsSync(scssPath)) {
    return;
  }

  childProcess.execSync(`mkdir -p ${cssCachePath}`)
  const cssSpinner = new Ora({
    text: chalk`{yellow Bundling scss...}`
  })
  try {
    const { css: cssBundle } = sass.renderSync({
      file: scssPath,
      outputStyle: 'nested',
      includePaths: resolveModules.concat(coreCssPath)
    })
    fs.writeFileSync(`${cssCachePath}/${moduleName}.css`, cssBundle)
    fs.writeFileSync(`${moduleDistPath}/${moduleName}.css`, cssBundle)
    cssSpinner.succeed(chalk`{blue.bold ${moduleName}.scss has bundling complate by node-sass!}`)
  } catch(err) {
    console.log(chalk`{bold ${err}}`)
    return cssSpinner.fail(chalk`{red.bold We got a error}`)
  }

  return 1
}
