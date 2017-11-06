#!/usr/bin/env node
const program = require('commander')
const require_esm = require('@std/esm')(module)
const {
  docs,
  config,
  build,
  run,
  dependencies,
  lint,
  test,
  commitAnalysis
} = require_esm('./src/commands')
const fs = require('fs')
const path = require('path')

const dependenDir = path.join(__dirname, 'build/vendor')
const hasDependencies = () => {
  if (fs.existsSync(dependenDir)
    && Boolean(fs.readdirSync(dependenDir).length)
  ) {
    return;
  }
  return dependencies()
}

program
  .version('0.0.1')
  .usage('<command> [options]')

program
  .command('docs [name]')
  .description('build api document')
  .option('-r, --root [path]', 'Add plugins path')
  .option('-u, --update', 'Update template')
  .action(docs)

program
  .command('config <command> [key] [value]')
  .description('config something')
  .action(config)

program
  .command('build [name]')
  .description('build plugin')
  .option('-c, --core-rebuild', 'rebuild @plugin/core part')
  .option('-d, --dependencies-rebuild', 'rebuild dependices')
  .action(async(name, options) => {
    await hasDependencies()
    build(name, options)
  })

program
  .command('run [name]')
  .description('run plugin')
  .option('-c, --core-rebuild', 'rebuild @plugin/core part')
  .option('-d, --dependencies-rebuild', 'rebuild dependices')
  .action(async(name, options) => {
    await hasDependencies()
    run(name, options)
  })

program
  .command('dependencies')
  .description('make dependencies')
  .action(dependencies)

program
  .command('lint [name]')
  .description('make lint')
  .option('--before-commit', 'checke code before commit')
  .action(lint)

program
  .command('test [name]')
  .description('run unit test')
  .action(test)

program
  .command('commit analysis')
  .description('analysis git status log')
  .action(commitAnalysis)

program.parse(process.argv)