import meta from '../../package.json'
import path from 'path'
import childProcess from 'child_process'
import chalk from 'chalk'

export default function run(name) {
  const projectRoot = meta['plugin-cli'].root;
  if (!projectRoot) {
    console.log(chalk`
      {bold Please set your project path.}

      {green Try to execute command:}
        {gray plugin config set root <project path>}
      `)
  }

  const gulp = path.join(projectRoot, './node_modules/.bin/gulp')
  const gulpfile = path.join(projectRoot, './gulpfile.babel.js')
  const gulpRun = childProcess.exec(`node ${gulp} --gulpfile ${gulpfile} plugin --plugin=${name}`)
  console.log(chalk`{green.bold Loading ${name} module...}`)
  gulpRun.stderr.on('data', (data) => console.log(data))
}