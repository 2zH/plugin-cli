(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.As = factory(global.jQuery));
}(this, (function ($$1) { 'use strict';

$$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*eslint-disable */
(function () {
	if (!('includes' in Array.prototype)) {
		Array.prototype.includes = function includes(searchElement /*, fromIndex*/) {
			'use strict';

			var O = Object(this);
			var len = parseInt(O.length) || 0;
			if (len === 0) {
				return false;
			}
			var n = parseInt(arguments[1]) || 0;
			var k;
			if (n >= 0) {
				k = n;
			} else {
				k = len + n;
				if (k < 0) {
					k = 0;
				}
			}
			var currentElement;
			while (k < len) {
				currentElement = O[k];
				if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
					return true;
				}
				k++;
			}
			return false;
		};
	}

	if (!('filter' in Array.prototype)) {
		Array.prototype.filter = function filter(callback) {
			if (this === undefined || this === null) {
				throw new TypeError(this + ' is not an object');
			}

			if (typeof callback !== 'function') {
				throw new TypeError(callback + ' is not a function');
			}

			var object = Object(this),
			    scope = arguments[1],
			    arraylike = object instanceof String ? object.split('') : object,
			    length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
			    index = -1,
			    result = [],
			    element;

			while (++index < length) {
				element = arraylike[index];

				if (index in arraylike && callback.call(scope, element, index, object)) {
					result.push(element);
				}
			}

			return result;
		};
	}

	if (!('find' in Array.prototype)) {
		Object.defineProperty(Array.prototype, 'find', {
			configurable: true,
			value: function find(callback) {
				if (this === undefined || this === null) {
					throw new TypeError(this + ' is not an object');
				}

				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function');
				}

				var object = Object(this),
				    scope = arguments[1],
				    arraylike = object instanceof String ? object.split('') : object,
				    length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
				    index = -1,
				    element;

				while (++index < length) {
					if (index in arraylike) {
						element = arraylike[index];

						if (callback.call(scope, element, index, object)) {
							return element;
						}
					}
				}
			},
			writable: true
		});
	}

	if (!('of' in Array)) {
		/*! https://mths.be/array-of v0.1.0 by @mathias */
		(function () {
			'use strict';

			var defineProperty$$1 = function () {
				// IE 8 only supports `Object.defineProperty` on DOM elements
				try {
					var object = {};
					var $defineProperty = Object.defineProperty;
					var result = $defineProperty(object, object, object) && $defineProperty;
				} catch (error) {/**/}
				return result;
			}();
			var isConstructor = function isConstructor(Constructor) {
				try {
					return !!new Constructor();
				} catch (_) {
					return false;
				}
			};
			var of = function of() {
				var items = arguments;
				var length = items.length;
				var Me = this;
				var result = isConstructor(Me) ? new Me(length) : new Array(length);
				var index = 0;
				var value;
				while (index < length) {
					value = items[index];
					if (defineProperty$$1) {
						defineProperty$$1(result, index, {
							'value': value,
							'writable': true,
							'enumerable': true,
							'configurable': true
						});
					} else {
						result[index] = value;
					}
					index += 1;
				}
				result.length = length;
				return result;
			};
			if (defineProperty$$1) {
				defineProperty$$1(Array, 'of', {
					'value': of,
					'configurable': true,
					'writable': true
				});
			} else {
				Array.of = of;
			}
		})();
	}

	if (!('from' in Array && function () {
		try {
			return true;
		} catch (e) {
			return false;
		}
	}())) {
		// Wrapped in IIFE to prevent leaking to global scope.
		(function () {
			//same as instanceOf, but works through iframes
			function appWideInstanceOf(obj, typeName) {
				return Object.prototype.toString.call(obj) === '[object ' + typeName + ']';
			}
			function parseIterable(arraylike) {
				//worth considering the performance bypass in the line below
				//if (appWideInstanceOf(arraylike,'Array')){ return arraylike.slice(); }
				var done = false;
				var iterableResponse;
				var tempArray = [];

				// if the iterable doesn't have next;
				// it is an iterable if 'next' is a function but it has not been defined on
				// the object itself.
				if (typeof arraylike.next === 'function') {
					while (!done) {
						iterableResponse = arraylike.next();
						if (typeof iterableResponse.done === 'boolean') {
							if (iterableResponse.done === true) {
								done = true;
								break;
							}
							//was using hasownProperty but changed as 'value' property might be inherited through prototype chain and could still be a valid iterable response
							if ('value' in iterableResponse) {
								tempArray.push(iterableResponse.value);
							} else {
								break;
							}
						} else {
							// it does not conform to the iterable pattern
							break;
						}
					}
				}

				if (done) {
					return tempArray;
				} else {
					// something went wrong return false;
					return false;
				}
			}

			function iterateForEach(arraylike, asKeyValArrays) {
				if (typeof arraylike.forEach !== 'function') {
					return false;
				}
				var tempArray = [];
				var addEl = asKeyValArrays ? function (val, key) {
					tempArray.push([key, val]);
				} : function (val) {
					tempArray.push(val);
				};
				arraylike.forEach(addEl);
				return tempArray;
			}

			Object.defineProperty(Array, 'from', {
				configurable: true,
				value: function from(source) {
					// handle non-objects
					if (source === undefined || source === null) {
						throw new TypeError(source + ' is not an object');
					}

					// handle maps that are not functions
					if (1 in arguments && typeof arguments[1] !== 'function') {
						throw new TypeError(arguments[1] + ' is not a function');
					}

					var arraylike = typeof source === 'string' ? source.split('') : Object(source);
					var map = arguments[1];
					var scope = arguments[2];
					var array = [];
					var index = -1;
					var length = Math.min(Math.max(Number(arraylike.length) || 0, 0), 9007199254740991);
					var value;
					// variables for rebuilding array from iterator
					var arrayFromIterable = parseIterable(arraylike);

					//if it is a Map or a Set then handle them appropriately
					if (!arrayFromIterable) {
						if (appWideInstanceOf(arraylike, 'Map')) {
							arrayFromIterable = iterateForEach(arraylike, true);
						} else if (appWideInstanceOf(arraylike, 'Set')) {
							arrayFromIterable = iterateForEach(arraylike);
						}
					}

					if (arrayFromIterable) {
						arraylike = arrayFromIterable;
						length = arraylike.length;
					}

					while (++index < length) {
						value = arraylike[index];

						array[index] = map ? map.call(scope, value, index) : value;
					}

					array.length = length;

					return array;
				},
				writable: true
			});
		})();
	}

	if (!('Date' in this && 'now' in this.Date && 'getTime' in this.Date.prototype)) {
		Date.now = function now() {
			return new Date().getTime();
		};
	}

	if (!('includes' in String.prototype)) {
		String.prototype.includes = function (string, index) {
			if ((typeof string === 'undefined' ? 'undefined' : _typeof(string)) === 'object' && string instanceof RegExp) throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
			return this.indexOf(string, index) !== -1;
		};
	}

	if (!('assign' in Object)) {
		Object.assign = function assign(target, source) {
			// eslint-disable-line no-unused-vars
			for (var index = 1, key, src; index < arguments.length; ++index) {
				src = arguments[index];

				for (key in src) {
					if (Object.prototype.hasOwnProperty.call(src, key)) {
						target[key] = src[key];
					}
				}
			}

			return target;
		};
	}

	if (!('keys' in Object && function () {
		// Safari 5.0 bug where Object.keys doesn't work with arguments
		return (Object.keys(arguments) || '').length === 2;
	}(1, 2) && function () {
		try {
			// In ES6 Object.keys works on all object except `null` and `undefined`.
			return true;
		} catch (e) {
			return false;
		}
	}())) {
		Object.keys = function () {
			'use strict';

			// modified from https://github.com/es-shims/object-keys

			var has = Object.prototype.hasOwnProperty;
			var toStr = Object.prototype.toString;
			var isEnumerable = Object.prototype.propertyIsEnumerable;
			var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
			var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
			var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
			var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
				var ctor = o.constructor;
				return ctor && ctor.prototype === o;
			};
			var excludedKeys = {
				$console: true,
				$external: true,
				$frame: true,
				$frameElement: true,
				$frames: true,
				$innerHeight: true,
				$innerWidth: true,
				$outerHeight: true,
				$outerWidth: true,
				$pageXOffset: true,
				$pageYOffset: true,
				$parent: true,
				$scrollLeft: true,
				$scrollTop: true,
				$scrollX: true,
				$scrollY: true,
				$self: true,
				$webkitIndexedDB: true,
				$webkitStorageInfo: true,
				$window: true
			};
			var hasAutomationEqualityBug = function () {
				/* global window */
				if (typeof window === 'undefined') {
					return false;
				}
				for (var k in window) {
					try {
						if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && _typeof(window[k]) === 'object') {
							try {
								equalsConstructorPrototype(window[k]);
							} catch (e) {
								return true;
							}
						}
					} catch (e) {
						return true;
					}
				}
				return false;
			}();
			var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
				/* global window */
				if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
					return equalsConstructorPrototype(o);
				}
				try {
					return equalsConstructorPrototype(o);
				} catch (e) {
					return false;
				}
			};

			function isArgumentsObject(value) {
				var str = toStr.call(value);
				var isArgs = str === '[object Arguments]';
				if (!isArgs) {
					isArgs = str !== '[object Array]' && value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
				}
				return isArgs;
			}

			return function keys(object) {
				var isObject = object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
				var isFunction = toStr.call(object) === '[object Function]';
				var isArguments = isArgumentsObject(object);
				var isString = toStr.call(object) === '[object String]';
				var theKeys = [];

				if (object === undefined || object === null) {
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var skipProto = hasProtoEnumBug && isFunction;
				if (isString && object.length > 0 && !has.call(object, 0)) {
					for (var i = 0; i < object.length; ++i) {
						theKeys.push(String(i));
					}
				}

				if (isArguments && object.length > 0) {
					for (var j = 0; j < object.length; ++j) {
						theKeys.push(String(j));
					}
				} else {
					for (var name in object) {
						if (!(skipProto && name === 'prototype') && has.call(object, name)) {
							theKeys.push(String(name));
						}
					}
				}

				if (hasDontEnumBug) {
					var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

					for (var k = 0; k < dontEnums.length; ++k) {
						if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
							theKeys.push(dontEnums[k]);
						}
					}
				}
				return theKeys;
			};
		}();
	}

	if (!('values' in Object)) {
		(function () {
			Object.defineProperty(Object, 'values', {
				configurable: true,
				enumerable: false,
				value: function value(object) {
					return Object.keys(object).map(function (key) {
						return object[key];
					});
				},
				writable: true
			});
		})();
	}

	if (!('entries' in Object)) {
		Object.entries = function entries(object) {
			var keys = Object.keys(object);

			return keys.reduce(function (entries, key) {
				var entry = typeof key === 'string' && object.propertyIsEnumerable(key) ? [[key, object[key]]] : [];
				return entries.concat(entry);
			}, []);
		};
	}

	if (!('getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function' && function () {
		try {
			var object = {};
			object.test = 0;
			return Object.getOwnPropertyDescriptor(object, "test").value === 0;
		} catch (exception) {
			return false;
		}
	}())) {
		(function () {
			var call = Function.prototype.call;
			var prototypeOfObject = Object.prototype;
			var owns = call.bind(prototypeOfObject.hasOwnProperty);

			var lookupGetter;
			var lookupSetter;
			var supportsAccessors;
			if (supportsAccessors = owns(prototypeOfObject, "__defineGetter__")) {
				lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
				lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
			}
			function doesGetOwnPropertyDescriptorWork(object) {
				try {
					object.sentinel = 0;
					return Object.getOwnPropertyDescriptor(object, "sentinel").value === 0;
				} catch (exception) {
					// returns falsy
				}
			}
			// check whether getOwnPropertyDescriptor works if it's given. Otherwise,
			// shim partially.
			if (Object.defineProperty) {
				var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
				var getOwnPropertyDescriptorWorksOnDom = typeof document == "undefined" || doesGetOwnPropertyDescriptorWork(document.createElement("div"));
				if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
					var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
				}
			}

			if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
				var ERR_NON_OBJECT = "Object.getOwnPropertyDescriptor called on a non-object: ";

				Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
					if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) != "object" && typeof object != "function" || object === null) {
						throw new TypeError(ERR_NON_OBJECT + object);
					}

					// make a valiant attempt to use the real getOwnPropertyDescriptor
					// for I8's DOM elements.
					if (getOwnPropertyDescriptorFallback) {
						try {
							return getOwnPropertyDescriptorFallback.call(Object, object, property);
						} catch (exception) {
							// try the shim if the real one doesn't work
						}
					}

					// If object does not owns property return undefined immediately.
					if (!owns(object, property)) {
						return;
					}

					// If object has a property then it's for sure both `enumerable` and
					// `configurable`.
					var descriptor = { enumerable: true, configurable: true };

					// If JS engine supports accessor properties then property may be a
					// getter or setter.
					if (supportsAccessors) {
						// Unfortunately `__lookupGetter__` will return a getter even
						// if object has own non getter property along with a same named
						// inherited getter. To avoid misbehavior we temporary remove
						// `__proto__` so that `__lookupGetter__` will return getter only
						// if it's owned by an object.
						var prototype = object.__proto__;
						object.__proto__ = prototypeOfObject;

						var getter = lookupGetter(object, property);
						var setter = lookupSetter(object, property);

						// Once we have getter and setter we can put values back.
						object.__proto__ = prototype;

						if (getter || setter) {
							if (getter) {
								descriptor.get = getter;
							}
							if (setter) {
								descriptor.set = setter;
							}
							// If it was accessor property we're done and return here
							// in order to avoid adding `value` to the descriptor.
							return descriptor;
						}
					}

					// If we got this far we know that object has an own property that is
					// not an accessor so we set it as a value and return descriptor.
					descriptor.value = object[property];
					descriptor.writable = true;
					return descriptor;
				};
			}
		})();
	}

	if (!('performance' in this && 'now' in this.performance)) {
		(function (global) {

			var startTime = Date.now();

			if (!global.performance) {
				global.performance = {};
			}

			global.performance.now = function () {
				return Date.now() - startTime;
			};
		})(this);
	}

	if (!('matchMedia' in this)) {
		(function (global) {
			function evalQuery(query) {
				/* jshint evil: true */
				query = (query || 'true').replace(/^only\s+/, '').replace(/(device)-([\w.]+)/g, '$1.$2').replace(/([\w.]+)\s*:/g, 'media.$1 ===').replace(/min-([\w.]+)\s*===/g, '$1 >=').replace(/max-([\w.]+)\s*===/g, '$1 <=').replace(/all|screen/g, '1').replace(/print/g, '0').replace(/,/g, '||').replace(/\band\b/g, '&&').replace(/dpi/g, '').replace(/(\d+)(cm|em|in|dppx|mm|pc|pt|px|rem)/g, function ($0, $1, $2) {
					return $1 * ($2 === 'cm' ? 0.3937 * 96 : $2 === 'em' || $2 === 'rem' ? 16 : $2 === 'in' || $2 === 'dppx' ? 96 : $2 === 'mm' ? 0.3937 * 96 / 10 : $2 === 'pc' ? 12 * 96 / 72 : $2 === 'pt' ? 96 / 72 : 1);
				});
				return new Function('media', 'try{ return !!(%s) }catch(e){ return false }'.replace('%s', query))({
					width: global.innerWidth,
					height: global.innerHeight,
					orientation: global.orientation || 'landscape',
					device: {
						width: global.screen.width,
						height: global.screen.height,
						orientation: global.screen.orientation || global.orientation || 'landscape'
					}
				});
			}

			function MediaQueryList() {
				this.matches = false;
				this.media = 'invalid';
			}

			MediaQueryList.prototype.addListener = function addListener(listener) {
				var listenerIndex = this.addListener.listeners.indexOf(listener);

				if (listenerIndex === -1) {
					this.addListener.listeners.push(listener);
				}
			};

			MediaQueryList.prototype.removeListener = function removeListener(listener) {
				var listenerIndex = this.addListener.listeners.indexOf(listener);

				if (listenerIndex >= 0) {
					this.addListener.listeners.splice(listenerIndex, 1);
				}
			};

			global.MediaQueryList = MediaQueryList;

			// <Global>.matchMedia
			global.matchMedia = function matchMedia(query) {
				var list = new MediaQueryList();

				if (0 === arguments.length) {
					throw new TypeError('Not enough arguments to matchMedia');
				}

				list.media = String(query);
				list.matches = evalQuery(list.media);
				list.addListener.listeners = [];

				global.addEventListener('resize', function () {
					var listeners = [].concat(list.addListener.listeners),
					    matches = evalQuery(list.media);

					if (matches != list.matches) {
						list.matches = matches;
						for (var index = 0, length = listeners.length; index < length; ++index) {
							listeners[index].call(global, list);
						}
					}
				});

				return list;
			};
		})(this);
	}

	if (!('requestAnimationFrame' in this)) {
		(function (global) {
			var rafPrefix;

			if ('mozRequestAnimationFrame' in global) {
				rafPrefix = 'moz';
			} else if ('webkitRequestAnimationFrame' in global) {
				rafPrefix = 'webkit';
			}

			if (rafPrefix) {
				global.requestAnimationFrame = function (callback) {
					return global[rafPrefix + 'RequestAnimationFrame'](function () {
						callback(performance.now());
					});
				};
				global.cancelAnimationFrame = global[rafPrefix + 'CancelAnimationFrame'];
			} else {

				var lastTime = Date.now();

				global.requestAnimationFrame = function (callback) {
					if (typeof callback !== 'function') {
						throw new TypeError(callback + ' is not a function');
					}

					var currentTime = Date.now(),
					    delay = 16 + lastTime - currentTime;

					if (delay < 0) {
						delay = 0;
					}

					lastTime = currentTime;

					return setTimeout(function () {
						lastTime = Date.now();

						callback(performance.now());
					}, delay);
				};

				global.cancelAnimationFrame = function (id) {
					clearTimeout(id);
				};
			}
		})(this);
	}

	if (!('IntersectionObserver' in this && 'IntersectionObserverEntry' in this)) {
		/**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

		(function (window, document) {
			'use strict';

			// Exits early if all IntersectionObserver and IntersectionObserverEntry
			// features are natively supported.

			if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
				return;
			}

			/**
    * An IntersectionObserver registry. This registry exists to hold a strong
    * reference to IntersectionObserver instances currently observering a target
    * element. Without this registry, instances without another reference may be
    * garbage collected.
    */
			var registry = [];

			/**
    * Creates the global IntersectionObserverEntry constructor.
    * https://wicg.github.io/IntersectionObserver/#intersection-observer-entry
    * @param {Object} entry A dictionary of instance properties.
    * @constructor
    */
			function IntersectionObserverEntry(entry) {
				this.time = entry.time;
				this.target = entry.target;
				this.rootBounds = entry.rootBounds;
				this.boundingClientRect = entry.boundingClientRect;
				this.intersectionRect = entry.intersectionRect || getEmptyRect();
				try {
					this.isIntersecting = !!entry.intersectionRect;
				} catch (err) {}
				// This means we are using the IntersectionObserverEntry polyfill which has only defined a getter


				// Calculates the intersection ratio.
				var targetRect = this.boundingClientRect;
				var targetArea = targetRect.width * targetRect.height;
				var intersectionRect = this.intersectionRect;
				var intersectionArea = intersectionRect.width * intersectionRect.height;

				// Sets intersection ratio.
				if (targetArea) {
					this.intersectionRatio = intersectionArea / targetArea;
				} else {
					// If area is zero and is intersecting, sets to 1, otherwise to 0
					this.intersectionRatio = this.isIntersecting ? 1 : 0;
				}
			}

			/**
    * Creates the global IntersectionObserver constructor.
    * https://wicg.github.io/IntersectionObserver/#intersection-observer-interface
    * @param {Function} callback The function to be invoked after intersection
    *     changes have queued. The function is not invoked if the queue has
    *     been emptied by calling the `takeRecords` method.
    * @param {Object=} opt_options Optional configuration options.
    * @constructor
    */
			function IntersectionObserver(callback, opt_options) {

				var options = opt_options || {};

				if (typeof callback != 'function') {
					throw new Error('callback must be a function');
				}

				if (options.root && options.root.nodeType != 1) {
					throw new Error('root must be an Element');
				}

				// Binds and throttles `this._checkForIntersections`.
				this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

				// Private properties.
				this._callback = callback;
				this._observationTargets = [];
				this._queuedEntries = [];
				this._rootMarginValues = this._parseRootMargin(options.rootMargin);

				// Public properties.
				this.thresholds = this._initThresholds(options.threshold);
				this.root = options.root || null;
				this.rootMargin = this._rootMarginValues.map(function (margin) {
					return margin.value + margin.unit;
				}).join(' ');
			}

			/**
    * The minimum interval within which the document will be checked for
    * intersection changes.
    */
			IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;

			/**
    * The frequency in which the polyfill polls for intersection changes.
    * this can be updated on a per instance basis and must be set prior to
    * calling `observe` on the first target.
    */
			IntersectionObserver.prototype.POLL_INTERVAL = null;

			/**
    * Starts observing a target element for intersection changes based on
    * the thresholds values.
    * @param {Element} target The DOM element to observe.
    */
			IntersectionObserver.prototype.observe = function (target) {
				// If the target is already being observed, do nothing.
				if (this._observationTargets.some(function (item) {
					return item.element == target;
				})) {
					return;
				}

				if (!(target && target.nodeType == 1)) {
					throw new Error('target must be an Element');
				}

				this._registerInstance();
				this._observationTargets.push({ element: target, entry: null });
				this._monitorIntersections();
			};

			/**
    * Stops observing a target element for intersection changes.
    * @param {Element} target The DOM element to observe.
    */
			IntersectionObserver.prototype.unobserve = function (target) {
				this._observationTargets = this._observationTargets.filter(function (item) {

					return item.element != target;
				});
				if (!this._observationTargets.length) {
					this._unmonitorIntersections();
					this._unregisterInstance();
				}
			};

			/**
    * Stops observing all target elements for intersection changes.
    */
			IntersectionObserver.prototype.disconnect = function () {
				this._observationTargets = [];
				this._unmonitorIntersections();
				this._unregisterInstance();
			};

			/**
    * Returns any queue entries that have not yet been reported to the
    * callback and clears the queue. This can be used in conjunction with the
    * callback to obtain the absolute most up-to-date intersection information.
    * @return {Array} The currently queued entries.
    */
			IntersectionObserver.prototype.takeRecords = function () {
				var records = this._queuedEntries.slice();
				this._queuedEntries = [];
				return records;
			};

			/**
    * Accepts the threshold value from the user configuration object and
    * returns a sorted array of unique threshold values. If a value is not
    * between 0 and 1 and error is thrown.
    * @private
    * @param {Array|number=} opt_threshold An optional threshold value or
    *     a list of threshold values, defaulting to [0].
    * @return {Array} A sorted list of unique and valid threshold values.
    */
			IntersectionObserver.prototype._initThresholds = function (opt_threshold) {
				var threshold = opt_threshold || [0];
				if (!Array.isArray(threshold)) threshold = [threshold];

				return threshold.sort().filter(function (t, i, a) {
					if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
						throw new Error('threshold must be a number between 0 and 1 inclusively');
					}
					return t !== a[i - 1];
				});
			};

			/**
    * Accepts the rootMargin value from the user configuration object
    * and returns an array of the four margin values as an object containing
    * the value and unit properties. If any of the values are not properly
    * formatted or use a unit other than px or %, and error is thrown.
    * @private
    * @param {string=} opt_rootMargin An optional rootMargin value,
    *     defaulting to '0px'.
    * @return {Array<Object>} An array of margin objects with the keys
    *     value and unit.
    */
			IntersectionObserver.prototype._parseRootMargin = function (opt_rootMargin) {
				var marginString = opt_rootMargin || '0px';
				var margins = marginString.split(/\s+/).map(function (margin) {
					var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
					if (!parts) {
						throw new Error('rootMargin must be specified in pixels or percent');
					}
					return { value: parseFloat(parts[1]), unit: parts[2] };
				});

				// Handles shorthand.
				margins[1] = margins[1] || margins[0];
				margins[2] = margins[2] || margins[0];
				margins[3] = margins[3] || margins[1];

				return margins;
			};

			/**
    * Starts polling for intersection changes if the polling is not already
    * happening, and if the page's visibilty state is visible.
    * @private
    */
			IntersectionObserver.prototype._monitorIntersections = function () {
				if (!this._monitoringIntersections) {
					this._monitoringIntersections = true;

					this._checkForIntersections();

					// If a poll interval is set, use polling instead of listening to
					// resize and scroll events or DOM mutations.
					if (this.POLL_INTERVAL) {
						this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
					} else {
						addEvent(window, 'resize', this._checkForIntersections, true);
						addEvent(document, 'scroll', this._checkForIntersections, true);

						if ('MutationObserver' in window) {
							this._domObserver = new MutationObserver(this._checkForIntersections);
							this._domObserver.observe(document, {
								attributes: true,
								childList: true,
								characterData: true,
								subtree: true
							});
						}
					}
				}
			};

			/**
    * Stops polling for intersection changes.
    * @private
    */
			IntersectionObserver.prototype._unmonitorIntersections = function () {
				if (this._monitoringIntersections) {
					this._monitoringIntersections = false;

					clearInterval(this._monitoringInterval);
					this._monitoringInterval = null;

					removeEvent(window, 'resize', this._checkForIntersections, true);
					removeEvent(document, 'scroll', this._checkForIntersections, true);

					if (this._domObserver) {
						this._domObserver.disconnect();
						this._domObserver = null;
					}
				}
			};

			/**
    * Scans each observation target for intersection changes and adds them
    * to the internal entries queue. If new entries are found, it
    * schedules the callback to be invoked.
    * @private
    */
			IntersectionObserver.prototype._checkForIntersections = function () {
				var rootIsInDom = this._rootIsInDom();
				var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

				this._observationTargets.forEach(function (item) {
					var target = item.element;
					var targetRect = getBoundingClientRect(target);
					var rootContainsTarget = this._rootContainsTarget(target);
					var oldEntry = item.entry;
					var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);

					var newEntry = item.entry = new IntersectionObserverEntry({
						time: now(),
						target: target,
						boundingClientRect: targetRect,
						rootBounds: rootRect,
						intersectionRect: intersectionRect
					});

					if (!oldEntry) {
						this._queuedEntries.push(newEntry);
					} else if (rootIsInDom && rootContainsTarget) {
						// If the new entry intersection ratio has crossed any of the
						// thresholds, add a new entry.
						if (this._hasCrossedThreshold(oldEntry, newEntry)) {
							this._queuedEntries.push(newEntry);
						}
					} else {
						// If the root is not in the DOM or target is not contained within
						// root but the previous entry for this target had an intersection,
						// add a new record indicating removal.
						if (oldEntry && oldEntry.isIntersecting) {
							this._queuedEntries.push(newEntry);
						}
					}
				}, this);

				if (this._queuedEntries.length) {
					this._callback(this.takeRecords(), this);
				}
			};

			/**
    * Accepts a target and root rect computes the intersection between then
    * following the algorithm in the spec.
    * TODO(philipwalton): at this time clip-path is not considered.
    * https://wicg.github.io/IntersectionObserver/#calculate-intersection-rect-algo
    * @param {Element} target The target DOM element
    * @param {Object} rootRect The bounding rect of the root after being
    *     expanded by the rootMargin value.
    * @return {?Object} The final intersection rect object or undefined if no
    *     intersection is found.
    * @private
    */
			IntersectionObserver.prototype._computeTargetAndRootIntersection = function (target, rootRect) {

				// If the element isn't displayed, an intersection can't happen.
				if (window.getComputedStyle(target).display == 'none') return;

				var targetRect = getBoundingClientRect(target);
				var intersectionRect = targetRect;
				var parent = getParentNode(target);
				var atRoot = false;

				while (!atRoot) {
					var parentRect = null;
					var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};

					// If the parent isn't displayed, an intersection can't happen.
					if (parentComputedStyle.display == 'none') return;

					if (parent == this.root || parent == document) {
						atRoot = true;
						parentRect = rootRect;
					} else {
						// If the element has a non-visible overflow, and it's not the <body>
						// or <html> element, update the intersection rect.
						// Note: <body> and <html> cannot be clipped to a rect that's not also
						// the document rect, so no need to compute a new intersection.
						if (parent != document.body && parent != document.documentElement && parentComputedStyle.overflow != 'visible') {
							parentRect = getBoundingClientRect(parent);
						}
					}

					// If either of the above conditionals set a new parentRect,
					// calculate new intersection data.
					if (parentRect) {
						intersectionRect = computeRectIntersection(parentRect, intersectionRect);

						if (!intersectionRect) break;
					}
					parent = getParentNode(parent);
				}
				return intersectionRect;
			};

			/**
    * Returns the root rect after being expanded by the rootMargin value.
    * @return {Object} The expanded root rect.
    * @private
    */
			IntersectionObserver.prototype._getRootRect = function () {
				var rootRect;
				if (this.root) {
					rootRect = getBoundingClientRect(this.root);
				} else {
					// Use <html>/<body> instead of window since scroll bars affect size.
					var html = document.documentElement;
					var body = document.body;
					rootRect = {
						top: 0,
						left: 0,
						right: html.clientWidth || body.clientWidth,
						width: html.clientWidth || body.clientWidth,
						bottom: html.clientHeight || body.clientHeight,
						height: html.clientHeight || body.clientHeight
					};
				}
				return this._expandRectByRootMargin(rootRect);
			};

			/**
    * Accepts a rect and expands it by the rootMargin value.
    * @param {Object} rect The rect object to expand.
    * @return {Object} The expanded rect.
    * @private
    */
			IntersectionObserver.prototype._expandRectByRootMargin = function (rect) {
				var margins = this._rootMarginValues.map(function (margin, i) {
					return margin.unit == 'px' ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
				});
				var newRect = {
					top: rect.top - margins[0],
					right: rect.right + margins[1],
					bottom: rect.bottom + margins[2],
					left: rect.left - margins[3]
				};
				newRect.width = newRect.right - newRect.left;
				newRect.height = newRect.bottom - newRect.top;

				return newRect;
			};

			/**
    * Accepts an old and new entry and returns true if at least one of the
    * threshold values has been crossed.
    * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
    *    particular target element or null if no previous entry exists.
    * @param {IntersectionObserverEntry} newEntry The current entry for a
    *    particular target element.
    * @return {boolean} Returns true if a any threshold has been crossed.
    * @private
    */
			IntersectionObserver.prototype._hasCrossedThreshold = function (oldEntry, newEntry) {

				// To make comparing easier, an entry that has a ratio of 0
				// but does not actually intersect is given a value of -1
				var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
				var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;

				// Ignore unchanged ratios
				if (oldRatio === newRatio) return;

				for (var i = 0; i < this.thresholds.length; i++) {
					var threshold = this.thresholds[i];

					// Return true if an entry matches a threshold or if the new ratio
					// and the old ratio are on the opposite sides of a threshold.
					if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
						return true;
					}
				}
			};

			/**
    * Returns whether or not the root element is an element and is in the DOM.
    * @return {boolean} True if the root element is an element and is in the DOM.
    * @private
    */
			IntersectionObserver.prototype._rootIsInDom = function () {
				return !this.root || containsDeep(document, this.root);
			};

			/**
    * Returns whether or not the target element is a child of root.
    * @param {Element} target The target element to check.
    * @return {boolean} True if the target element is a child of root.
    * @private
    */
			IntersectionObserver.prototype._rootContainsTarget = function (target) {
				return containsDeep(this.root || document, target);
			};

			/**
    * Adds the instance to the global IntersectionObserver registry if it isn't
    * already present.
    * @private
    */
			IntersectionObserver.prototype._registerInstance = function () {
				if (registry.indexOf(this) < 0) {
					registry.push(this);
				}
			};

			/**
    * Removes the instance from the global IntersectionObserver registry.
    * @private
    */
			IntersectionObserver.prototype._unregisterInstance = function () {
				var index = registry.indexOf(this);
				if (index != -1) registry.splice(index, 1);
			};

			/**
    * Returns the result of the performance.now() method or null in browsers
    * that don't support the API.
    * @return {number} The elapsed time since the page was requested.
    */
			function now() {
				return window.performance && performance.now && performance.now();
			}

			/**
    * Throttles a function and delays its executiong, so it's only called at most
    * once within a given time period.
    * @param {Function} fn The function to throttle.
    * @param {number} timeout The amount of time that must pass before the
    *     function can be called again.
    * @return {Function} The throttled function.
    */
			function throttle(fn, timeout) {
				var timer = null;
				return function () {
					if (!timer) {
						timer = setTimeout(function () {
							fn();
							timer = null;
						}, timeout);
					}
				};
			}

			/**
    * Adds an event handler to a DOM node ensuring cross-browser compatibility.
    * @param {Node} node The DOM node to add the event handler to.
    * @param {string} event The event name.
    * @param {Function} fn The event handler to add.
    * @param {boolean} opt_useCapture Optionally adds the even to the capture
    *     phase. Note: this only works in modern browsers.
    */
			function addEvent(node, event, fn, opt_useCapture) {
				if (typeof node.addEventListener == 'function') {
					node.addEventListener(event, fn, opt_useCapture || false);
				} else if (typeof node.attachEvent == 'function') {
					node.attachEvent('on' + event, fn);
				}
			}

			/**
    * Removes a previously added event handler from a DOM node.
    * @param {Node} node The DOM node to remove the event handler from.
    * @param {string} event The event name.
    * @param {Function} fn The event handler to remove.
    * @param {boolean} opt_useCapture If the event handler was added with this
    *     flag set to true, it should be set to true here in order to remove it.
    */
			function removeEvent(node, event, fn, opt_useCapture) {
				if (typeof node.removeEventListener == 'function') {
					node.removeEventListener(event, fn, opt_useCapture || false);
				} else if (typeof node.detatchEvent == 'function') {
					node.detatchEvent('on' + event, fn);
				}
			}

			/**
    * Returns the intersection between two rect objects.
    * @param {Object} rect1 The first rect.
    * @param {Object} rect2 The second rect.
    * @return {?Object} The intersection rect or undefined if no intersection
    *     is found.
    */
			function computeRectIntersection(rect1, rect2) {
				var top = Math.max(rect1.top, rect2.top);
				var bottom = Math.min(rect1.bottom, rect2.bottom);
				var left = Math.max(rect1.left, rect2.left);
				var right = Math.min(rect1.right, rect2.right);
				var width = right - left;
				var height = bottom - top;

				return width >= 0 && height >= 0 && {
					top: top,
					bottom: bottom,
					left: left,
					right: right,
					width: width,
					height: height
				};
			}

			/**
    * Shims the native getBoundingClientRect for compatibility with older IE.
    * @param {Element} el The element whose bounding rect to get.
    * @return {Object} The (possibly shimmed) rect of the element.
    */
			function getBoundingClientRect(el) {
				var rect;

				try {
					rect = el.getBoundingClientRect();
				} catch (err) {
					// Ignore Windows 7 IE11 "Unspecified error"
					// https://github.com/WICG/IntersectionObserver/pull/205
				}

				if (!rect) return getEmptyRect();

				// Older IE
				if (!(rect.width && rect.height)) {
					rect = {
						top: rect.top,
						right: rect.right,
						bottom: rect.bottom,
						left: rect.left,
						width: rect.right - rect.left,
						height: rect.bottom - rect.top
					};
				}
				return rect;
			}

			/**
    * Returns an empty rect object. An empty rect is returned when an element
    * is not in the DOM.
    * @return {Object} The empty rect.
    */
			function getEmptyRect() {
				return {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					width: 0,
					height: 0
				};
			}

			/**
    * Checks to see if a parent element contains a child elemnt (including inside
    * shadow DOM).
    * @param {Node} parent The parent element.
    * @param {Node} child The child element.
    * @return {boolean} True if the parent node contains the child node.
    */
			function containsDeep(parent, child) {
				var node = child;
				while (node) {
					if (node == parent) return true;

					node = getParentNode(node);
				}
				return false;
			}

			/**
    * Gets the parent node of an element or its host element if the parent node
    * is a shadow root.
    * @param {Node} node The node whose parent to get.
    * @return {Node|null} The parent node or null if no parent exists.
    */
			function getParentNode(node) {
				var parent = node.parentNode;

				if (parent && parent.nodeType == 11 && parent.host) {
					// If the parent is a shadow root, return the host element.
					return parent.host;
				}
				return parent;
			}

			// Exposes the constructors globally.
			window.IntersectionObserver = IntersectionObserver;
			window.IntersectionObserverEntry = IntersectionObserverEntry;
		})(window, document);
	}
}).call(window);

