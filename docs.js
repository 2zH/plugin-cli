import { fetchConstantFromAnswers, compilerThenWrite, makePrompt } from './helper'
import inquirer from 'inquirer'
import 'colors'

function getFilePath() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'constant',
      message: '🔧 Please type where is constant ?'
    }
  ])
}

export default async function docs(path) {
  const answers = path ? { constant: path } : await getFilePath()
  const constant = await fetchConstantFromAnswers(answers)
  const { namespace, api: {
    events,
    methods,
    classes
  }, info } = constant

  console.log('🚚 Please tell me about events'.yellow)
  const eventsAnswers = await inquirer.prompt(makePrompt(events))
  
  console.log('🚀 Please tell me about methods'.blue)
  const methodsAnswers = await inquirer.prompt(makePrompt(methods))

  if (classes) {
    console.log('💡 Please tell me about classes'.green)
  } else {
    console.log('☠ Classes is not exists'.red)
  }

  const classesAnswers = classes && await inquirer.prompt(makePrompt(classes))

  const transpiler = (answers) => 
    Object.entries(answers)
      .map(
        ([k, v]) => ({
          name: k,
          desc: v
        })
      )

  const result = {
    namespace,
    events: transpiler(eventsAnswers),
    methods: transpiler(methodsAnswers),
    classes: classes && transpiler(classesAnswers),
    version: info.version
  }
  compilerThenWrite(result);
}
