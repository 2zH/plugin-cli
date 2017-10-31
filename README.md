# @Plugin/cli

## Installation
```sh
npm i 2zH/plugin-cli -g
```
---
## Command

- plugin watch <module>

- plugin build <module>

- plugin lint <module>

- plugin config <action> <key> <value>

- plugin docs [constant-path] [ -u | --update ] [ -r | --root  <path>]
> Build document from constant

## docs

**example:**
```javascript
plugin docs js/constant
```
or
```javascript
plugin docs
// Please ask me the file path
```

## options: link plugins project dir

### `-r, --root`
```javascript
plugin docs parallax --root ~/WorkSpaces/plugins
```
or
```javascript
plugin docs --root ~/WorkSpaces/plugins
// Please ask me the module name
```

### `-u, --update`
> Update template