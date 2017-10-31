import path from 'path'
import _ from 'lodash/fp'
import Handlebars from 'handlebars'
import fs from 'fs'
import cjs from './cjs'
import Maybe from './maybe'
import Task from './task'
import inquirer from 'inquirer'
import meta from '../package.json'
import cli from 'shelljs'

const { __dirname, require, module } = cjs
const { readFileSync, writeFileSync, existsSync } = fs
const { compile } = Handlebars
const { resolve } = path
const { curry, compose } = _

const sucessMsg = '\n🎉 Build success!\n'
const failedMsg = '\n😞 Build failed!\n'

const map = curry((f, m) => m.map(f))
const join = (m) => m.join()
const fork = (m) => m.fork.bind(m)
const chain = (f) => compose(join, map(f))
const props = curry((methods, target) => target[methods])
const safeify = (...funcs) => compose(join, (m) => {
  if (funcs.length > 1) {
    return funcs.reduceRight((result, f) => (result ? result.map(f) : m.map(f)), false)
  }
  return m.map(funcs[0])
}, Maybe.of)

const dyimport = (path) => require('@std/esm')(module, { esm: 'all' })(path)
const projectPath = path.join(__dirname, '../')
const openQuestions = Task.of(inquirer.prompt)
const readContent = Task.of(resolve).map(dyimport)
const upperFirstWord = (words) => words
  .split('')
  .map((v, k) => k === 0 ? v.toUpperCase() : v)
  .join('')

const writer = curry((path, str) => writeFileSync(path, str))
const checkFileExists = curry((path, msg) => existsSync(path)
  ? console.log(sucessMsg)
  : console.log(failedMsg))
const log = (v) => {
  console.log(v)
  return v
}
const compilerThenWrite = (entry, output) => compose(
  checkFileExists(output),
  writer(output),
  compile(readFileSync(entry, 'utf8'))
)
const pkgConfig = meta['plugin-cli']
const fixDir = (filePath) => {
  // console.log(filePath)
  const fileDir = filePath.split('/')
    .filter((str, index, list) => !Boolean(index === (list.length - 1) || /\*/.test(str)))
    .join('/')
  if (fs.existsSync(fileDir)) {
    return true
  }
  console.log(`${fileDir} is not exists, try to create it...`)
  cli.mkdir('-p', fileDir)
  console.log('Create successed!')
  return true
}

export {
  require,
  openQuestions,
  compilerThenWrite,
  readContent,
  safeify,
  map,
  chain,
  join,
  fork,
  curry,
  compose,
  props,
  upperFirstWord,
  projectPath,
  pkgConfig,
  fixDir
}
