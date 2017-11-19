import {
  projectPath,
  pkgConfig,
  fixDir
} from '../../lib'
import {
  getPluginsPath
} from '../config/path'
import AssetsManager from 'assets-manager'
import path from 'path'
import sass from 'node-sass'
import shelljs from 'shelljs'
import fs from 'fs'
import webfontsGenerator from 'webfonts-generator'
import globby from 'globby'
import resolveModules from '../commands/resolveModules'

const rootPath = pkgConfig.root
export default function buildDependencies() {
  return buildIcons()
    .then(() => Promise.all([buildScripts(), buildScss(), buildAssets()]))
}

function buildAssets() {
  const manifest = path.join(projectPath, 'src/config/assets-manager.json')
  const manager = new AssetsManager(manifest, {
    cwd: rootPath,
    registries: {
      libs: 'src'
    },
    dest: path.join(projectPath, 'build'),
    flattenPackages: true,
    paths: {
      css: '${dest}/css/${file}',
      js: '${dest}/vendor/${file}'
    }
  })
  return manager.copyPackages().then(() => console.log('Assets building success.'));
}

function buildScripts() {
  const input = path.join(rootPath, 'src/js/scripts.js')
  const outPut = path.join(projectPath, 'build/js/scripts.js')
  fixDir(outPut)
  return shelljs.cp(input, outPut)
}

function buildScss() {
  const cssBundle = sass.renderSync({
    file: path.join(rootPath, 'src/scss/styles.scss'),
    outputStyle: 'nested',
    includePaths: resolveModules
  })
  .css
  .toString()
  .replace(
    /content: *"."/g,
    (input) => "content: \"\\" + input.codePointAt(input.length-2).toString(16) + "\"" 
  )
  const outPut = path.join(projectPath, 'build/css/styles.css')
  fixDir(outPut)
  return fs.writeFileSync(outPut, cssBundle)
}

function buildIcons() {
  const rootPath = pkgConfig.root
  const src = path.join(rootPath, 'src/icons/svg/*.svg')
  const destPath = path.join(projectPath, './build/icons')
  
  return new Promise(resolve => webfontsGenerator({
    fontName: 'icons',
    files: globby.sync([src]),
    cssTemplate: path.join(rootPath, 'src/icons/templates/_icons.hbs.scss'),
    templateOptions: {
      cssClass: 'icon',
      fontPath: '../icons/'
    },
    cssDest: path.join(rootPath, 'src/scss/_icons.scss'),
    dest: path.join(projectPath, './build/icons')
  }, () => {
    resolve()
  }))
}
