#!/usr/bin/env node
const program = require('commander')
const esLoader = require('@std/esm')(module)
const docs = esLoader('./src/commands/docs').default

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
  .action((command, key, value) => console.log(command, key, value))

program.parse(process.argv)