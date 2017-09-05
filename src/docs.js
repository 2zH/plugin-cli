import {
  fetchConstantFromAnswers,
  compilerThenWrite,
  makePrompt,
  transpiler
} from './helper'
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
    defaults,
    events,
    methods,
    classes
  }, info } = constant

  console.log('🚚 Please tell me about options'.gray)
  const optionsAnswers = await inquirer.prompt(makePrompt(Object.keys(defaults)))

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

  

  const result = {
    namespace,
    Namespace: namespace.split('').map((v, k) => {
      if (k === 0) {
        return v.toUpperCase()
      }
      return v
    }).join(','),
    defaults: transpiler(optionsAnswers)
      .map((option) => ({
          ...options,
          defaultValue: defaults[option.name]
        })),
    events: transpiler(eventsAnswers),
    methods: transpiler(methodsAnswers),
    classes: classes && transpiler(classesAnswers),
    version: info.version
  }
  compilerThenWrite(result);
}
