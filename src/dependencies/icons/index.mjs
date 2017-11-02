import {
  pkgConfig,
  projectPath
} from '../../../lib'
import webfontsGenerator from 'webfonts-generator'
import globby from 'globby'
import path from 'path'

export default async function icons() {
  const rootPath = pkgConfig.root
  const src = path.join(rootPath, 'src/icons/svg/*.svg')
  const destPath = path.join(projectPath, './build/icons')
  
  webfontsGenerator({
    fontName: 'icons',
    files: globby.sync([src]),
    dest: path.join(projectPath, './build/icons')
  })
}