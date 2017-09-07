# {{Namespace}}

## Introduction
> Just a plugin named parallax base on jQuery

- Development: {{namespace}}.js
- Production: {{namespace}}.min.js

---
## Installation

### Dependencies
- jQuery
- @plugins/core

### **NPM**

Install the module:

```javascript
npm i @plugins/{{namespace}}
```

ES2015+

```javascript
import "{{namespace}}"
```

CommonJS

```javascript
require("{{namespace}}")
```

### **HTML import**

```html
<link rel="stylesheet" href="/path/to/{{namespace}}.css">
<script src="/path/to/jquery.js"></script>
<script src="/path/to/{{namespace}}.js"></script>
```
---
## Usage

```javascript
$('.element').as{{Namespace}}();
```

### [Demo：]()

## API

### Options:
Options are called on {{namespace}} instances through the {{namespace}} options itself.
You can also save the instances to variable for further use.

**Example**
```javascript
$('.element').as{{Namespace}}({
  option: value
})
```
or use dataset
```html
<div class="element" data-options="value"></div>
<script>
  $('.element').as{{Namespace}}()
</script>
```

Name | DefaultValue | Desc
-----|--------------|-----
{{#each options}}
{{#with this}}
`"{{name}}"` | {{defaultValue}} | {{desc}}
{{/with}}
{{/each}}

### Events:
Events are called on {{namespace}} instances through the {{namespace}} events itself.
You can also save the instances to variable for further use.

Name | Desc
-----|-----
{{#each events}}
{{#with this}}
`"{{name}}"` | {{desc}}
{{/with}}
{{/each}}

### Methods:
Methods are called on {{namespace}} instances through the {{namespace}} method itself.
You can also save the instances to variable for further use.

Name | Desc
-----|-----
{{#each methods}}
{{#with this}}
`"{{name}}"` | {{desc}}
{{/with}}
{{/each}}

{{#if classes}}
### Classes:
Name | Desc
-----|-----
{{#each classes}}
{{#with this}}
`"{{name}}"` | {{desc}}
{{/with}}
{{/each}}

{{/if}}

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `@plugins/{{namespace}}` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/plugins/releases).

## version
Version: {{version}}

## Copyright and license
Copyright (C) 2017 amazingSurge.

Licensed under [the LGPL license](LICENSE).