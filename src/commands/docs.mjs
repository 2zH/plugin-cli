import {
  openQuestions,
  templatesDir,
  readContent,
  compilerThenWrite,
  safeify,
  compose,
  map,
  join,
  fork,
  props,
  upperFirstWord
} from '../lib'
import 'colors'

const output = './README.md'
const entry = templatesDir('document/template.md')

const log = (v) => {
  console.log(v)
  return v
}
const transpiler = (answers) => Object.entries(answers)
  .map(([k, v]) => (
    { name: k, desc: v }
  ))
const openQuestionsThenTranspiler = openQuestions.map(transpiler)

const makePrompt = (items) => Object.values(items).map(
  item => ({ type: 'input', name: item, message: `What is "${item}"`})
)
const makePromptThenOpenQuestions = compose(fork(openQuestionsThenTranspiler), safeify(makePrompt))
const optionsMakePromptThenOpenQuestions = compose(fork(openQuestionsThenTranspiler), safeify(makePrompt, Object.keys))

const addProps = (options, defaultValues) => options.map((option, index) => (
  { ...option, defaultValue: defaultValues[index]}
))
const valuesCheck = (arr) => arr.map((v) => (!v && v !== 0) ? 'null' : v)
const valuesThenCheck = compose(valuesCheck, Object.values)

const documentBuild = compilerThenWrite(entry, output)

export default async function docs(path, { root }) {
  const constantPath = path || await openQuestions
    .map(props('constant'))
    .fork(
      [{ type: 'input', name: 'constant', message: '🔧 Please type where is constant ?' }]
    )
  const constant = await readContent.fork(
    root ? `${root}/plugins/${constantPath}/js/constant.js` : constantPath
  )
  const { namespace, api, info: { version } } = constant

  const Namespace = upperFirstWord(namespace)

  console.log('\n🚚 Please tell me about options'.gray)
  const optionsAnswer = await optionsMakePromptThenOpenQuestions(api.defaults)
  const options = addProps(optionsAnswer, valuesThenCheck(api.defaults))
  const option = options[0].name

  console.log('\n🚚 Please tell me about events'.yellow)
  const events = await makePromptThenOpenQuestions(api.events)
  const event = events[0].name
  const Event = upperFirstWord(event)

  console.log('\n🚀 Please tell me about methods'.blue)
  const methods = await makePromptThenOpenQuestions(api.methods)
  const method = methods[0].name

  if (api.classes) {
    console.log('\n💡 Please tell me about classes'.green)
  } else {
    console.log('\n☠ Classes is not exists'.red)
  }
  const classes = await makePromptThenOpenQuestions(api.classes)

  const result = {
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
    version
  }
  documentBuild(result);
}
