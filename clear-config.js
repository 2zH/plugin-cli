const require_esm = require('@std/esm')(module)
const meta = require('./package.json')
const fs = require('fs')
const path = require('path')
const { projectPath } = require_esm('./lib')

const { ['plugin-cli']: cliOptions, ...purePkg } = meta

fs.writeFileSync(
  path.join(projectPath, 'package.json'),
  JSON.stringify({
    ...purePkg,
    ['plugin-cli']: {}
  }, null, '\t')
)