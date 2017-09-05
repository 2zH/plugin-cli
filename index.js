#!/usr/bin/env node
const program = require('commander')
const esLoader = require('@std/esm')(module, {
  esm: "all"
})
const docs = esLoader('./docs').default

program
  .version('0.0.1')
  .usage('<command> [options]')

program
  .command('docs [name]')
  .description('build api document')
  .action((name, options) => docs(name))

program.parse(process.argv)