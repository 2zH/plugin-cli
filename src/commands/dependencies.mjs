import icons from '../dependencies/icons'
import AssetsManager from 'assets-manager'
import path from 'path'
import {
  projectPath,
  pkgConfig,
  fixDir
} from '../../lib'
import favicons from 'favicons'
import sass from 'node-sass'
import flatGlob from 'glob-flat'
import shelljs from 'shelljs'
import fs from 'fs'
import {
  getPluginsPath
} from '../config/path'

const rootPath = pkgConfig.root

export default async function makeDependencies() {
  makeScripts()
  makeScss()
  makeAssets()
  icons()
}

function makeAssets() {
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

function makeFavicons() {
  const source = `${rootPath}/src/favicons/favicon.png`
  const configuration = {
    appName: 'pluginjs',
    appDescription: 'a web component library',
    developerName: null,
    developerURL: null,
    background: 'transparent',
    path: '{{rootPath}}favicons/',
    display: 'standalone',
    orientation: 'portrait',
    version: '1.0.0',
    logging: false,
    online: false,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: true,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: false,
      windows: true,
      yandex: false
    },
    html: `${rootPath}/src/html/partials/favicons.hbs`,
    replace: true
  }
  return favicons(source, configuration, (err, res) => {
    if (err) {
      console.log(err.status)
      console.log(err.name)
      console.log(err.message)
    }
    console.log(res)
  })
}