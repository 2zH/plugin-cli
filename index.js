#!/usr/bin/env node
const program = require('commander')
const esLoader = require('@std/esm')(module)
const docs = esLoader('./src/commands/docs').default
const config = esLoader('./src/commands/config').default
const build  = esLoader('./src/commands/build').default

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
  .command('build [plugin]')
  .description('build something')
  .action((plugin) => build(plugin))

program.parse(process.argv)