var Emitter = function () {
  function Emitter() {
    classCallCheck(this, Emitter);

    this.listeners = {};
    this.sortedListeners = {};
  }

  createClass(Emitter, [{
    key: 'emit',
    value: function emit(event) {
      var listeners = this.getListeners(event);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < listeners.length; i++) {
        var context = null;

        if (listeners[i].context !== null) {
          context = listeners[i].context;
        } else {
          context = {
            type: event
          };
        }

        var result = listeners[i].listener.apply(context, args);

        if (result === false) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: 'on',
    value: function on(event, listener, context, priority) {
      return this.addListener(event, listener, context, priority);
    }
  }, {
    key: 'once',
    value: function once(event, listener, context, priority) {
      return this.addOneTimeListener(event, listener, context, priority);
    }
  }, {
    key: 'off',
    value: function off(event, listener) {
      if (typeof listener === 'undefined') {
        return this.removeAllListeners(event);
      }

      return this.removeListener(event, listener);
    }

    /* Lower numbers correspond with earlier execution,
    /* and functions with the same priority are executed
    /* in the order in which they were added to the action. */

  }, {
    key: 'addListener',
    value: function addListener(event, listener) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

      this.ensureListener(listener);

      if (!this.listeners[event]) {
        this.listeners[event] = {};
      }
      if (!this.listeners[event][priority]) {
        this.listeners[event][priority] = [];
      }

      this.listeners[event][priority].push({
        context: context,
        listener: listener
      });
      this.clearSortedListeners(event);

      return this;
    }
  }, {
    key: 'addOneTimeListener',
    value: function addOneTimeListener(event, listener, context) {
      var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

      var that = this;
      function wrapper() {
        that.removeListener(event, wrapper);

        return listener.apply(undefined, arguments);
      }

      this.addListener(event, wrapper, context, priority);

      return this;
    }
  }, {
    key: 'removeListener',
    value: function removeListener(event, listener) {
      this.clearSortedListeners(event);
      var listeners = this.hasListeners(event) ? this.listeners[event] : [];

      for (var priority in listeners) {
        if (Object.prototype.hasOwnProperty.call(listeners, priority)) {
          listeners[priority] = listeners[priority].filter(function (value) {
            return value.listener !== listener;
          });

          if (listeners[priority].length === 0) {
            delete listeners[priority];
          }
        }
      }

      this.listeners[event] = listeners;

      return this;
    }
  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners(event) {
      this.clearSortedListeners(event);

      if (this.hasListeners(event)) {
        delete this.listeners[event];
      }

      return this;
    }
  }, {
    key: 'ensureListener',
    value: function ensureListener(listener) {
      var type = typeof listener === 'undefined' ? 'undefined' : _typeof(listener);
      if (type === 'function') {
        return listener;
      }
      throw new TypeError('Listeners should be function or closure. Received type: ' + type);
    }
  }, {
    key: 'hasListeners',
    value: function hasListeners(event) {
      if (!this.listeners[event] || Object.keys(this.listeners[event]).length === 0) {
        return false;
      }

      return true;
    }
  }, {
    key: 'getListeners',
    value: function getListeners(event) {
      if (!this.sortedListeners.hasOwnProperty(event)) {
        this.sortedListeners[event] = this.getSortedListeners(event);
      }

      return this.sortedListeners[event];
    }
  }, {
    key: 'getSortedListeners',
    value: function getSortedListeners(event) {
      if (!this.hasListeners(event)) {
        return [];
      }

      var listeners = this.listeners[event];

      var priorities = Object.keys(listeners);
      priorities.sort(function (a, b) {
        return a - b;
      });

      var sortedlisteners = [];
      for (var i = 0; i < priorities.length; i++) {
        sortedlisteners = sortedlisteners.concat(listeners[priorities[i]]);
      }

      return sortedlisteners;
    }
  }, {
    key: 'clearSortedListeners',
    value: function clearSortedListeners(event) {
      delete this.sortedListeners[event];
    }
  }]);
  return Emitter;
}();

