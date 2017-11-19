import {
  projectPath,
  pkgConfig
} from '../../../lib'

const rootPath = pkgConfig.root
const rootNodeModulesPath = path.resolve(rootPath, 'node_modules')
const projectNodeModulesPath = path.resolve(projectPath, 'node_modules')
const isYarn = !Boolean(fs.readdirSync(projectNodeModulesPath).length)
export const resolveModules = [
  rootNodeModulesPath,
  isYarn
    ? path.resolve(projectNodeModulesPath, '../')
    : projectNodeModulesPath
]