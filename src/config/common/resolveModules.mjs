import {
  projectPath,
  pkgConfig
} from '../../../lib'
import path from 'path'
import fs from 'fs'
import childProcess from 'child_process'

const rootPath = pkgConfig.root
const yarnNodeModulesPath = childProcess.execSync('yarn global dir')
  .toString()
  .replace(/\n/g, '')
const isYarn = /yarn/g.test(projectPath)
const resolveModules = [
  rootPath,
  isYarn ? yarnNodeModulesPath : projectPath
].map(p => path.resolve(p, 'node_modules'))

export default resolveModules