/* eslint no-undef: "off" */

/* Credit to http://featurejs.com MIT */
var feature = function () {
  /**
   * Test if it's an old device that we want to filter out
   */
  var old = Boolean(/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent));
  var style = document.createElement('dummy').style;

  /**
   * Function that takes a standard CSS property name as a parameter and
   * returns it's prefixed version valid for current browser it runs in
   */
  var pfx = function () {
    var prefixes = ['Webkit', 'Moz', 'O', 'ms'];
    var memory = {};
    return function (prop) {
      if (typeof memory[prop] === 'undefined') {
        var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1);
        var props = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');
        memory[prop] = null;

        for (var i in props) {
          if (style[props[i]] !== undefined) {
            memory[prop] = props[i];
            break;
          }
        }
      }
      return memory[prop];
    };
  }();

  return {
    prefixedProperty: function prefixedProperty(property) {
      return pfx(property);
    },


    transitionProperty: function () {
      return pfx('transition');
    }(),

    transformProperty: function () {
      return pfx('transform');
    }(),

    animationProperty: function () {
      return pfx('animation');
    }(),

    transitionEndEvent: function () {
      var eventNames = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd'
      };
      for (var i in eventNames) {
        if (eventNames.hasOwnProperty(i)) {
          if (style[i] !== undefined) {
            return eventNames[i];
          }
        }
      }
      return false;
    }(),

    animationEndEvent: function () {
      var eventNames = {
        animation: 'animationend',
        OAnimation: 'oanimationend',
        msAnimation: 'MSAnimationEnd',
        MozAnimation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd'
      };
      for (var i in eventNames) {
        if (eventNames.hasOwnProperty(i)) {
          if (style[i] !== undefined) {
            return eventNames[i];
          }
        }
      }
      return false;
    }(),

    // Test if CSS 3D transforms are supported
    transform3D: function () {
      var test = !old && pfx('perspective') !== null;
      return Boolean(test);
    }(),

    // Test if CSS transforms are supported
    transform: function () {
      var test = !old && pfx('transformOrigin') !== null;
      return Boolean(test);
    }(),

    // Test if CSS transitions are supported
    transition: function () {
      var test = pfx('transition') !== null;
      return Boolean(test);
    }(),

    // Test if SVG is supported
    svg: Boolean(document.createElementNS) && Boolean(document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect),

    // Tests if touch events are supported, but doesn't necessarily reflect a touchscreen device
    touch: Boolean('ontouchstart' in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch),

    pointer: window.PointerEvent || window.MSPointerEvent ? true : false, // eslint-disable-line no-unneeded-ternary

    pointerEvent: function pointerEvent(_pointerEvent) {
      return window.MSPointerEvent ? 'MSPointer' + _pointerEvent.charAt(9).toUpperCase() + _pointerEvent.substr(10) : _pointerEvent;
    }
  };
}();

