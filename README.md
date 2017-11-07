# @Plugin/cli

## Installation
```sh
npm i 2zH/plugin-cli -g
```
---
> Warning: please binding your plugins folder via config command first.
## Usage:
```sh
plugin config set root /home/user/path/plugins

plugin run table-sort

plugin docs table-sort

plugin test table-sort
```

## Command

- `plugin config <action> <key> <value>`
- `plugin docs <module> [ -u | --update ]`
- `plugin test <module>`
- `plugin run <module> [ -d | --dependencies-rebuild ] `
- `plugin build <module>`
- `plugin lint <module> [ -b | --before-commit ]`
- `plugin commit analysis`
- `plugin dependencies`

## Config:
Config your plugins path.

**example:**
```sh
plugin config set root /home/user/path/plugins-lerna

plugin config get root
// /home/user/path/plugins-lerna
```
## Docs:
Building doc.

**example:**
```sh
plugin docs table-sort
```
### `-u, --update`
Update doc by cache and template

**example:**
```sh
plugin docs table-sort --update
```
## Test:
Run Unit-Test.

**example:**
```sh
plugin run utils
```

## Run:
Run plugin.

**example:**
```sh
plugin run table-sort
```
### `-d, --dependencies-rebuild`
**example:**
```sh
plugin run table-sort --dependencies-rebuild
```
### `-c, --core-rebuild`
**example:**
```sh
plugin run table-sort --core-rebuild
```
## Build:
Bundle plugin
**example:**
```sh
plugin build core
```
## Dependencies
Building dependencies.(assets, icon, common css, js)

**example**
```sh
plugin dependencies
```
## Commit analysis
Analysis what plugin will be commit from git.

**example**
```sh
plugin dependencies
```