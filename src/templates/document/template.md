# {{Namespace}}
> A flexible modern {{namespace}} js plugin.
## Introduction

#### [Demo]()
---
### Installation

#### NPM
```javascript
npm i @plugin/{{namespace}}
```
#### Yarn
```javascript
yarn add @plugin/{{namespace}}
```

### Dependencies
- jQuery
- @plugin/core

---

## Getting Started
### Include
**Webpack && Rollup:**

ES2015+
```javascript
import {{namespace}} from "@plugin/{{namespace}}"
```

CommonJS
```javascript
require("@plugin/{{namespace}}")
```

**CDN:**
Development:
```html
<script src="/path/to/{{namespace}}.js"></script>
<link rel="stylesheet" href="/path/to/{{namespace}}.css">
```
Production:
```html
<script src="/path/to/{{namespace}}.min.js"></script>
<link rel="stylesheet" href="/path/to/{{namespace}}.min.css">
```

### Initialize
HTML:
```html
<body>
  <div class="element"></div>
</body>
```
JS:
```javascript
Pj.{{Namespace}}('.element', options);
// or jquery way
$('.element').plugin('{{Namespace}}', options;
```
---
## API

{{#if options}}
### Options:
Options are called on {{namespace}} instances through the {{namespace}} options itself.
You can also save the instances to variable for further use.

**Example**
```javascript
$('.element').plugin('{{Namespace}}', {
  {{option}}: "foo"
})
```
or use dataset
```html
<div class="element" data-{{option}}="foo"></div>
<script>
  $('.element').plugin('{{Namespace}}')
</script>
```

Name | Description | Default
-----|--------------|-----
{{#each options}}
{{#with this}}
`"{{name}}"` | {{desc}} | `{{defaultValue}}`
{{/with}}
{{/each}}
{{/if}}

{{#if events}}
### Events:
Events are called on {{namespace}} instances through the {{namespace}} events itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
{{#each events}}
{{#with this}}
`"{{name}}"` | {{desc}}
{{/with}}
{{/each}}

**example:**
```javascript
${{namespace}}.plugin('{{Namespace}}', {
  on{{Event}}: function() {
    // code...
  }
})

${{namespace}}.on(
  '{{namespace}}:{{event}}',
  function(){
  // code...
  }
)
```
{{/if}}
{{#if methods}}
### Methods:
Methods are called on {{namespace}} instances through the {{namespace}} method itself.
You can also save the instances to variable for further use.

Name | Description
-----|-----
{{#each methods}}
{{#with this}}
`"{{name}}"` | {{desc}}
{{/with}}
{{/each}}

**example:**
```javascript
${{namespace}}.plugin('{{Namespace}}', {{method}})
${{namespace}}.plugin('{{Namespace}}', {{method}}, "foo")
${{namespace}}.plugin('{{Namespace}}', {{method}}, "foo", "bar")
```
{{/if}}

{{#if classes}}
### Classes:
Name | Description | Default
-----|------|------
{{#each classes}}
{{#with this}}
`"{{name}}"` | {{desc}} | `{{value}}`
{{/with}}
{{/each}}

{{/if}}

{{#if translations}}
### Translations:
Name | EN | ZH
-----|------|-------
{{#each translations}}
{{#with this}}
`"{{name}}"` | {{en}} | {{zh}}
{{/with}}
{{/each}}

{{/if}}

{{#if dependencies}}
### Dependencies:
{{#each dependencies}}
- `{{this}}`
{{/each}}

{{/if}}
---

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
See [Contribution.md](Contribution.md).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/plugins/releases).

## Version
Version: {{version}}

## Copyright and license
Copyright (C) 2017 amazingSurge.

Licensed under [the LGPL license](LICENSE).