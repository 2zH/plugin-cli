import shelljs from 'shelljs'
import {
  pkgConfig
} from '../../lib'

const rootPath = pkgConfig.root
export default function commitAnalysis() {
  const log = shelljs.exec('git status | grep packages', {
    cwd: rootPath,
    silent: true
  }).stdout
  const formatted = log.split('\n')
    .map((filePath) => filePath.split('/')[1])
  const changed = Array.from(new Set(formatted)).filter(Boolean)
  if (changed.length) {
    console.log('\nThere is the changed List:')
    console.log(`\n${changed.join('\n')}\n`)
  }
  return changed
}