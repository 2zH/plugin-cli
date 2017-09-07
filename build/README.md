# Parallax

## Introduction
> Just a plugin named parallax base on jQuery

- Development: [parallax.js]()
- Production: [parallax.min.js]()

### [Demo]()
---
## Installation

### Dependencies
- jQuery
- @plugins/core

### NPM

Install the module:

```javascript
npm i @plugins/parallax
```

ES2015+

```javascript
import "parallax"
```

CommonJS

```javascript
require("parallax")
```

### HTML import:

```html
<link rel="stylesheet" href="/path/to/parallax.css">
<script src="/path/to/jquery.js"></script>
<script src="/path/to/parallax.js"></script>
```
---
## Usage

```javascript
$('.element').asParallax();
```
---
## API

### Options:
Options are called on parallax instances through the parallax options itself.
You can also save the instances to variable for further use.

**Example**
```javascript
$('.element').asParallax({
  theme: "foo"
})
```
or use dataset
```html
<div class="element" data-theme="foo"></div>
<script>
  $('.element').asParallax()
</script>
```

Name | DefaultValue | Desc
-----|--------------|-----
`"theme"` | null | 1
`"speed"` | 1000 | 1
`"delayType"` | throttle | 1
`"delay"` | 100 | 1

### Events:
Events are called on parallax instances through the parallax events itself.
You can also save the instances to variable for further use.

Name | Desc
-----|-----
`"ready"` | 1
`"enable"` | 1
`"disable"` | 1
`"destroy"` | 1
`"enter"` | 1

**example:**
```javascript
$parallax.asParallax({
  onReady: function() {
    // code...
  }
})

$parallax.on(
  'parallax:ready',
  function(){
  // code...
  }
)
```

### Methods:
Methods are called on parallax instances through the parallax method itself.
You can also save the instances to variable for further use.

Name | Desc
-----|-----
`"value"` | 1
`"enable"` | 1
`"disable"` | 1
`"destroy"` | 1
`"setAnimation"` | 1
`"setAnimationDelay"` | 1
`"beforeLoad"` | 1
`"afterLoad"` | 1
`"load"` | 1
`"isLoad"` | 1
`"setDelay"` | 1

**example:**
```javascript
$parallax.asParallax(value)
$parallax.asParallax(value, "foo")
$parallax.asParallax(value, "foo", "bar")
```

---
## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | >=10 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `@plugins/parallax` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/plugins/releases).

## Version
Version: 0.0.1

## Copyright and license
Copyright (C) 2017 amazingSurge.

Licensed under [the LGPL license](LICENSE).