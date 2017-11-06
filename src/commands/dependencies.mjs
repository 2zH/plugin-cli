import AssetsManager from 'assets-manager'
import path from 'path'
import {
  projectPath,
  pkgConfig,
  fixDir
} from '../../lib'
import sass from 'node-sass'
import shelljs from 'shelljs'
import fs from 'fs'
import {
  getPluginsPath
} from '../config/path'
import icon from '../dependencies/icons'

const rootPath = pkgConfig.root

export default async function makeDependencies() {
  makeScripts()
  makeScss()
  makeAssets()
  icon()
}

function makeAssets() {
  const manifest = path.join(projectPath, 'src/config/assets-manager.json')
  console.log(manifest)
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
  manager.copyPackages().then(() => {
    console.log('Process successed!');
  });
}

function makeScripts() {
  const input = path.join(rootPath, 'src/js/scripts.js')
  const outPut = path.join(projectPath, 'build/js/scripts.js')
  fixDir(outPut)
  shelljs.cp(input, outPut)
}

function makeScss() {
  const { css: cssBundle } = sass.renderSync({
    file: path.join(rootPath, 'src/scss/styles.scss'),
    outputStyle: 'nested',
    includePaths: [
      `${rootPath}/node_modules`,
      `${projectPath}/node_modules`
      // coreCssPath
    ]
  })
  const outPut = path.join(projectPath, 'build/css/styles.css')
  fixDir(outPut)
  fs.writeFileSync(outPut, cssBundle)
}