function fromPairs(arr) {
  return arr.reduce(function (r, _ref) {
    var _ref2 = slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return _extends({}, r, defineProperty({}, k, v));
  }, {});
}

function mergeWith() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var objs = args.slice(0, -1);
  var customizer = args[args.length - 1];
  return Object.entries(args[0]).reduce(function (r, _ref3) {
    var _ref4 = slicedToArray(_ref3, 1),
        k = _ref4[0];

    return _extends({}, r, defineProperty({}, k, objs.map(function (obj) {
      return obj[k];
    }).filter(function (v) {
      return Boolean(v) || v === 0;
    }).reduce(function (r, i) {
      return customizer(r, i);
    })));
  }, {});
}

var T = {
  0: 'X',
  1: 'Y',
  2: 'Z'
};

function mapTransformToAnime(str) {
  var css3dList = ['translate', 'rotate', 'scale'];
  return css3dList.filter(function (key) {
    var regx = new RegExp(key, 'g');
    if (str.match(regx)) {
      return true;
    }
    return false;
  }).reduce(function (initialState, key) {
    var matrix = str.match(/\(([^()]+)\)/)[1].split(',');
    var map = mapMatch(key);
    return map(matrix);
  }, {});
}

function mapMatch(type) {
  switch (type) {
    case 'translate':
      return mapToTranslate;
    case 'rotate':
      return mapToRotate;
    case 'scale':
      return mapToScale;
    default:
      return function () {
        return 'no match!';
      };
  }
}

function mapToScale(matrix) {
  // console.group('scale')
  var result = matrix.map(function (value, index) {
    var n = parseFloat(value, 10);
    var result = defineProperty({}, 'scale' + T[index], n || 0);
    // console.log(result)
    return result;
  });
  return result.reduce(mergeObject);
}

function mapToTranslate(matrix) {
  var result = matrix.map(function (value, index) {
    var n = parseFloat(value.slice(0, -2), 10);
    var result = defineProperty({}, 'translate' + T[index], n || 0);
    return result;
  });
  return result.reduce(mergeObject);
}

function mapToRotate(matrix) {
  var value = matrix[matrix.length - 1].slice(0, -3);
  var transformType = matrix.slice(0, -1).map(function (n, index) {
    if (parseInt(n, 10)) {
      return 'rotate' + T[index];
    }
    return n;
  }).filter(isNotEmpty);
  return defineProperty({}, transformType[0], parseFloat(value));
}

function mergeObject(r, i) {
  return _extends({}, r, i);
}

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return [objValue, srcValue];
}

function isNotEmpty(value) {
  if (value) {
    return true;
  }
  return false;
}

function filterOffset(obj) {
  var offset = obj.offset,
      result = objectWithoutProperties(obj, ['offset']);

  return result;
}

function filterEmptyValues(obj) {
  return fromPairs(Object.entries(obj).filter(function (_ref6) {
    var _ref7 = slicedToArray(_ref6, 2),
        v = _ref7[1];

    var arr = v.filter(function (i) {
      return Boolean(i);
    });
    if (arr.length) {
      return true;
    }
    return false;
  }).map(function (_ref8) {
    var _ref9 = slicedToArray(_ref8, 2),
        k = _ref9[0],
        v = _ref9[1];

    var value = v.map(function (i) {
      if (i === undefined) {
        if (/scale/g.test(k)) {
          return 1;
        }
        return 0;
      }
      return i;
    });
    return [k, value];
  }));
}

function mapKeyFramesToAnime(keyframes) {
  var transformNoneIndex = [];
  var transformKeys = new Set();
  var newKeyFrames = keyframes.map(function (keyframe, keyframeIndex) {
    var transform = keyframe.transform,
        newKeyFrame = objectWithoutProperties(keyframe, ['transform']);

    if (transform) {
      var arr = transform.split(') ').map(function (item, index, arr) {
        if (index !== arr.length - 1) {
          return item + ')';
        }
        return item;
      }).map(function (value) {
        if (/3d/g.test(value)) {
          var transformObject = mapTransformToAnime(value);
          Object.keys(transformObject).map(function (key) {
            return transformKeys.add(key);
          });
          return transformObject;
        }
        return value;
      }).filter(function (value) {
        return typeof value !== 'string';
      });
      // console.log(arr)
      if (!arr.length) {
        transformNoneIndex.push(keyframeIndex);
        return newKeyFrame;
      }
      return Object.assign.apply(Object, [{}, newKeyFrame].concat(toConsumableArray(arr)));
    }
    return newKeyFrame;
  });
  var emptyTransform = fromPairs(Array.from(transformKeys).map(function (key) {
    if (/scale/g.test(key)) {
      return [key, 1];
    }
    return [key, 0];
  }));
  if (transformNoneIndex.length) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = transformNoneIndex[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var index = _step.value;

        Object.assign(newKeyFrames[index], emptyTransform);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  var data = mergeWith.apply(undefined, toConsumableArray(newKeyFrames).concat([customizer]));
  var result = filterOffset(filterEmptyValues(data));
  return result;
}

var curry = function curry(fn) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return function () {
    for (var _len = arguments.length, subArgs = Array(_len), _key = 0; _key < _len; _key++) {
      subArgs[_key] = arguments[_key];
    }

    var collect = args.concat(subArgs);
    if (collect.length >= fn.length) {
      return fn.apply(undefined, toConsumableArray(collect));
    }
    return curry(fn, collect);
  };
};

