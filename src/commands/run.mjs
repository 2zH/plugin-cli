import meta from '../../package.json'
import path from 'path'
import { exec } from 'child_process'

export default function run(name) {
  const projectRoot = meta['plugin-cli'].root;
  if (!projectRoot) {
    console.log(
      `Please set your project path.

       Try to execute command:
         plugin config set root <project path>
      `)
  }

  const gulp = path.join(projectRoot, './node_modules/.bin/gulp')
  const gulpfile = path.join(projectRoot, './gulpfile.babel.js')
  exec(`node ${gulp} --gulpfile ${gulpfile} plugin --plugin=${name}`)
}