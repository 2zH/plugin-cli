import {
  openQuestions,
  projectPath,
  readContent,
  compilerThenWrite,
  safeify,
  compose,
  curry,
  map,
  join,
  fork,
  props,
  upperFirstWord,
  pkgConfig,
  fixDir
} from '../../lib'
import {
  defaultEvents,
  defaultMethods,
  defaultOptions,
  defaultClasses
} from '../config/doc/meta.base'
import {
  getPluginsPath,
  getCachePath
} from '../config/path'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import stripJsonComments from 'strip-json-comments'
import prettierEslint from 'prettier-eslint'

const entry = path.join(projectPath, 'src/templates/document/template.md')
const log = (v) => {
  console.log(v)
  return v
}
const transpiler = (answers) => Object.entries(answers)
  .map(([k, v]) => (
    { name: k, desc: v }
  ))
const openQuestionsThenTranspiler = openQuestions.map(transpiler)
const makePrompt = (items) => items.map(
  item => ({
    type: 'input',
    name: item,
    message: `What is "${item}"`
  })
)
const addDefaultValue = curry((type, inquirerList) => {
  const getDefaultValue = (defaultValueCollect) => {
    return inquirerList.map((inquirerObj) => {
      if (!defaultValueCollect[inquirerObj.name]) {
        return inquirerObj
      }
      return {
        default: defaultValueCollect[inquirerObj.name],
        ...inquirerObj
      }
    })
  }
  switch (type) {
    case 'events': {
      return getDefaultValue(defaultEvents)
    }
    case 'methods': {
      return getDefaultValue(defaultMethods)
    }
    case 'options': {
      return getDefaultValue(defaultOptions)
    }
    case 'classes': {
      return getDefaultValue(defaultClasses)
    }
    default: {
      return inquirerObject
    }
  }
})
const makePromptThenOpenQuestions = compose(
  fork(openQuestionsThenTranspiler),
  safeify(makePrompt)
)
const optionsMakePromptThenOpenQuestions = compose(
  fork(openQuestionsThenTranspiler),
  safeify(makePrompt, Object.keys)
)
const merge2Parents = curry(({parents, key}, values) => parents.map(
  (parent, index) => ({
    ...parent,
    [key]: values[index]
  })
))
const emptyFilter = (arr) => arr.map((v) => (!v && v !== 0) ? 'null' : v)
const onlyString = (arr) => arr.filter((v) => typeof v === 'string')
const convert2Str = (arr) => arr.map((v) => {
  if (v !== null && typeof v === 'object') {
    return JSON.stringify(v)
  }

  if (typeof v === 'function') {
    return 'function() {...}'
  }

  return String(v)
})
const isExists = async(data, left, right) => {
  if (data) {
    return left ? left() : data
  }
  return right ? right() : null
}

export default async function docs(moduleName, { update }) {
  const projectRoot = pkgConfig.root
  if (!projectRoot) {
    console.log('Plugins root path is undefined, please set it!')
    console.log('plugin-cli config set root <plugin-root-path>')
    return console.log('\n')
  }
  moduleName = moduleName || await openQuestions
    .map(props('constant'))
    .fork([{
      type: 'input',
      name: 'constant',
      message: '🔧 Please type where is constant ?'
    }])
  const { docPath, constantPath, modulePath } = getPluginsPath(moduleName)
  const docJsCachePath = fixDir(`${modulePath}/.plugin-cache/docs/${moduleName}.js`)
  console.log(docJsCachePath)
  const documentBuild = compilerThenWrite(entry, docPath)

  if (update) {
    const docCache = await readContent.fork(docJsCachePath)
    return documentBuild(docCache.default)
  }

  const constant = await readContent.fork(constantPath)
  const { namespace, info: { version }, ...api } = constant

  const Namespace = upperFirstWord(namespace)

  console.log(chalk.gray(`\n🚚 Please tell me about options`))
  const optionsPrompt = safeify(
    addDefaultValue('options'),
    makePrompt,
    Object.keys
  )
  const optionsAnswer = await openQuestionsThenTranspiler.fork(optionsPrompt(api.defaults))
  const merge2Options = safeify(
    merge2Parents({parents: optionsAnswer, key: 'defaultValue'}),
    convert2Str,
    Object.values
  )
  const options = merge2Options(api.defaults)
  const option = options[0].name

  console.log(chalk.yellow('\n🚚 Please tell me about events'))
  const eventsPrompt = safeify(
    addDefaultValue('events'),
    makePrompt,
    Object.values
  )
  const events = await openQuestionsThenTranspiler.fork(eventsPrompt(api.events))
  const event = events[0].name
  const Event = upperFirstWord(event)

  console.log(chalk.blue('\n🚀 Please tell me about methods'))
  const methods = await openQuestionsThenTranspiler.fork(
    addDefaultValue('methods', makePrompt(api.methods))
  )
  const method = methods && methods[0].name

  const classes = await isExists(
    api.classes,
    async() => {
      console.log(chalk.green('\n💡 Please tell me about classes'))
      const classPrompt = safeify(
        addDefaultValue('classes'),
        makePrompt,
        Object.keys
      )
      const classesAnwser = await openQuestionsThenTranspiler.fork(classPrompt(api.classes))
      const merge2Classes = safeify(
        merge2Parents({ parents: classesAnwser, key: 'value' }),
        Object.values
      )
      return merge2Classes(api.classes)
    },
    () => {
      console.log(chalk.red('\n☠ Classes is not exists'))
    }
  )
  const translations = await isExists(
    api.translations,
    () => Object.keys(api.translations.en)
      .map((name) => {
        const translation = Object.keys(api.translations)
          .reduce((result, key) => {
            return {
              ...result,
              [key]: api.translations[key][name]
            }
          }, {})
        return {
          name,
          ...translation
        }
      }),
    () => console.log(chalk.red('\n☠ Translations is not exists'))
  )
  const dependencies = await isExists(
    api.dependencies,
    false,
    () => (console.log(chalk.red('\n☠ Dependencies is not exists')))
  )
  const cacheData = {
    namespace,
    Namespace,
    options,
    option,
    events,
    event,
    Event,
    methods,
    method,
    classes,
    translations,
    dependencies,
    version
  }
  const eslintConfig = JSON.parse(
    stripJsonComments(
      fs.readFileSync(path.join(projectRoot, '.eslintrc.json'), 'utf8')
    )
  )
  const eslintOptions = {
    text: `const meta = ${JSON.stringify(cacheData)};export default meta`,
    eslintConfig
  }
  const formatted = prettierEslint(eslintOptions)
  fs.writeFileSync(docJsCachePath, formatted)
  documentBuild(cacheData);
}
