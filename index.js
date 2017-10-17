#!/usr/bin/env node
const program = require('commander')
const esLoader = require('@std/esm')(module)
const docs = esLoader('./src/commands/docs').default
const config = esLoader('./src/commands/config').default
const run = esLoader('./src/commands/run').default
const build = esLoader('./src/commands/build').default
const watch = esLoader('./src/commands/watch').default
const dependencies = esLoader('./src/commands/dependencies').default
const lint = esLoader('./src/commands/lint').default

program
  .version('0.0.1')
  .usage('<command> [options]')

program
  .command('docs [name]')
  .description('build api document')
  .option('-r, --root [path]', 'Add plugins path')
  .action((name, options) => docs(name, options))

program
  .command('config <command> [key] [value]')
  .description('config something')
  .action((command, key, value) => config(command, key, value))

program
  .command('run [name]')
  .description('run plugin')
  .action((name) => run(name))

program
  .command('build [name]')
  .description('build plugin')
  .action(build)

program
  .command('watch [name]')
  .description('watch plugin')
  .action(watch)

program
  .command('dependencies')
  .description('make dependencies')
  .action(dependencies)

program
  .command('lint [name]')
  .description('make lint')
  .action(lint)

program.parse(process.argv)