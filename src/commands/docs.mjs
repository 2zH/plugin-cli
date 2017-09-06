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

  const Namespace = namespace
    .split('')
    .map((v, k) => k === 0 ? v.toUpperCase() : v)
    .join('')

  console.log('\n🚚 Please tell me about options'.gray)
  const options = await optionsMakePromptThenOpenQuestions(api.defaults)

  console.log('\n🚚 Please tell me about events'.yellow)
  const events = await makePromptThenOpenQuestions(api.events)

  console.log('\n🚀 Please tell me about methods'.blue)
  const methods = await makePromptThenOpenQuestions(api.methods)

  if (api.classes) {
    console.log('\n💡 Please tell me about classes'.green)
  } else {
    console.log('\n☠ Classes is not exists'.red)
  }
  const classes = await makePromptThenOpenQuestions(api.classes)

  const result = {
    namespace, Namespace, options, events, methods, classes, version
  }
  compilerThenWrite(result);
}