var compose = function compose() {
  for (var _len2 = arguments.length, fn = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fn[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return fn.reduceRight(function (r, i) {
      if (Array.isArray(r)) {
        return i.apply(undefined, toConsumableArray(r));
      }
      return i(r);
    }, args);
  };
};

var util = function () {
  var MAX_UID = 1000000;

  return {
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    range: function range(v) {
      return Array.from({
        length: v
      }, function (v, i) {
        return i;
      });
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    arraysEqual: function arraysEqual(a, b) {
      if (a === b) {
        return true;
      }
      if (a === undefined || b === undefined) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    },
    arrayDiff: function arrayDiff(a, b) {
      // let t;
      // if (a.length < b.length) {
      //   t = b;
      //   b = a;
      //   a = t;
      // }
      return a.filter(function (n) {
        return b.indexOf(n) < 0;
      });
    },
    arrayIntersect: function arrayIntersect(a, b) {
      var t = void 0;
      if (b.length > a.length) {
        t = b;
        b = a;
        a = t;
      }
      return a.filter(function (n) {
        return b.indexOf(n) !== -1;
      });
    },
    convertPercentageToFloat: function convertPercentageToFloat(n) {
      return parseFloat(n.slice(0, -1) / 100, 10);
    },
    convertFloatToPercentage: function convertFloatToPercentage(n) {
      if (n < 0) {
        n = 0;
      } else if (n > 1) {
        n = 1;
      }
      return parseFloat(n).toFixed(4) * 100 + '%';
    },
    convertMatrixToArray: function convertMatrixToArray(value) {
      if (value && value.substr(0, 6) === 'matrix') {
        return value.replace(/^.*\((.*)\)$/g, '$1').replace(/px/g, '').split(/, +/);
      }
      return false;
    },
    getTime: function getTime() {
      if (typeof window.performance !== 'undefined' && window.performance.now) {
        return window.performance.now();
      }
      return Date.now();
    },
    camelize: function camelize(word) {
      var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      word = word.replace(/[_.-\s](\w|$)/g, function (_, x) {
        return x.toUpperCase();
      });

      if (first) {
        word = word.substring(0, 1).toUpperCase() + word.substring(1);
      }
      return word;
    },


    /* Credit to https://github.com/jonschlinkert/get-value MIT */
    getValueByPath: function getValueByPath(obj, path) {
      if (Object(obj) !== obj || typeof path === 'undefined') {
        return obj;
      }

      if (path in obj) {
        return obj[path];
      }

      var segs = path.split('.');
      var length = segs.length;
      if (!length) {
        return undefined;
      }
      var i = -1;

      while (obj && ++i < length) {
        var key = segs[i];
        while (key[key.length - 1] === '\\') {
          key = key.slice(0, -1) + '.' + segs[++i];
        }
        obj = obj[key];
      }
      return obj;
    },


    /* Throttle execution of a function.
     * Especially useful for rate limiting execution of
     * handlers on events like resize and scroll. */
    throttle: function throttle(func, delay) {
      var _this = this;

      var running = false;
      function resetRunning() {
        running = false;
      }

      if (delay !== undefined || delay !== null) {
        return function () {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          var that = _this;

          if (running) {
            return;
          }
          running = true;
          func.apply(that, args);
          window.setTimeout(resetRunning, delay);
        };
      }

      return function () {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        var that = _this;

        if (running) {
          return;
        }
        running = true;
        window.requestAnimationFrame(function () {
          func.apply(that, args);
          resetRunning();
        });
      };
    },


    /* Debounce execution of a function.
     * Debouncing, unlike throttling, guarantees that a function
     * is only executed a single time at the very end. */
    debounce: function debounce(func) {
      var _this2 = this;

      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

      var timer = void 0;

      return function () {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        var that = _this2;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timer = setTimeout(function () {
          func.apply(that, args);
        }, delay);
      };
    },


    asTransitionEnd: 'asTransitionEnd',
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $$1(element).trigger(feature.transitionEndEvent);
    },

    keyframes2Anime: mapKeyFramesToAnime,
    compose: compose,
    curry: curry,
    fromPairs: function fromPairs(arr) {
      return arr.reduce(function (r, _ref) {
        var _ref2 = slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return _extends({}, r, defineProperty({}, k, v));
      }, {});
    },
    mergeWith: function mergeWith(obj1, obj2, customizer) {
      return Object.entries(obj1).reduce(function (r, _ref3) {
        var _ref4 = slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return _extends({}, r, defineProperty({}, k, customizer(v, obj2[k])));
      }, {});
    }
  };
}();

function setTransitionEndSupport() {
  $$1.fn.asTransitionEnd = function (duration) {
    var _this3 = this;

    var called = false;

    $$1(this).one(util.asTransitionEnd, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        util.triggerTransitionEnd(_this3);
      }
    }, duration);

    return this;
  };

  if (feature.transitionEndEvent) {
    // suport transition end
    $$1.event.special[util.asTransitionEnd] = {
      bindType: feature.transitionEndEvent,
      delegateType: feature.transitionEndEvent,
      handle: function handle(event) {
        if ($$1(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }
}

setTransitionEndSupport();

var Plugin = function () {
  function Plugin(namespace, element) {
    classCallCheck(this, Plugin);

    this.plugin = namespace;

    this.element = element;
    this.$element = $$1(element);
  }

  createClass(Plugin, [{
    key: 'getDataOptions',
    value: function getDataOptions() {
      var _this = this;

      var data = this.$element.data();
      var length = 0;
      var newData = {};

      $$1.each(data, function () {
        length++;
      });

      if (length > 0) {
        $$1.each(data, function (name, content) {
          var cache = {};
          var items = name.split('-');
          // let items = name.split('-');

          var deep = items.length;

          if (deep > 1) {
            for (var j = 0; j < deep; j++) {
              var item = items[j].substring(0, 1).toLowerCase() + items[j].substring(1);

              if (j === 0) {
                cache[item] = {};
              } else if (j === deep - 1) {
                
              } else {
                
              }
            }
          } else if (items[0] === 'as' + _this.plugin.substring(0, 1).toUpperCase() + _this.plugin.substring(1)) {
            cache = content;
          } else {
            cache[name] = content;
          }

          $$1.extend(newData, cache);
        });
      }

      return newData;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this2 = this;

      this.$element.data(this.plugin, null);

      As.instances[this.plugin] = As.instances[this.plugin].filter(function (instance) {
        return instance !== _this2;
      });
    }
  }]);
  return Plugin;
}();

var GlobalPlugin = function (_Plugin) {
  inherits(GlobalPlugin, _Plugin);

  function GlobalPlugin(namespace) {
    classCallCheck(this, GlobalPlugin);

    var _this = possibleConstructorReturn(this, (GlobalPlugin.__proto__ || Object.getPrototypeOf(GlobalPlugin)).call(this, namespace, As.doc));

    if (!As.instances[_this.plugin]) {
      return possibleConstructorReturn(_this);
    }
    _this.instanceId = As.instances[_this.plugin].length + 1;
    As.instances[_this.plugin].push(_this);
    return _this;
  }

  createClass(GlobalPlugin, [{
    key: 'destroy',
    value: function destroy() {
      var _this2 = this;

      As.instances[this.plugin] = As.instances[this.plugin].filter(function (instance) {
        return instance !== _this2;
      });
    }
  }]);
  return GlobalPlugin;
}(Plugin);

/* Credit to https://github.com/Matt-Esch/string-template MIT */
var template = function () {
  var pattern = /\{\s*([.0-9a-zA-Z_]+)\s*\}/g;

  function render(string) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 1 && _typeof(args[0]) === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(pattern, function (match, i, index) {
      var result = null;

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      }

      if (args.hasOwnProperty(i)) {
        result = args[i];
      } else if (i.indexOf('.') !== -1) {
        result = util.getValueByPath(args, i);
      }

      if (result === null || result === undefined) {
        return '';
      }

      return result;
    });
  }

  return {
    render: render,
    compile: function compile(str) {
      return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return render.apply(undefined, [str].concat(args));
      };
    },
    parse: function parse(str) {
      var matches = str.match(pattern);

      if (matches === null) {
        return false;
      }

      var parsed = [];
      for (var i = 0; i < matches.length; i++) {
        if (!matches[i].match(/^\{\{.+\}\}$/g)) {
          parsed.push(matches[i].substring(1, matches[i].length - 1).trim());
        }
      }

      return parsed;
    }
  };
}();

var I18N = function () {
  function I18N(defaults$$1, translations) {
    classCallCheck(this, I18N);

    this.defaults = $$1.extend(true, {}, I18N.defaults, defaults$$1);

    this.translations = translations ? translations : {};
  }

  createClass(I18N, [{
    key: 'hasTranslation',
    value: function hasTranslation(locale) {
      return locale in this.translations;
    }
  }, {
    key: 'addTranslation',
    value: function addTranslation(locale, translation) {
      if (this.translations[locale]) {
        $$1.extend(this.translations[locale], translation);
      } else {
        this.translations[locale] = translation;
      }
    }
  }, {
    key: 'getTranslation',
    value: function getTranslation(locale) {
      if (this.translations[locale]) {
        return this.translations[locale];
      }
      return {};
    }
  }, {
    key: 'instance',
    value: function instance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var that = this;

      var _options = $$1.extend({}, that.defaults, options);
      var _locale = _options.locale;

      function getMessage(key, locale) {
        var translation = that.getTranslation(locale);
        var message = util.getValueByPath(translation, key);

        return message;
      }

      return {
        translate: function translate(key) {
          var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _locale;

          var message = getMessage(key, locale);

          if (message === undefined && _options.fallbacks) {
            var locales = locale.split('-');
            if (locales.length > 1 && that.hasTranslation(locales[0])) {
              message = getMessage(key, locales[0]);
            }

            if (message === undefined) {
              var fallbackLocale = void 0;
              if (_options.fallbacks !== true && that.hasTranslation(_options.fallbacks)) {
                fallbackLocale = _options.fallbacks;
              } else {
                fallbackLocale = that.defaults.locale;
              }

              message = getMessage(key, fallbackLocale);
            }
          }

          if (Object.prototype.toString.call(message) === '[object Array]' && message.length >= 2) {
            if (typeof args._number === 'string') {
              if (typeof args[args._number] !== 'undefined') {
                var _number = parseInt(args[args._number], 10);

                if (_number === 1) {
                  message = message[0];
                } else if (_number > 1) {
                  message = message[1];
                } else if (_number === 0 && message.length >= 3) {
                  message = message[2];
                }
              }
            }
          }

          if (typeof message === 'string') {
            var parsed = template.parse(message);
            if (!parsed) {
              return message;
            }
            var _key = void 0;
            for (var i = 0; i < parsed.length; i++) {
              _key = parsed[i];
              if (typeof args[_key] === 'undefined') {
                args[_key] = _options.missingPlaceholder(_key);
              } else if (args[_key] === null) {
                args[_key] = _options.nullPlaceholder(_key);
              }
            }
            return template.render(message, args);
          }

          if (Object(message) === message) {
            return message;
          }

          return '[missing "' + locale + '.' + key + '" translation]';
        },
        setLocale: function setLocale(locale) {
          _locale = locale;
        },
        getLocale: function getLocale() {
          return _locale;
        }
      };
    }
  }, {
    key: 'setTranslations',
    value: function setTranslations(translations) {
      this.translations = translations;
    }
  }]);
  return I18N;
}();

I18N.defaults = {
  locale: 'en',
  fallbacks: true,
  nullPlaceholder: function nullPlaceholder(key) {
    return '[missing {{' + key + '}} value]';
  },
  missingPlaceholder: function missingPlaceholder(key) {
    return '[missing {{' + key + '}} value]';
  }
};

/* Credit to http://github.com/gre/bezier-easing MIT */
var _bezier = function () {
  var NEWTON_ITERATIONS = 6;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 12;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = typeof Float32Array === 'function';

  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }
  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }
  function C(aA1) {
    return 3.0 * aA1;
  }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX = void 0;
    var currentT = void 0;
    var i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) {
        return aGuessT;
      }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  return function bezier(mX1, mY1, mX2, mY2, css) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range');
    }

    // Precompute samples table
    var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {
      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      }
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }

    function BezierEasing(x) {
      // linear
      if (mX1 === mY1 && mX2 === mY2) {
        return x;
      }
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (x === 0) {
        return 0;
      }
      if (x === 1) {
        return 1;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    }

    BezierEasing.css = function () {
      if (css) {
        return css;
      }
      if (mX1 === mY1 && mX2 === mY2) {
        return 'linear';
      }
      return 'cubic-bezier(' + mX1 + ', ' + mY1 + ', ' + mX2 + ', ' + mY2 + ')';
    };

    return BezierEasing;
  };
}();

/* Credit to http://easings.net/ */
var easings = {
  ease: [0.25, 0.1, 0.25, 1.0, 'ease'],
  linear: [0.0, 0.0, 1.0, 1.0, 'linear'],
  easeIn: [0.42, 0.0, 1.0, 1.0, 'ease-in'],
  easeOut: [0.0, 0.0, 0.58, 1.0, 'ease-out'],
  easeInOut: [0.42, 0.0, 0.58, 1.0, 'ease-in-out'],
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
};

var easing = {
  get: function get$$1(name) {
    if (name in easings) {
      return _bezier.apply(undefined, toConsumableArray(easings[name]));
    }
    return undefined;
  },
  bezier: function bezier(mX1, mY1, mX2, mY2) {
    return _bezier(mX1, mY1, mX2, mY2);
  },
  register: function register(name, mX1, mY1, mX2, mY2) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range');
    }
    easings[name] = [mX1, mY1, mX2, mY2];
  }
};

