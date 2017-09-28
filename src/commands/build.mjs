import meta from '../../package.json'
import { projectDir } from '../../lib'
import path from 'path'
import rollup from 'rollup'
import chalk from 'chalk'
import { inputOptions, outputOptions } from '../config/rollup.config'
import ora from 'ora'

const rootDir = meta['plugin-cli'].root

export default async function build (name) {
  const input = path.join(rootDir, `plugins/${name}/main.js`)
  const file = name === 'core'
    ? path.join(projectDir, `build/vendor/${name}.bundle.js`)
    : path.join(projectDir, `build/${name}.bundle.js`)


  const spinner = ora(chalk`{yellow Bundling...}`).start()

  const bundle = await rollup.rollup({ input, ...inputOptions })
    .then(async(bundle) => {
      await bundle.write({
        file,
        name: name === 'core' ? 'As' : name,
        ...outputOptions
      })
      spinner.succeed(chalk`{blue.bold Bundle complate!}`)
    })
    .catch(err => {
      spinner.fail(chalk`{red.bold We got a error}`)
      console.log(chalk`{bold ${err}}`)
    })
}