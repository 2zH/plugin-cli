import {
  pkgConfig,
  projectPath
} from '../../lib'
import path from 'path'
import globby from 'globby'
import fs from 'fs'
import stripJsonComments from 'strip-json-comments'
import prettierEslint from 'prettier-eslint'
import prettierStylelint from 'prettier-stylelint'
import {
  getPluginsPath
} from '../config/path'
import commitAnalysis from './commit-analysis'
import shelljs from 'shelljs'

const rootPath = pkgConfig.root
export default async function lint(moduleName, options) {
  if (!moduleName) {
    if (!options.beforeCommit) {
      return console.log('Cant find Module')
    }
    const changedList = commitAnalysis()
    const result = await Promise.all(changedList.map((changed) => lint(changed)))
    if (result.filter(Boolean).length) {
      // git hook: which will make the commit fail as it returns the error code 1
      console.log('exit 1')
      shelljs.exit(1)
    }
    console.log('exit 0')
    shelljs.exit(0)
  }
  const {
    jsFormattedPath,
    scssFormattedPath
  } = getPluginsPath(moduleName)
  const isDistDir = (filePath) => !(/dist/g.test(filePath))
  const scssPathList = globby.sync(Array.of(scssFormattedPath)).filter(isDistDir)
  const jsPathList = globby.sync(Array.of(jsFormattedPath)).filter(isDistDir)
  const jsLintSatusCode = jsLint(jsPathList)
  const cssLintResult = await Promise.all(cssLint(scssPathList))
  const cssLintStatusCode = cssLintResult.filter(Boolean).length
  if (jsLintSatusCode) {
    console.log(`${moduleName} js part is checked failed`)
    return 1
  } else if (cssLintStatusCode) {
    console.log(`${moduleName} css part is checked failed`)
    return 1
  }
  console.log(`${moduleName} checked!`)
  return 0
}

function cssLint(cssPath) {
  const configFile = path.join(rootPath, '.stylelintrc.json')
  const stylelintConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'))
  const options = {
    stylelintConfig,
    logLevel: 'info',
    configBasedir: projectPath
  }
  return cssPath.map(
    (filePath) => prettierStylelint
      .format({ filePath, ...options })
      .then((formatted) => {
        fs.writeFileSync(filePath, formatted)
        return false
      })
      .catch((err) => {
        console.log(`\nFilePath: ${filePath}`)
        console.log(`${err}\n`)
        return filePath
      })
    )
}

function jsLint(jsPath) {
  const configFile = path.join(rootPath, '.eslintrc.json')
  const eslintConfig = JSON.parse(stripJsonComments(fs.readFileSync(configFile, 'utf8')))
  const options = {
    eslintConfig,
    logLevel: 'info',
    configBasedir: projectPath
  }
  const result = jsPath.map((filePath) => {
    try {
      const formatted = prettierEslint({ filePath, ...options })
      fs.writeFileSync(filePath, formatted)
      return false
    } catch(err) {
      console.log(`\nFilePath: ${filePath}`)
      console.log(`${err}\n`)
      return filePath
    }
  }).filter(Boolean)

  if (result.length) {
    return 1
  }
  return 0
}