/*eslint-disable */
/* Credit to http://is.js.org MIT */
var is = function () {
  var toString = Object.prototype.toString;

  return {
    // Type checks
    /* -------------------------------------------------------------------------- */
    // is a given value Arguments?
    arguments: function _arguments(value) {
      // fallback check is for IE
      return toString.call(value) === '[object Arguments]' || value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'callee' in value;
    },

    // is a given value Array?
    array: function array(val) {
      if (Array.isArray) {
        return Array.isArray(val);
      }
      return toString.call(val) === '[object Array]';
    },

    // is a given value Boolean?
    boolean: function boolean(val) {
      return val === true || val === false || toString.call(val) === '[object Boolean]';
    },

    // is a given value Char?
    char: function char(val) {
      return this.string(val) && val.length === 1;
    },

    // is a given value Date Object?
    date: function date(value) {
      return toString.call(value) === '[object Date]';
    },

    // is a given object a DOM node?
    domNode: function domNode(object) {
      return this.object(object) && object.nodeType > 0;
    },

    // is a given value Error object?
    error: function error(val) {
      return toString.call(val) === '[object Error]';
    },

    // is a given value function?
    function: function _function(val) {
      // fallback check is for IE
      return toString.call(val) === '[object Function]' || typeof val === 'function';
    },

    // is given value a pure JSON object?
    json: function json(value) {
      return toString.call(value) === '[object Object]';
    },

    // is a given value NaN?
    nan: function nan(val) {
      // NaN is number :) Also it is the only value which does not equal itself
      return val !== val;
    },

    // is a given value null?
    null: function _null(val) {
      return val === null;
    },

    // is a given value number?
    number: function number(val) {
      return !this.nan(val) && toString.call(val) === '[object Number]';
    },

    // is a given value object?
    object: function object(val) {
      return Object(val) === val;
    },

    // is a given value empty object?
    emptyObject: function emptyObject(val) {
      return this.object(val) && Object.getOwnPropertyNames(val).length == 0;
    },

    // is a given value RegExp?
    regexp: function regexp(val) {
      return toString.call(val) === '[object RegExp]';
    },

    // is a given value String?
    string: function string(val) {
      return typeof val === 'string' || toString.call(val) === '[object String]';
    },

    // is a given value undefined?
    undefined: function undefined(val) {
      return val === void 0;
    },

    // Arithmetic checks
    /* -------------------------------------------------------------------------- */
    // is a given value numeric?
    numeric: function numeric(n) {
      return (this.number(n) || this.string(n)) && !this.nan(n - parseFloat(n));
    },

    // is a given number percentage?
    percentage: function percentage(n) {
      return typeof n === 'string' && n.indexOf('%') !== -1;
    },

    // is a given number decimal?
    decimal: function decimal(n) {
      return this.number(n) && n % 1 !== 0;
    },

    // is a given number finite?
    finite: function finite(n) {
      if (isFinite) {
        return isFinite(n);
      }
      return !this.infinite(n) && !this.nan(n);
    },

    // is a given number infinite?
    infinite: function infinite(n) {
      return n === Infinity || n === -Infinity;
    },

    integer: function integer(n) {
      return this.number(n) && n % 1 === 0;
    },

    // is a given number negative?
    negative: function negative(n) {
      return this.number(n) && n < 0;
    },

    // is a given number positive?
    positive: function positive(n) {
      return this.number(n) && n > 0;
    }
  };
}();

/* eslint object-property-newline: 'off' */
var MAP_BY_CODE = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  20: 'caps_lock',
  27: 'esc',
  32: 'space',
  33: 'page_up',
  34: 'page_down',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'insert',
  46: 'delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'command',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  144: 'num_lock'
};

var MAP_BY_NAME = {};

for (var key in MAP_BY_CODE) {
  if (Object.prototype.hasOwnProperty.call(MAP_BY_CODE, key)) {
    MAP_BY_NAME[MAP_BY_CODE[key]] = Number(key);
  }
}

var MODIFIERS = {
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  91: 'command'
};

var Keyboard = function () {
  function Keyboard(element) {
    classCallCheck(this, Keyboard);

    this.element = element || window.document;
    this.$element = $(this.element);
    this.emitter = new Emitter();

    this.initialize();
    this.registerEvent();
  }

  createClass(Keyboard, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      this.status = {};

      $.each(MODIFIERS, function (keyCode, keyName) {
        _this.status[keyName] = false;

        _this.emitter.on(keyCode + 'down', function () {
          if (_this.status[keyName]) {
            return;
          }
          _this.status[keyName] = true;
        });
        _this.emitter.on(keyCode + 'up', function () {
          if (!_this.status[keyName]) {
            return;
          }
          _this.status[keyName] = false;
        });
      });
    }
  }, {
    key: 'registerEvent',
    value: function registerEvent() {
      var _this2 = this;

      this.$element.on('keydown keyup', function (e) {
        return _this2.handler(e);
      });
    }
  }, {
    key: 'handler',
    value: function handler(e) {
      /* eslint consistent-return: "off" */
      var keyCode = e.keyCode;
      var action = e.type === 'keydown' ? 'down' : 'up';
      var prefix = '';

      if (keyCode === 93 || keyCode === 224) {
        keyCode = 91;
      }

      // if (!this.filter(e)) return;

      if (keyCode in MODIFIERS) {
        var result = this.emitter.emit(keyCode + action);
        if (result === false) {
          return false;
        }
      }

      $.each(this.status, function (keyName, status) {
        if (status) {
          prefix += keyName;
        }
      });

      var eventName = prefix + keyCode + action;

      if (!(eventName in this.emitter.listeners)) {
        return;
      }

      return this.emitter.emit(eventName);
    }
  }, {
    key: 'on',
    value: function on(action, key, func) {
      return this.dispatch(true, action, key, func);
    }
  }, {
    key: 'off',
    value: function off(action, key, func) {
      return this.dispatch(false, action, key, func);
    }
  }, {
    key: 'dispatch',
    value: function dispatch(toggle, action, key, func) {
      var _this3 = this;

      var keys = this.parseKeys(this.processKey(key));

      $.each(keys, function (i, key) {
        var modifiers = key.modifiers;
        var keyCode = key.keyCode;
        var prefix = '';

        if (modifiers !== null) {
          for (var _i = 0; _i < modifiers.length; _i++) {
            prefix += MODIFIERS[modifiers[_i]];
          }
        }

        if (toggle) {
          _this3.emitter.on(prefix + keyCode + action, func);
        } else {
          _this3.emitter.off(prefix + keyCode + action, func);
        }
      });

      return this;
    }
  }, {
    key: 'parseKeys',
    value: function parseKeys(keys) {
      var _this4 = this;

      var newKeys = [];

      $.each(keys, function (i, key) {
        var newKey = {};
        var modifiers = null;

        key = key.split('+');
        var length = key.length;

        if (length > 1) {
          modifiers = _this4.processModifiers(key);
          key = [key[length - 1]];
        }

        key = _this4.getKeyCode(key[0]);

        newKey.modifiers = modifiers;
        newKey.keyCode = key;
        newKeys.push(newKey);
      });

      return newKeys;
    }
  }, {
    key: 'processKey',
    value: function processKey(key) {
      key = key.toLowerCase().replace(/\s/g, '');
      var keys = key.split(',');
      if (keys[keys.length - 1] === '') {
        keys[keys.length - 2] += ',';
      }
      return keys;
    }
  }, {
    key: 'processModifiers',
    value: function processModifiers(key) {
      var modifiers = key.slice(0, key.length - 1);

      for (var i = 0; i < modifiers.length; i++) {
        modifiers[i] = MAP_BY_NAME[modifiers[i]];
      }

      modifiers.sort();

      return modifiers;
    }
  }, {
    key: 'distribute',
    value: function distribute(action, key, func) {
      return func === null || func === undefined ? this.off(action, key, func) : this.on(action, key, func);
    }
  }, {
    key: 'getKeyName',
    value: function getKeyName(keyCode) {
      return MAP_BY_CODE[keyCode];
    }
  }, {
    key: 'getKeyCode',
    value: function getKeyCode(keyName) {
      return MAP_BY_NAME[keyName];
    }
  }, {
    key: 'up',
    value: function up(key, func) {
      return this.distribute('up', key, func);
    }
  }, {
    key: 'down',
    value: function down(key, func) {
      return this.distribute('down', key, func);
    }
  }]);
  return Keyboard;
}();

var keyboard = {
  init: function init(element) {
    return new Keyboard(element);
  }
};

