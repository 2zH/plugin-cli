import {
  pkgConfig,
  projectPath
} from '../../lib'
import path from 'path'
import flatGlob from 'glob-flat'
import fs from 'fs'
import stripJsonComments from 'strip-json-comments'
import prettierEslint from 'prettier-eslint'
import prettierStylelint from 'prettier-stylelint'
import {
  getPluginsPath
} from '../config/path'
import commitAnalysis from './commit-analysis'
import shelljs from 'shelljs'

const root = pkgConfig.root
export default async function lint(moduleName, options) {
  if (!moduleName) {
    if (!options.beforeCommit) {
      return console.log('Cant find module name')
    }
    const changedList = commitAnalysis()
    const result = await changedList.reduce(async (result, changed) => {
      const resultSync = await result
      const changedSync = await lint(changed)
      return resultSync.concat(changedSync)
    }, [])
    if (result.filter(Boolean).length) {
      // pre-commit: which will make the commit fail as it returns the error code 1
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
  const scssPathList = flatGlob.sync(Array.of(scssFormattedPath)).filter((filePath) => !/dist/g.test(filePath))
  const jsPathList = flatGlob.sync(Array.of(jsFormattedPath)).filter((filePath) => !/dist/g.test(filePath))

  const jsLintSatusCode = jsLint(jsPathList)
  const cssLintResult = await cssLint(scssPathList).reduce(async(result, status) => {
    const statusSync = await status
    const resultSync = await result
    return resultSync.concat(statusSync)
  }, [])
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
  const stylelintConfig = JSON.parse(
    fs.readFileSync(path.join(root, '.stylelintrc'))
  )
  const result = cssPath.map((filePath) => {
    const options = {
      filePath,
      stylelintConfig: { configBasedir: projectPath, ...stylelintConfig },
      configBasedir: projectPath,
      prettierOptions: {
        // hack prettier-stylelint warn: Warning: `parser` with value "postcss" is deprecated. Use "css", "less" or "scss" instead.
        get parser() {
          return 'scss'
        },
        set parser(v) {}
      },
      logLevel: 'info'
    }
    return prettierStylelint.format(options)
      .then((formatted) => fs.writeFileSync(filePath, formatted))
      .catch((err) => {
        console.log(`\nFilePath: ${filePath}`)
        console.log(`${err}\n`)
        return filePath
      })
    })
  return result
}

function jsLint(jsPath) {
  const eslintConfig = JSON.parse(
    stripJsonComments(
      fs.readFileSync(path.join(root, '.eslintrc.json'), 'utf8')
    )
  )

  const result = jsPath.map((filePath) => {
    const options = {
      filePath,
      eslintConfig,
      logLevel: 'info',
      configBasedir: projectPath
    }
    try {
      const formatted = prettierEslint(options)
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
