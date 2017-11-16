import {
  projectPath
} from '../../lib'
import meta from '../../package.json'
import fs from 'fs'
import path from 'path'
import dependencies from './dependencies'
import sh from 'shelljs'

const writer = (commandLineMeta) => {
  return fs.writeFileSync(
    path.join(projectPath, 'package.json'),
    JSON.stringify({
      ...meta,
      'plugin-cli': commandLineMeta
    }, null, '\t')
  )
}

const commandLineMeta = meta['plugin-cli']

export default function config(command, key, value) {
  if (command === 'get') {
    if (!key) {
      return console.log('[key] is not empty')
    }

    return console.log(commandLineMeta[key])
  }

  if (command === 'set') {
    if (!key) {
      return console.log('[key] is not empty')
    }

    if (key === 'root') {
      value = value && path.resolve(value)
      sh.exec(`npm config set pluginjs_root ${value}`, { silent: true })
    }

    return writer({
      ...commandLineMeta,
      [key]: value || ''
    })
  }

  return console.log('command is invalid')
}
