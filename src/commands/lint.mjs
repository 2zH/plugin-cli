import {
  pkgConfig,
  projectDir
} from '../../lib'
import path from 'path'
import flatGlob from 'glob-flat'
import fs from 'fs'
import stripJsonComments from 'strip-json-comments'
import prettierEslint from 'prettier-eslint'
import prettierStylelint from 'prettier-stylelint'

const root = pkgConfig.root

export default async function lint(name) {
  const pluginPath = path.join(root, `/plugins/${name}`)
  const cssPath = flatGlob.sync(Array.of(path.join(pluginPath, `./**/*.scss`)))
  const jsPath = flatGlob.sync(Array.of(path.join(pluginPath, `./**/*.js`)))
  
  jsLint(jsPath)
  cssLint(cssPath)
}

function cssLint(cssPath) {
  const stylelintConfig = JSON.parse(
    fs.readFileSync(path.join(root, '.stylelintrc'))
  )
  cssPath.forEach((filePath) => {
    const options = {
      filePath,
      stylelintConfig
    }
    prettierStylelint.format(options)
      .then((formatted) => fs.writeFileSync(filePath, formatted))
  })
}

function jsLint(jsPath) {
  const eslintConfig = JSON.parse(
    stripJsonComments(
      fs.readFileSync(path.join(root, '.eslintrc.json'), 'utf8')
    )
  )

  jsPath.forEach((filePath) => {
    const options = {
      filePath,
      eslintConfig
    }
    const formatted = prettierEslint(options)
    fs.writeFileSync(filePath, formatted)
  })
}