/* eslint object-property-newline: 'off' */
var Keyframes = {
  bounce: [{
    transform: 'translate3d(0,0,0)',
    offset: 0
  }, {
    transform: 'translate3d(0,0,0)',
    offset: 0.2
  }, {
    transform: 'translate3d(0,-30px,0)',
    offset: 0.4
  }, {
    transform: 'translate3d(0,-30px,0)',
    offset: 0.43
  }, {
    transform: 'translate3d(0,0,0)',
    offset: 0.53
  }, {
    transform: 'translate3d(0,-15px,0)',
    offset: 0.7
  }, {
    transform: 'translate3d(0,0,0)',
    offset: 0.8
  }, {
    transform: 'translate3d(0,-15px,0)',
    offset: 0.9
  }, {
    transform: 'translate3d(0,0,0)',
    offset: 1
  }],
  bounceIn: [{
    transform: 'scale3d(.3, .3, .3)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1)',
    offset: 0.2
  }, {
    transform: 'scale3d(.9, .9, .9)',
    offset: 0.4
  }, {
    transform: 'scale3d(1.03, 1.03, 1.03)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'scale3d(.97, .97, .97)',
    offset: 0.8
  }, {
    transform: 'scale3d(1, 1, 1)',
    opacity: '1',
    offset: 1
  }],
  bounceOut: [{
    transform: 'none',
    opacity: '1',
    offset: 0
  }, {
    transform: 'scale3d(.9, .9, .9)',
    opacity: '1',
    offset: 0.2
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1)',
    opacity: '1',
    offset: 0.5
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1)',
    opacity: '1',
    offset: 0.55
  }, {
    transform: 'scale3d(.3, .3, .3)',
    opacity: '0',
    offset: 1
  }],
  bounceInDown: [{
    transform: 'translate3d(0, -3000px, 0)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'translate3d(0, 25px, 0)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'translate3d(0, -100px, 0)',
    offset: 0.75
  }, {
    transform: 'translate3d(0, 5px, 0)',
    offset: 0.9
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  bounceOutDown: [{
    transform: 'none',
    opacity: '1',
    offset: 0
  }, {
    transform: 'translate3d(0, 50px, 0)',
    opacity: '1',
    offset: 0.2
  }, {
    transform: 'translate3d(0, -20px, 0)',
    opacity: '1',
    offset: 0.4
  }, {
    transform: 'translate3d(0, -20px, 0)',
    opacity: '1',
    offset: 0.45
  }, {
    transform: 'translate3d(0, 2000px, 0)',
    opacity: '0',
    offset: 1
  }],
  bounceInUp: [{
    transform: 'translate3d(0, 3000px, 0)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'translate3d(0, -25px, 0)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'translate3d(0, 100px, 0)',
    offset: 0.75
  }, {
    transform: 'translate3d(0, -5px, 0)',
    offset: 0.9
  }, {
    transform: 'translate3d(0, 0, 0)',
    opacity: '1',
    offset: 1
  }],
  bounceOutUp: [{
    transform: 'none',
    opacity: '1',
    offset: 0
  }, {
    transform: 'translate3d(0, 50px, 0)',
    opacity: '1',
    offset: 0.2
  }, {
    transform: 'translate3d(0, 20px, 0)',
    opacity: '1',
    offset: 0.4
  }, {
    transform: 'translate3d(0, 20px, 0)',
    opacity: '1',
    offset: 0.45
  }, {
    transform: 'translate3d(0, -2000px, 0)',
    opacity: '0',
    offset: 1
  }],
  bounceInLeft: [{
    transform: 'translate3d(-3000px, 0, 0)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'translate3d(25px, 0, 0)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'translate3d(-100px, 0, 0)',
    offset: 0.75
  }, {
    transform: 'translate3d(5px, 0, 0)',
    offset: 0.9
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  bounceOutLeft: [{
    transform: 'none',
    opacity: '1',
    offset: 0
  }, {
    transform: 'translate3d(100px, 0, 0)',
    opacity: '1',
    offset: 0.2
  }, {
    transform: 'translate3d(-20px, 0, 0)',
    opacity: '1',
    offset: 0.4
  }, {
    transform: 'translate3d(-20px, 0, 0)',
    opacity: '1',
    offset: 0.45
  }, {
    transform: 'translate3d(-2000px, 0, 0)',
    opacity: '0',
    offset: 1
  }],
  bounceInRight: [{
    transform: 'translate3d(3000px, 0, 0)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'translate3d(-25px, 0, 0)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'translate3d(100px, 0, 0)',
    offset: 0.75
  }, {
    transform: 'translate3d(-5px, 0, 0)',
    offset: 0.9
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  bounceOutRight: [{
    transform: 'none',
    opacity: '1',
    offset: 0
  }, {
    transform: 'translate3d(100px, 0, 0)',
    opacity: '1',
    offset: 0.2
  }, {
    transform: 'translate3d(-20px, 0, 0)',
    opacity: '1',
    offset: 0.4
  }, {
    transform: 'translate3d(-20px, 0, 0)',
    opacity: '1',
    offset: 0.45
  }, {
    transform: 'translate3d(2000px, 0, 0)',
    opacity: '0',
    offset: 1
  }],
  flip: [{
    transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)',
    offset: 0
  }, {
    transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)',
    offset: 0.4
  }, {
    transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)',
    offset: 0.5
  }, {
    transform: 'perspective(400px) scale3d(.95, .95, .95)',
    offset: 0.8
  }, {
    transform: 'perspective(400px)',
    offset: 1
  }],
  flipInX: [{
    transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
    offset: 0.4
  }, {
    transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
    opacity: '1',
    offset: 0.8
  }, {
    transform: 'perspective(400px)',
    opacity: '1',
    offset: 1
  }],
  flipOutX: [{
    transform: 'perspective(400px)',
    opacity: '1',
    offset: 0
  }, {
    transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
    opacity: '1',
    offset: 0.3
  }, {
    transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
    opacity: '0',
    offset: 1
  }],
  flipInY: [{
    transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
    offset: 0.4
  }, {
    transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
    opacity: '1',
    offset: 0.8
  }, {
    transform: 'perspective(400px)',
    opacity: '1',
    offset: 1
  }],
  flipOutY: [{
    transform: 'perspective(400px)',
    opacity: '1',
    offset: 0
  }, {
    transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
    opacity: '1',
    offset: 0.3
  }, {
    transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
    opacity: '0',
    offset: 1
  }],
  flash: [{
    opacity: '1',
    offset: 0
  }, {
    opacity: '0',
    offset: 0.25
  }, {
    opacity: '1',
    offset: 0.5
  }, {
    opacity: '0',
    offset: 0.75
  }, {
    opacity: '1',
    offset: 1
  }],
  pulse: [{
    transform: 'scale3d(1, 1, 1)',
    offset: 0
  }, {
    transform: 'scale3d(1.05, 1.05, 1.05)',
    offset: 0.5
  }, {
    transform: 'scale3d(1, 1, 1)',
    offset: 1
  }],
  rubberBand: [{
    transform: 'scale3d(1, 1, 1)',
    offset: 0
  }, {
    transform: 'scale3d(1.25, 0.75, 1)',
    offset: 0.3
  }, {
    transform: 'scale3d(0.75, 1.25, 1)',
    offset: 0.4
  }, {
    transform: 'scale3d(1.15, 0.85, 1)',
    offset: 0.5
  }, {
    transform: 'scale3d(.95, 1.05, 1)',
    offset: 0.65
  }, {
    transform: 'scale3d(1.05, .95, 1)',
    offset: 0.75
  }, {
    transform: 'scale3d(1, 1, 1)',
    offset: 1
  }],
  lightSpeedInRight: [{
    transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'skewX(20deg)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'skewX(-5deg)',
    opacity: '1',
    offset: 0.8
  }, {
    transform: 'none',
    opacity: '1 ',
    offset: 1
  }],
  lightSpeedOutRight: [{
    transform: 'none',
    opacity: '1 ',
    offset: 0
  }, {
    transform: 'translate3d(100%, 0, 0) skewX(30deg)',
    opacity: '0',
    offset: 1
  }],
  lightSpeedInLeft: [{
    transform: 'translate3d(-100%, 0, 0) skewX(-30deg)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'skewX(20deg)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'skewX(-5deg)',
    opacity: '1',
    offset: 0.8
  }, {
    transform: 'none',
    opacity: '1 ',
    offset: 1
  }],
  lightSpeedOutLeft: [{
    transform: 'none',
    opacity: '1 ',
    offset: 0
  }, {
    transform: 'translate3d(-100%, 0, 0) skewX(30deg)',
    opacity: '0',
    offset: 1
  }],
  shake: [{
    transform: 'translate3d(0, 0, 0)',
    offset: 0
  }, {
    transform: 'translate3d(-10px, 0, 0)',
    offset: 0.1
  }, {
    transform: 'translate3d(10px, 0, 0)',
    offset: 0.2
  }, {
    transform: 'translate3d(-10px, 0, 0)',
    offset: 0.3
  }, {
    transform: 'translate3d(10px, 0, 0)',
    offset: 0.4
  }, {
    transform: 'translate3d(-10px, 0, 0)',
    offset: 0.5
  }, {
    transform: 'translate3d(10px, 0, 0)',
    offset: 0.6
  }, {
    transform: 'translate3d(-10px, 0, 0)',
    offset: 0.7
  }, {
    transform: 'translate3d(10px, 0, 0)',
    offset: 0.8
  }, {
    transform: 'translate3d(-10px, 0, 0)',
    offset: 0.9
  }, {
    transform: 'translate3d(0, 0, 0)',
    offset: 1
  }],
  swing: [{
    transform: 'translate(0%)',
    offset: 0
  }, {
    transform: 'rotate3d(0, 0, 1, 15deg)',
    offset: 0.2
  }, {
    transform: 'rotate3d(0, 0, 1, -10deg)',
    offset: 0.4
  }, {
    transform: 'rotate3d(0, 0, 1, 5deg)',
    offset: 0.6
  }, {
    transform: 'rotate3d(0, 0, 1, -5deg)',
    offset: 0.8
  }, {
    transform: 'rotate3d(0, 0, 1, 0deg)',
    offset: 1
  }],
  tada: [{
    transform: 'scale3d(1, 1, 1)',
    offset: 0
  }, {
    transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
    offset: 0.1
  }, {
    transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)',
    offset: 0.2
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
    offset: 0.3
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
    offset: 0.4
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
    offset: 0.5
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
    offset: 0.6
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
    offset: 0.7
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
    offset: 0.8
  }, {
    transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
    offset: 0.9
  }, {
    transform: 'scale3d(1, 1, 1)',
    offset: 1
  }],
  wobble: [{
    transform: 'translate(0%)',
    offset: 0
  }, {
    transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
    offset: 0.15
  }, {
    transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
    offset: 0.45
  }, {
    transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
    offset: 0.6
  }, {
    transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
    offset: 0.75
  }, {
    transform: 'translateX(0%)',
    offset: 1
  }],
  fadeIn: [{
    opacity: '0',
    offset: 0
  }, {
    opacity: '1',
    offset: 1
  }],
  fadeOut: [{
    opacity: '1',
    offset: 0
  }, {
    opacity: '0',
    offset: 1
  }],
  fadeInDown: [{
    opacity: '0',
    transform: 'translate3d(0, -100%, 0)',
    offset: 0
  }, {
    opacity: '1',
    transform: 'none',
    offset: 1
  }],
  fadeOutDown: [{
    opacity: '1',
    transform: 'none',
    offset: 0
  }, {
    opacity: '0',
    transform: 'translate3d(0, 100%, 0)',
    offset: 1
  }],
  fadeOutUp: [{
    opacity: '1',
    transform: 'none',
    offset: 0
  }, {
    opacity: '0',
    transform: 'translate3d(0, -100%, 0)',
    offset: 1
  }],
  fadeOutUpBig: [{
    opacity: '1',
    transform: 'none',
    offset: 0
  }, {
    opacity: '0',
    transform: 'translate3d(0, -2000px, 0)',
    offset: 1
  }],
  fadeInUp: [{
    opacity: '0',
    transform: 'translate3d(0, 100%, 0)',
    offset: 0
  }, {
    opacity: '1',
    transform: 'none',
    offset: 1
  }],
  fadeInDownBig: [{
    opacity: '0',
    transform: 'translate3d(0, -2000px, 0)',
    offset: 0
  }, {
    opacity: '1',
    transform: 'none',
    offset: 1
  }],
  fadeOutDownBig: [{
    opacity: '1',
    transform: 'none',
    offset: 0
  }, {
    opacity: '0',
    transform: 'translate3d(0, 2000px, 0)',
    offset: 1
  }],
  fadeInUpBig: [{
    opacity: '0',
    transform: 'translate3d(0, 2000px, 0)',
    offset: 0
  }, {
    opacity: '1',
    transform: 'none',
    offset: 1
  }],
  fadeInRightBig: [{
    opacity: '0',
    transform: 'translate3d(2000px, 0, 0)',
    offset: 0
  }, {
    opacity: '1',
    transform: 'none',
    offset: 1
  }],
  fadeOutLeftBig: [{
    opacity: '1',
    transform: 'none',
    offset: 0
  }, {
    opacity: '0',
    transform: 'translate3d(-2000px, 0, 0)',
    offset: 1
  }],
  fadeInLeft: [{
    opacity: '0',
    transform: 'translate3d(-100%, 0, 0)',
    offset: 0
  }, {
    opacity: '1',
    transform: 'none',
    offset: 1
  }],
  fadeInLeftBig: [{
    opacity: '0',
    transform: 'translate3d(-2000px, 0, 0)',
    offset: 0
  }, {
    opacity: '1',
    transform: 'none',
    offset: 1
  }],
  fadeInRight: [{
    opacity: '0',
    transform: 'translate3d(100%, 0, 0)',
    offset: 0
  }, {
    opacity: '1',
    transform: 'none',
    offset: 1
  }],
  fadeOutLeft: [{
    opacity: '1',
    transform: 'none',
    offset: 0
  }, {
    opacity: '0',
    transform: 'translate3d(-100%, 0, 0)',
    offset: 1
  }],
  fadeOutRight: [{
    opacity: '1',
    transform: 'none',
    offset: 0
  }, {
    opacity: '0',
    transform: 'translate3d(100%, 0, 0)',
    offset: 1
  }],
  fadeOutRightBig: [{
    opacity: '1',
    transform: 'none',
    offset: 0
  }, {
    opacity: '0',
    transform: 'translate3d(2000px, 0, 0)',
    offset: 1
  }],
  rollIn: [{
    transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  rollOut: [{
    transform: 'none',
    opacity: '1',
    offset: 0
  }, {
    transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
    opacity: '0',
    offset: 1
  }],
  zoomIn: [{
    transform: 'scale3d(.3, .3, .3)  ',
    opacity: '0',
    offset: 0
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  zoomOutDown: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'center bottom',
    offset: 0
  }, {
    transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
    opacity: '1',
    transformOrigin: 'center bottom',
    offset: 0.4
  }, {
    transform: 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)',
    opacity: '0',
    transformOrigin: 'center bottom',
    offset: 1
  }],
  zoomOutUp: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'center bottom',
    offset: 0
  }, {
    transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)',
    opacity: '1',
    transformOrigin: 'center bottom',
    offset: 0.4
  }, {
    transform: 'scale3d(.1, .1, .1) translate3d(0, -2000px, 0)',
    opacity: '0',
    transformOrigin: 'center bottom',
    offset: 1
  }],
  zoomOutRight: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'right center',
    offset: 0
  }, {
    transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)',
    opacity: '1',
    transformOrigin: 'right center',
    offset: 0.4
  }, {
    transform: 'scale(.1) translate3d(2000px, 0, 0)',
    opacity: '0',
    transformOrigin: 'right center',
    offset: 1
  }],
  zoomOutLeft: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'left center',
    offset: 0
  }, {
    transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)',
    opacity: '1',
    transformOrigin: 'left center',
    offset: 0.4
  }, {
    transform: 'scale(.1) translate3d(-2000px, 0, 0)',
    opacity: '0',
    transformOrigin: 'left center',
    offset: 1
  }],
  zoomInDown: [{
    transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  zoomInLeft: [{
    transform: 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  zoomInRight: [{
    transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  zoomInUp: [{
    transform: 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)',
    opacity: '0',
    offset: 0
  }, {
    transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
    opacity: '1',
    offset: 0.6
  }, {
    transform: 'none',
    opacity: '1',
    offset: 1
  }],
  zoomOut: [{
    transform: 'none',
    opacity: '1',
    offset: 0
  }, {
    transform: 'scale3d(.3, .3, .3)  ',
    opacity: '0',
    offset: 1
  }],
  rotateIn: [{
    transform: 'rotate3d(0, 0, 1, -200deg)',
    opacity: '0',
    transformOrigin: 'center',
    offset: 0
  }, {
    transform: 'none',
    opacity: '1',
    transformOrigin: 'center',
    offset: 1
  }],
  rotateInDownLeft: [{
    transform: 'rotate3d(0, 0, 1, -45deg)',
    opacity: '0',
    transformOrigin: 'left bottom',
    offset: 0
  }, {
    transform: 'none',
    opacity: '1',
    transformOrigin: 'left bottom',
    offset: 1
  }],
  rotateInDownRight: [{
    transform: 'rotate3d(0, 0, 1, 45deg)',
    opacity: '0',
    transformOrigin: 'right bottom',
    offset: 0
  }, {
    transform: 'none',
    opacity: '1',
    transformOrigin: 'right bottom',
    offset: 1
  }],
  rotateInUpLeft: [{
    transform: 'rotate3d(0, 0, 1, 45deg)',
    opacity: '0',
    transformOrigin: 'left bottom',
    offset: 0
  }, {
    transform: 'none',
    opacity: '1',
    transformOrigin: 'left bottom',
    offset: 1
  }],
  rotateInUpRight: [{
    transform: 'rotate3d(0, 0, 1, -45deg)',
    opacity: '0',
    transformOrigin: 'right bottom',
    offset: 0
  }, {
    transform: 'none',
    opacity: '1',
    transformOrigin: 'right bottom',
    offset: 1
  }],
  rotateOutDownLeft: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'left bottom',
    offset: 0
  }, {
    transform: 'rotate3d(0, 0, 1, 45deg)',
    opacity: '0',
    transformOrigin: 'left bottom',
    offset: 1
  }],
  rotateOutDownRight: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'right bottom',
    offset: 0
  }, {
    transform: 'rotate3d(0, 0, 1, -45deg)',
    opacity: '0',
    transformOrigin: 'right bottom',
    offset: 1
  }],
  rotateOutUpLeft: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'left bottom',
    offset: 0
  }, {
    transform: 'rotate3d(0, 0, 1, -45deg)',
    opacity: '0',
    transformOrigin: 'left bottom',
    offset: 1
  }],
  rotateOutUpRight: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'right bottom',
    offset: 0
  }, {
    transform: 'rotate3d(0, 0, 1, 45deg)',
    opacity: '0',
    transformOrigin: 'right bottom',
    offset: 1
  }],
  rotateOut: [{
    transform: 'none',
    opacity: '1',
    transformOrigin: 'center',
    offset: 0
  }, {
    transform: 'rotate3d(0, 0, 1, 200deg)',
    opacity: '0',
    transformOrigin: 'center',
    offset: 1
  }]
};

