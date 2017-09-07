import path from 'path'
import _ from 'lodash/fp'
import Handlebars from 'handlebars'
import fs from 'fs'
import cjs from './cjs'
import Maybe from './maybe'
import Task from './task'
import inquirer from 'inquirer'

const { __dirname, require, module } = cjs
const { readFileSync, writeFileSync, existsSync } = fs
const { compile } = Handlebars
const { resolve } = path
const { curry, compose } = _

const output = './README.md'
const entry = path.join(__dirname, '../templates/document/template.md')
const sucessMsg = '\n🎉 Build success!\n'
const failedMsg = '\n😞 Build failed!\n'

const map = curry((f, m) => m.map(f))
const join = (m) => m.join()
const chain = (f) => compose(join, map(f))
const props = curry((methods, target) => target[methods])
const fork = curry((m, v) => m.fork(v))

const dyimport = (path) => require('@std/esm')(module, { esm: 'all' })(path).default
const writer = curry((path, str) => writeFileSync(path, str))
const keys = compose(chain(Object.keys), Maybe.of)
const checkFileExists = curry((path, msg) => existsSync(path)
  ? console.log(sucessMsg)
  : console.log(failedMsg))
const makePrompt = (items) => Object
  .values(items)
  .map(
    item => ({ type: 'input', name: item, message: `What is "${item}"`})
  )
const transpiler = (answers) => Object
  .entries(answers)
  .map(([k, v]) => ({ name: k, desc: v }))
const openQuestions = inquirer.prompt
const openQuestionsThenTranspiler = compose(map(transpiler), map(inquirer.prompt), Task.of)
const addValue = curry((optionsDefaultValue, answers) => answers.map(
  (option, i) => ({ ...option, defaultValue: optionsDefaultValue[i]})
))

export const openQuestionsAboutConstantPath = () => openQuestions(
  [{ type: 'input',
    name: 'constant',
    message: '🔧 Please type where is constant ?' }]
)
export const optionsMakePromptThenOpenQuestions = (v) => {
  const optionsDefaultValue = Object.values(v).map((v) => v || 'null')
  return openQuestionsThenTranspiler(compose(chain(makePrompt), map(keys), Maybe.of))
    .map(addValue(optionsDefaultValue))
    .fork(v)
}
export const makePromptThenOpenQuestions = (v) => 
  openQuestionsThenTranspiler(compose(chain(makePrompt), Maybe.of))
    .fork(v)
export const fetchConstantFromAnswers = compose(dyimport, resolve, props('constant'))
export const compilerThenWrite = compose(
  checkFileExists(output),
  writer(output),
  compile(readFileSync(entry, 'utf8'))
)