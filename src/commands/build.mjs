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

const rootPath = pkgConfig.root

export default async function build(moduleName, options = {}) {
  const {
    jsPath,
    scssPath,
    coreCssPath,
    jsDistPath,
    cssDistPath
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
    const { external, ...inputOptionsStandlone } = inputOptions
    const ruBundle = await rollup.rollup({
      input: jsPath, 
      ...(options.standlone ? inputOptionsStandlone : inputOptions)
    })
    const { globals, ...outputOptionsStandlone } = outputOptions
    const { code: jsBundle } = await ruBundle.generate({
      name: `@plugin/${moduleName}`,
      format: options.es ? 'es' : 'umd',
      ...(options.standlone ? outputOptionsStandlone : outputOptions)
    })
    fs.writeFileSync(jsCachePath, jsBundle)
    fs.writeFileSync(jsDistPath, jsBundle)
    jsSpinner.succeed(chalk`{blue.bold ${moduleName}.js has bundling complate by rollup!}`)
  } catch(err) {
    console.log(chalk`{bold \n${err}}`)
    return jsSpinner.fail(chalk`{red.bold We got a error}`)
  }

  if (!fs.existsSync(scssPath)) {
    return;
  }

  const cssSpinner = new Ora({
    text: chalk`{yellow Bundling scss...}`
  })
  try {
    const { css: cssBundle } = sass.renderSync({
      file: scssPath,
      outputStyle: 'nested',
      includePaths: [coreCssPath, `${rootPath}/node_modules`]
    })
    fs.writeFileSync(cssCachePath, cssBundle)
    fs.writeFileSync(cssDistPath, cssBundle)
    cssSpinner.succeed(chalk`{blue.bold ${moduleName}.scss has bundling complate by node-sass!}`)
  } catch(err) {
    console.log(chalk`{bold ${err}}`)
    return cssSpinner.fail(chalk`{red.bold We got a error}`)
  }

  return 1
}
