import meta from '../../package.json'
import { projectDir } from '../../lib'
import path from 'path'
import rollup from 'rollup'
import chalk from 'chalk'
import { inputOptions, outputOptions } from '../config/rollup/rollup.config'
import ora from 'ora'
import sass from 'node-sass'
import fs from 'fs'

const rootDir = meta['plugin-cli'].root

export default async function build (name) {
  const input = path.join(rootDir, `plugins/${name}/main.js`)
  const file = path.join(projectDir, `build/plugins/${name}/${name}.js`)


  const spinner = ora(chalk`{yellow Bundling...}`).start()

  const jsBundle = await rollup.rollup({ input, ...inputOptions })
    .then(
      bundle => bundle.write({
        file,
        name: name === 'core' ? 'As' : name,
        ...outputOptions
      })
    )
    .then(res => spinner.succeed(chalk`{blue.bold Bundle complate!}`))
    .catch(err => {
      spinner.fail(chalk`{red.bold We got a error}`)
      console.log(chalk`{bold ${err}}`)
    })


  const cssPath = path.join(rootDir, `plugins/${name}/css/${name}.scss`)

  if (!fs.existsSync(cssPath)) {
    return
  }
  const cssBundle = sass.renderSync({
    file: cssPath,
    outputStyle: 'nested',
    includePaths: ['./plugins/core/css', 'node_modules']
      .map((addr) => path.join(rootDir, addr))
  })
  const cssDir = path.join(projectDir, `build/plugins/${name}/css`)
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir)
  }
  fs.writeFileSync(path.join(projectDir, `build/plugins/${name}/css/${name}.css`), cssBundle.css)
}