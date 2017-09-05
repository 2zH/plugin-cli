# {{namespace}}

## Introduction
- Development: {{namespace}}.js
- Production: {{namespace}}.min.js

---
## Installation

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
<link rel="stylesheet" href="../plugins/{{namespace}}/css/{{namespace}}.css">
<scripts src="../plugins/{{namespace}}.min.js"></scripts>
```
---
## Usage

```javascript
$element.as{{namespace}}();
```

### [Demo：]()

## api

### Events:
Name | Desc
-----|-----
{{#each events}}
{{#with this}}
{{name}} | {{desc}}
{{/with}}
{{/each}}

### Methods:
Name | Desc
-----|-----
{{#each methods}}
{{#with this}}
{{name}} | {{desc}}
{{/with}}
{{/each}}

{{#if classes}}
### Classes:
Name | Desc
-----|-----
{{#each classes}}
{{#with this}}
{{name}} | {{desc}}
{{/with}}
{{/each}}

{{/if}}

## version
Version: {{version}}

## Copyright and license
Copyright (C) 2017 amazingSurge.

Licensed under [the LGPL license](LICENSE).