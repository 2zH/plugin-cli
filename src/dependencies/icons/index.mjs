import {
  pkgConfig,
  projectDir,
  ifNotExistsThenCreate
} from '../../../lib'
import webfontsGenerator from 'webfonts-generator'
import flatGold from 'glob-flat'
import path from 'path'

export default async function icons() {
  const rootDir = pkgConfig.root
  const src = path.join(rootDir, 'src/icons/svg/*.svg')
  const destPath = path.join(projectDir, './build/icons')
  
  ifNotExistsThenCreate(destPath)
  
  webfontsGenerator({
    fontName: 'icons',
    files: flatGold.sync([src]),
    dest: path.join(projectDir, './build/icons')
  })
}