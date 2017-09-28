import meta from '../../package.json'
import {
  projectDir
} from '../../lib'
import fs from 'fs'
import path from 'path'

const writer = (cliMeta) => {
  return fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify({
      ...meta,
      'plugin-cli': cliMeta
    }, null, '\t')
  )
}

const cliMeta = meta['plugin-cli']

export default function config(command, key, value) {
  
  if (command === 'get') {
    if (!key) {
      return console.log('[key] is not empty')
    }

    return console.log(cliMeta[key])
  }

  if (command === 'set') {
    if (!key) {
      return console.log('[key] is not empty')
    }

    if (key === 'root') {
      value = value && path.resolve(value)
    }

    return writer({
      ...cliMeta,
      [key]: value || ''
    })
  }

  return console.log('command is invalid')
}
