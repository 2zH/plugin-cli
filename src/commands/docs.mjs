import {
  openQuestions,
  projectDir,
  readContent,
  compilerThenWrite,
  safeify,
  compose,
  curry,
  map,
  join,
  fork,
  props,
  upperFirstWord
} from '../../lib'
import 'colors'
import meta from '../../package.json'

const output = './README.md'
const entry = projectDir('src/templates/document/template.md')

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
  item => ({ type: 'input', name: item, message: `What is "${item}"`})
)
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

export default async function docs(path, { root }) {
  const projectRoot = root || meta['plugin-cli'].root
  const documentBuild = compilerThenWrite(entry, 
    projectRoot ? `${projectRoot}/plugins/${constantPath}/README.md` : output
  )
  const constantPath = path || await openQuestions
    .map(props('constant'))
    .fork([{
      type: 'input',
      name: 'constant',
      message: '🔧 Please type where is constant ?'
    }])
  const constant = await readContent.fork(
    projectRoot ? `${projectRoot}/plugins/${constantPath}/js/constant.js` : constantPath
  )
  const { namespace, info: { version }, ...api } = constant

  const Namespace = upperFirstWord(namespace)

  console.log('\n🚚 Please tell me about options'.gray)
  const optionsPrompt = safeify(
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

  console.log('\n🚚 Please tell me about events'.yellow)
  const eventsPrompt = safeify(
    makePrompt,
    Object.values
  )
  const events = await openQuestionsThenTranspiler.fork(eventsPrompt(api.events))
  const event = events[0].name
  const Event = upperFirstWord(event)

  console.log('\n🚀 Please tell me about methods'.blue)
  const methods = await openQuestionsThenTranspiler.fork(makePrompt(api.methods))
  const method = methods && methods[0].name

  const classes = await isExists(
    api.classes,
    async() => {
      console.log('\n💡 Please tell me about classes'.green)
      const classPrompt = safeify(
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
      console.log('\n☠ Classes is not exists'.red)
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
    () => console.log('\n☠ Translations is not exists'.red)
  )
  const dependencies = await isExists(
    api.dependencies,
    false,
    () => (console.log('\n☠ Dependencies is not exists'.red))
  )

  documentBuild({
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
    version });
}
