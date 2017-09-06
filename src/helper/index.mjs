import path from 'path'
import _ from 'lodash/fp'
import Maybe from './maybe'
import Handlebars from 'handlebars'
import fs from 'fs'
import { __dirname } from 'cjs'

const output = './README.md'
const entry = path.join(__dirname, '../template.md')
const sucessMsg = 'Build success!'
const failedMsg = 'Build failed!'

const { readFileSync, writeFileSync, existsSync } = fs
const { compile } = Handlebars
const { resolve } = path
const { curry, compose } = _
const writer = curry((path, str) => writeFileSync(path, str))

const map = curry((f, m) => m.map(f))
const join = (m) => m.join()
const chain = (f) => compose(join, map(f))
const props = curry((methods, target) => target[methods])
const dyimport = (path) => import(path).then(props('default'))

const checkFileExists = curry((path, msg) => existsSync(path)
  ? console.log(sucessMsg)
  : console.log(failedMsg))

export const makePrompt = (items) => 
  Object.values(items)
    .map(item => ({
        type: 'input',
        name: item,
        message: `What is "${item}"`
      }))
export const transpiler = (answers) => 
  Object.entries(answers)
    .map(
      ([k, v]) => ({
        name: k,
        desc: v
      })
    )

export const fetchConstantFromAnswers = compose(dyimport, resolve, props('constant'))
export const compilerThenWrite = compose(
  checkFileExists(output),
  writer(output),
  compile(readFileSync(entry, 'utf8'))
)