var curry$1 = util.curry;

var Viewport = function () {
  function Viewport(el, options) {
    var _this = this;

    classCallCheck(this, Viewport);
    this.isIntersecting = false;
    this.enterMiddleware = [];
    this.exitMiddleware = [];
    this.instance = null;

    this.element = el;
    this.options = options;
    this.observer = new IntersectionObserver(function (event) {
      if (event[0].isIntersecting) {
        _this.isIntersecting = true;
        return _this.enterMiddleware.map(function (fn) {
          return fn();
        });
      }
      _this.isIntersecting = false;
      return _this.exitMiddleware.map(function (fn) {
        return fn();
      });
    });
    this.observer.observe(this.element);
  }

  createClass(Viewport, [{
    key: 'on',
    value: function on(eventName, func, instance) {
      this.instance = instance;
      var adder = curry$1(function (func, middleware) {
        return middleware.concat(func);
      });
      this.eventMapper(eventName, adder(func.bind(this.instance)));
    }
  }, {
    key: 'off',
    value: function off(eventName, func) {
      var filter = curry$1(function (func, middleware) {
        return middleware.filter(function (fn) {
          return fn === func;
        });
      });
      this.eventMapper(eventName, filter(func.bind(this.instance)));
    }
  }, {
    key: 'eventMapper',
    value: function eventMapper(eventName, func) {
      if (eventName === 'enter') {
        this.enterMiddleware = func(this.enterMiddleware);
      }

      if (eventName === 'exit') {
        this.exitMiddleware = func(this.exitMiddleware);
      }
    }
  }, {
    key: 'isVisible',
    value: function isVisible() {
      return this.isIntersecting;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.observer.disconnect();
      this.enterMiddleware = [];
      this.isIntersecting = false;
      this.enterMiddleware = [];
      this.exitMiddleware = [];
      this.instance = null;
    }
  }], [{
    key: 'of',
    value: function of() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(Viewport, [null].concat(args)))();
    }
  }]);
  return Viewport;
}();

var viewport = function viewport() {
  return Viewport.of.apply(Viewport, arguments);
};

const test1 = () => console.log(this)

var As = {
  Plugin: Plugin,
  GlobalPlugin: GlobalPlugin,
  plugins: {},
  instances: {},
  $window: $$1(window),
  body: window.document.body,
  $body: $$1(window.document.body),
  doc: window.document,
  $doc: $$1(window.document),
  get: function get$$1(name) {
    if (typeof this.plugins[name] !== 'undefined') {
      return this.plugins[name];
    }
    return null;
  },
  test1,
  test2: function test2() {
    console.log(this)
  },
  register: function register(name, plugin) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _this = this;

    if (Object.getPrototypeOf(plugin) !== Plugin) {
      var config = plugin;
      return function (plugin) {
        return _this.registerFactory.apply(_this, [name, plugin, config].concat(toConsumableArray(args)));
      };
    }
    return this.registerFactory.apply(this, [name, plugin].concat(toConsumableArray(args)));
  },
  registerFactory: function registerFactory(name, plugin) {
    var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var info = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var that = this;

    if (typeof obj.translations !== 'undefined') {
      delete obj.translations;
    }

    obj = $$1.extend({
      defaults: {},
      methods: [],
      dependencies: []
    }, obj);

    if (this.get(name)) {
      /* eslint no-console: "off" */
      console.warn('Plugin \'' + name + '\' already exists.');
    }

    this.instances[name] = [];
    this.plugins[name] = $$1.extend(true, plugin, {
      setDefaults: function setDefaults() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        $$1.extend(true, plugin.defaults, options);
      }
    }, obj, info);

    if (obj.dependencies.length > 0) {
      var dependency = void 0;
      for (var i = 0; i < obj.dependencies.length; i++) {
        dependency = obj.dependencies[i];

        if (is.undefined(window[dependency]) && is.undefined(this.plugins[dependency])) {
          /* eslint no-console: "off" */
          console.warn('Plugin \'' + name + '\' require \'' + dependency + '\'.');
        }
      }
    }

    if (plugin.prototype.resize && that.is.undefined(plugin.resize)) {
      plugin.resize = function () {
        var instances = that.instances[name];

        for (var _i = 0; _i < instances.length; _i++) {
          instances[_i].resize(that.windowWidth, that.windowHeight);
        }
      };
    }

    if (that.is.function(plugin.resize)) {
      that.emitter.on('resize', plugin.resize);
    }

    var instancesCount = 0;
    if (plugin.prototype instanceof GlobalPlugin) {
      As[name] = plugin;
    } else {
      $$1.fn['as' + util.camelize(name)] = function (options) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        if (typeof options === 'string') {
          var method = options;

          if (!obj.methods.includes(method)) {
            return undefined;
          } else if (/^get/.test(method) || /^is/.test(method) || method === 'val' && args.length === 0) {
            var instance = this.first().data(name);
            if (instance && typeof instance[method] === 'function') {
              return instance[method].apply(instance, args);
            }
            return undefined;
          }

          return this.each(function () {
            var instance = $$1.data(this, name);
            if (instance && typeof instance[method] === 'function') {
              instance[method].apply(instance, args);
            }
          });
        }

        return this.each(function () {
          if (!$$1(this).data(name)) {
            var instanceId = ++instancesCount;
            var _instance = new plugin(this, options, instanceId);
            _instance.instanceId = instanceId;
            that.instances[name].push(_instance);
            $$1(this).data(name, _instance);
          }
        });
      };
    }
  },
  translateable: function translateable(translations) {
    return function (plugin) {
      plugin.I18N = new I18N({
        locale: plugin.defaults.locale,
        fallbacks: plugin.defaults.localeFallbacks
      }, translations);

      $$1.extend(plugin.prototype, {
        setupI18n: function setupI18n() {
          this.i18n = plugin.I18N.instance({
            locale: this.options.locale,
            fallbacks: this.options.localeFallbacks
          });
        },
        translate: function translate(key, args) {
          return this.i18n.translate(key, args);
        },
        setLocale: function setLocale(locale) {
          return this.i18n.setLocale(locale);
        },
        getLocale: function getLocale() {
          return this.i18n.getLocale();
        }
      });
    };
  },
  stateable: function stateable() {
    return function (plugin) {
      plugin.prototype.initStates = function () {
        var states = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._states = states;
      };

      // Checks whether the plugin is in a specific state or not.
      plugin.prototype.is = function (state) {
        if (this._states[state] && this._states[state] > 0) {
          return true;
        }
        return false;
      };

      // Enters a state.
      plugin.prototype.enter = function (state) {
        if (this._states[state] === undefined) {
          this._states[state] = 0;
        }

        // this._states[state]++;
        this._states[state] = 1;
      };

      // Leaves a state.
      plugin.prototype.leave = function (state) {
        if (this._states[state] === undefined) {
          this._states[state] = 0;
        }

        // this._states[state]--;
        this._states[state] = 0;
      };
    };
  },
  eventable: function eventable() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (plugin) {
      plugin.events = events;

      plugin.setEvents = function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        $$1.extend(true, plugin.events, options);
      };

      plugin.prototype.eventName = function (events) {
        if (typeof events !== 'string' || events === '') {
          return '.' + this.plugin;
        }
        events = events.split(' ');

        var length = events.length;
        for (var i = 0; i < length; i++) {
          events[i] = events[i] + '.' + this.plugin;
        }
        return events.join(' ');
      };

      plugin.prototype.eventNameWithId = function (events) {
        if (typeof events !== 'string' || events === '') {
          return '.' + this.plugin + '-' + this.instanceId;
        }

        events = events.split(' ');

        var length = events.length;
        for (var i = 0; i < length; i++) {
          events[i] = events[i] + '.' + this.plugin + '-' + this.instanceId;
        }
        return events.join(' ');
      };

      plugin.prototype.trigger = function (eventType) {
        for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          params[_key3 - 1] = arguments[_key3];
        }

        var data = [this].concat(params);
        // event
        if (eventType instanceof $$1.Event) {
          this.$element.trigger(eventType, data);
          eventType = eventType.type.replace(this.plugin + ':', '');
        } else {
          this.$element.trigger(this.plugin + ':' + eventType, data);
        }

        // callback
        eventType = util.camelize(eventType);
        var onFunction = 'on' + eventType;

        if (typeof this.options[onFunction] === 'function') {
          this.options[onFunction].apply(this, params);
        }
      };

      plugin.prototype.selfEventName = function (eventType) {
        return this.plugin + ':' + eventType;
      };
    };
  },
  themeable: function themeable() {
    return function (plugin) {
      plugin.prototype.getThemeClass = function (themes, THEME) {
        if (As.is.undefined(themes) && this.options.theme) {
          return this.getThemeClass(this.options.theme);
        }
        if (As.is.string(themes)) {
          if (As.is.undefined(THEME)) {
            THEME = this.classes.THEME;
          }
          themes = themes.split(' ');

          if (THEME) {
            for (var i = 0; i < themes.length; i++) {
              themes[i] = THEME.replace('{theme}', themes[i]);
            }
          } else {
            for (var _i2 = 0; _i2 < themes.length; _i2++) {
              themes[_i2] = this.getClass(themes[_i2]);
            }
          }
          return themes.join(' ');
        }

        return '';
      };
    };
  },
  styleable: function styleable() {
    var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (plugin) {
      plugin.classes = classes;
      plugin.setClasses = function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        $$1.extend(true, plugin.classes, options);
      };

      plugin.prototype.getClass = function (classname, arg, value) {
        if (!As.is.undefined(arg)) {
          return this.getClass(classname.replace('{' + arg + '}', value));
        }
        return classname.replace('{namespace}', this.classes.NAMESPACE || '');
      };

      plugin.prototype.initClasses = function (defaults$$1, options) {
        if (As.is.undefined(options) && As.is.object(this.options.classes)) {
          options = this.options.classes;
        }

        function conventKeyToUpperCase(obj) {
          var upperObj = {};
          for (var name in obj) {
            if (Object.hasOwnProperty.call(obj, name)) {
              if (As.is.string(obj[name])) {
                upperObj[name.toUpperCase()] = obj[name];
              } else if (As.is.object(obj[name])) {
                upperObj[name.toUpperCase()] = conventKeyToUpperCase(obj[name]);
              }
            }
          }
          return upperObj;
        }

        this.classes = $$1.extend(true, {}, defaults$$1, conventKeyToUpperCase(options || {}));

        var that = this;
        if (!As.is.undefined(this.classes.NAMESPACE)) {
          var _injectNamespace = function _injectNamespace(obj) {
            for (var name in obj) {
              if (Object.hasOwnProperty.call(obj, name)) {
                if (As.is.string(obj[name])) {
                  obj[name] = that.getClass(obj[name]);
                } else if (As.is.object(obj[name])) {
                  obj[name] = _injectNamespace(obj[name]);
                }
              }
            }
            return obj;
          };

          this.classes = _injectNamespace(this.classes);
        }
      };
    };
  },

  is: is,
  feature: feature,
  util: util,
  I18N: I18N,
  viewport: viewport,
  Emitter: Emitter,
  emitter: new Emitter(),
  template: template,
  keyboard: keyboard,
  easing: easing,
  keyframes: Keyframes
};

As.windowWidth = As.$window.width();
As.windowHeight = As.$window.height();

function globalResizeHandle() {
  As.windowWidth = As.$window.width();
  As.windowHeight = As.$window.height();
  As.emitter.emit('resize');
}

function globalScrollHanle() {
  As.emitter.emit('scroll');
}

window.addEventListener('orientationchange', globalResizeHandle);
window.addEventListener('resize', As.util.throttle(globalResizeHandle));
window.addEventListener('scroll', As.util.throttle(globalScrollHanle));

window.As = As;

return As;

})));
