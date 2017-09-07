import {
  openQuestionsAboutConstantPath,
  fetchConstantFromAnswers,
  optionsMakePromptThenOpenQuestions,
  makePromptThenOpenQuestions,
  compilerThenWrite
} from '../helper'
import 'colors'

export default async function docs(path) {
  const answers = path ? { constant: path } : await openQuestionsAboutConstantPath()
  const constant = await fetchConstantFromAnswers(answers)
  const { namespace, api, info: { version } } = constant

  const upperFirstWord = (words) => words
    .split('')
    .map((v, k) => k === 0 ? v.toUpperCase() : v)
    .join('')
  const Namespace = upperFirstWord(namespace)

  console.log('\n🚚 Please tell me about options'.gray)
  const options = await optionsMakePromptThenOpenQuestions(api.defaults)
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
  compilerThenWrite(result);
}
