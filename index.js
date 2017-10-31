#!/usr/bin/env node
const program = require('commander')
const require_esm = require('@std/esm')(module)
const {
  docs,
  config,
  build,
  watch,
  dependencies,
  lint,
  test,
  commitAnalysis
} = require_esm('./src/commands')

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
  .option('-cr, --core-rebuild', 'rebuild @plugin/core part')
  .option('-dr, --dependencies-rebuild', 'rebuild dependices')
  .action(build)

program
  .command('watch [name]')
  .description('watch plugin')
  .option('-cr, --core-rebuild', 'rebuild @plugin/core part')
  .option('-dr, --dependencies-rebuild', 'rebuild dependices')
  .action(watch)

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