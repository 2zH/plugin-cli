(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('animejs'), require('As')) :
	typeof define === 'function' && define.amd ? define(['jquery', 'animejs', 'As'], factory) :
	(global.animateText = factory(global.jquery,global.animejs,global.As));
}(this, (function ($,anime,As) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;
anime = anime && anime.hasOwnProperty('default') ? anime['default'] : anime;

var namespace = 'animateText';

var events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
};

var classes = {
  NAMESPACE: 'as-' + namespace,
  CONTAINER: '{namespace}-multiple '
};

var methods = ['value', 'enable', 'disable', 'destroy', 'set'];

var defaults = {
  mode: null,
  loop: true,
  delay: 0,
  duration: 1000
};

var dependencies = ['anime'];

var info = {
  version: '0.0.1'
};

var typewrite = (function (_ref) {
  var target = _ref.target,
      duration = _ref.duration,
      loop = _ref.loop,
      delay = _ref.delay;

  var text = target.textContent;
  var textArr = text.split('');
  var chunk = Array(textArr.length + 1).fill(1).map(function (v, k) {
    return k;
  });
  var indexList = chunk.concat(chunk.slice().reverse());
  var myObject = {
    textLen: 0
  };
  return {
    targets: myObject,
    textLen: indexList.length - 1,
    duration: duration || 2000,
    easing: 'linear',
    round: 1,
    loop: loop || false,
    delay: delay,
    update: function update() {
      var text = textArr.slice(0, indexList[myObject.textLen]).join('');
      target.textContent = text + '|';
    }
  };
});

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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var slider = function (_ref) {
  var target = _ref.target,
      delay = _ref.delay,
      duration = _ref.duration,
      loop = _ref.loop;

  var childrens = Array.from(target.children);
  var getWidthList = function getWidthList(target) {
    var container = target.cloneNode(true);
    container.style.display = 'inline-block';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);
    var widthList = Array.from(container.children).map(function (node) {
      return node.offsetWidth;
    });
    document.body.removeChild(container);
    return widthList;
  };
  var widthList = getWidthList(target);
  var clientHeight = target.clientHeight;
  // console.log(widthList);
  var childrenWrap = function childrenWrap(fn) {
    return function (el, i) {
      if (el !== target) {
        return fn(el, i - 1);
      }
      return undefined;
    };
  };
  var parentWrap = function parentWrap(fn) {
    return function (el, i) {
      if (el === target) {
        return fn(el, i);
      }
      return undefined;
    };
  };
  return {
    targets: [target].concat(toConsumableArray(childrens)),
    translateY: childrens.map(function (v, keyframeIndex) {
      var value = childrenWrap(function () {
        return clientHeight * (keyframeIndex + 1) * -1;
      });
      if (keyframeIndex === childrens.length - 1) {
        value = childrenWrap(function (el, i) {
          return i ? clientHeight * (keyframeIndex + 1) * -1 : 0;
        });
      }
      if (keyframeIndex === childrens.length - 2) {
        value = childrenWrap(function (el, i) {
          return i ? clientHeight * (keyframeIndex + 1) * -1 : clientHeight;
        });
      }
      return {
        value: value,
        duration: duration
      };
    }),
    visibility: childrens.map(function (v, keyframeIndex) {
      if (keyframeIndex === childrens.length - 2) {
        return {
          value: childrenWrap(function (el, i) {
            return i ? 'visible' : 'hidden';
          }),
          duration: duration
        };
      }
      return {
        value: childrenWrap(function () {
          return 'visible';
        }),
        duration: duration
      };
    }),
    width: childrens.map(function (v, keyframeIndex) {
      if (keyframeIndex === childrens.length - 1) {
        return {
          value: parentWrap(function () {
            return widthList[0];
          }),
          duration: duration
        };
      }
      return {
        value: parentWrap(function () {
          return widthList[keyframeIndex + 1];
        }),
        duration: duration
      };
    }),
    easing: 'easeInOutQuart',
    duration: duration,
    delay: delay,
    loop: loop
  };
};

var fade = (function (_ref) {
  var target = _ref.target,
      delay = _ref.delay,
      duration = _ref.duration,
      loop = _ref.loop;

  var childrens = Array.from(target.children);
  var getWidthList = function getWidthList(target) {
    var container = target.cloneNode(true);
    container.style.display = 'inline-block';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);
    var widthList = Array.from(container.children).map(function (node) {
      return node.offsetWidth;
    });
    document.body.removeChild(container);
    return widthList;
  };
  var widthList = getWidthList(target);
  var clientHeight = target.clientHeight;
  // console.log(widthList)
  var childrenWrap = function childrenWrap(fn) {
    return function (el, i) {
      if (el !== target) {
        return fn(el, i - 1);
      }
      return undefined;
    };
  };
  var parentWrap = function parentWrap(fn) {
    return function (el, i) {
      if (el === target) {
        return fn(el, i);
      }
      return undefined;
    };
  };
  return {
    targets: [target].concat(toConsumableArray(childrens)),
    translateY: childrens.map(function (v, keyframeIndex) {
      var value = childrenWrap(function () {
        return clientHeight * (keyframeIndex + 1) * -1;
      });
      if (keyframeIndex === childrens.length - 1) {
        value = childrenWrap(function (el, i) {
          return i ? clientHeight * (keyframeIndex + 1) * -1 : 0;
        });
      }
      if (keyframeIndex === childrens.length - 2) {
        value = childrenWrap(function (el, i) {
          return i ? clientHeight * (keyframeIndex + 1) * -1 : clientHeight;
        });
      }
      return {
        value: value,
        duration: duration / 2,
        delay: duration / 2
      };
    }),
    visibility: childrens.map(function (v, keyframeIndex) {
      if (keyframeIndex === childrens.length - 2) {
        return {
          value: childrenWrap(function (el, i) {
            return i ? 'visible' : 'hidden';
          }),
          duration: duration
        };
      }
      return {
        value: childrenWrap(function () {
          return 'visible';
        }),
        duration: duration
      };
    }),
    opacity: Array.from({
      length: childrens.length * 2
    }, function (v, keyframeIndex) {
      var isVisible = keyframeIndex % 2;
      return {
        value: parentWrap(function () {
          return isVisible ? 1 : 0;
        }),
        duration: duration / 2
      };
    }),
    width: childrens.map(function (v, keyframeIndex) {
      if (keyframeIndex === childrens.length - 1) {
        return {
          value: parentWrap(function () {
            return widthList[0];
          }),
          duration: duration
        };
      }
      return {
        value: parentWrap(function () {
          return widthList[keyframeIndex + 1];
        }),
        duration: duration
      };
    }),
    easing: 'easeInOutQuart',
    // duration,
    delay: delay,
    loop: loop
  };
});

var rotate = function (_ref) {
  var target = _ref.target,
      delay = _ref.delay,
      duration = _ref.duration,
      loop = _ref.loop;

  var childrens = Array.from(target.children);
  var getWidthList = function getWidthList(target) {
    var container = target.cloneNode(true);
    container.style.display = 'inline-block';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);
    var widthList = Array.from(container.children).map(function (node) {
      return node.offsetWidth;
    });
    document.body.removeChild(container);
    return widthList;
  };
  var widthList = getWidthList(target);
  var clientHeight = target.clientHeight;
  // console.log(widthList);
  var childrenWrap = function childrenWrap(fn) {
    return function (el, i) {
      if (el !== target) {
        return fn(el, i - 1);
      }
      return undefined;
    };
  };
  var parentWrap = function parentWrap(fn) {
    return function (el, i) {
      if (el === target) {
        return fn(el, i);
      }
      return undefined;
    };
  };
  return {
    targets: [target].concat(toConsumableArray(childrens)),
    translateY: childrens.map(function () {
      var value = childrenWrap(function (el, i) {
        return i * clientHeight * -1;
      });
      return {
        value: value,
        duration: duration
      };
    }),
    rotateX: childrens.map(function (v, keyframeIndex) {
      var value = childrenWrap(function (el, i) {
        if (keyframeIndex === childrens.length - 1 && i === 0) {
          return 0;
        }
        if (keyframeIndex === childrens.length - 2 && i === 0) {
          return -90;
        }
        if (i === keyframeIndex + 1) {
          return 0;
        }
        if (i > keyframeIndex + 1) {
          return -90;
        }
        if (i < keyframeIndex + 1) {
          return 90;
        }
        // return 90
        return undefined;
      });
      return {
        value: value,
        duration: duration
      };
    }),
    translateZ: childrens.map(function () {
      var value = childrenWrap(function () {
        return clientHeight + 'px';
      });
      return {
        value: value,
        duration: duration
      };
    }),
    visibility: childrens.map(function (v, keyframeIndex) {
      if (keyframeIndex === childrens.length - 2) {
        return {
          value: childrenWrap(function (el, i) {
            return i ? 'visible' : 'hidden';
          }),
          duration: duration
        };
      }
      return {
        value: childrenWrap(function () {
          return 'visible';
        }),
        duration: duration
      };
    }),
    width: childrens.map(function (v, keyframeIndex) {
      if (keyframeIndex === childrens.length - 1) {
        return {
          value: parentWrap(function () {
            return widthList[0];
          }),
          duration: duration
        };
      }
      return {
        value: parentWrap(function () {
          return widthList[keyframeIndex + 1];
        }),
        duration: duration
      };
    }),
    easing: 'easeInOutQuart',
    duration: duration,
    delay: delay,
    loop: loop
  };
};

var push = function (_ref) {
  var target = _ref.target,
      delay = _ref.delay,
      duration = _ref.duration,
      loop = _ref.loop;

  var childrens = Array.from(target.children);
  var getWidthList = function getWidthList(target) {
    var container = target.cloneNode(true);
    container.style.display = 'inline-block';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);
    var widthList = Array.from(container.children).map(function (node) {
      return node.offsetWidth;
    });
    document.body.removeChild(container);
    return widthList;
  };
  var widthList = getWidthList(target);
  var clientHeight = target.clientHeight;
  // console.log(widthList);
  var childrenWrap = function childrenWrap(fn) {
    return function (el, i) {
      if (el !== target) {
        return fn(el, i - 1);
      }
      return undefined;
    };
  };
  var parentWrap = function parentWrap(fn) {
    return function (el, i) {
      if (el === target) {
        return fn(el, i);
      }
      return undefined;
    };
  };
  return {
    targets: [target].concat(toConsumableArray(childrens)),
    translateY: childrens.map(function (v, keyframeIndex) {
      var value = childrenWrap(function () {
        return clientHeight * (keyframeIndex + 1) * -1;
      });
      if (keyframeIndex === childrens.length - 1) {
        value = childrenWrap(function (el, i) {
          return i ? clientHeight * (keyframeIndex + 1) * -1 : 0;
        });
      }
      if (keyframeIndex === childrens.length - 2) {
        value = childrenWrap(function (el, i) {
          return i ? clientHeight * (keyframeIndex + 1) * -1 : clientHeight;
        });
      }
      return {
        value: value,
        duration: duration
      };
    }),
    visibility: childrens.map(function (v, keyframeIndex) {
      if (keyframeIndex === childrens.length - 2) {
        return {
          value: childrenWrap(function (el, i) {
            return i ? 'visible' : 'hidden';
          }),
          duration: duration
        };
      }
      return {
        value: childrenWrap(function () {
          return 'visible';
        }),
        duration: duration
      };
    }),
    width: childrens.map(function (v, keyframeIndex) {
      if (keyframeIndex === childrens.length - 1) {
        return {
          value: parentWrap(function () {
            return widthList[0];
          }),
          duration: duration
        };
      }
      return {
        value: parentWrap(function () {
          return widthList[keyframeIndex + 1];
        }),
        duration: duration
      };
    }),
    duration: duration,
    delay: delay,
    loop: loop
  };
};

var singeFade = (function (translate) {
  return function (_ref) {
    var target = _ref.target,
        duration = _ref.duration,
        loop = _ref.loop,
        delay = _ref.delay;

    return _extends({
      targets: target
    }, translate, {
      opacity: 0,
      duration: duration || 2000,
      easing: 'linear',
      direction: 'reverse',
      loop: loop || false,
      delay: delay
    });
  };
});

var singeZoom = (function (_ref) {
  var target = _ref.target,
      duration = _ref.duration,
      loop = _ref.loop,
      delay = _ref.delay;

  return {
    targets: target,
    scale: [1, 0],
    opacity: 0,
    duration: duration || 2000,
    easing: 'easeInOutQuart',
    direction: 'reverse',
    loop: loop || false,
    delay: delay
  };
});

var bounce = (function (_ref) {
  var target = _ref.target,
      duration = _ref.duration,
      loop = _ref.loop,
      delay = _ref.delay;

  return {
    targets: target,
    scale: [1.2, 0.8, 1, 0.5],
    duration: duration || 2000,
    // easing: 'linear',
    direction: 'reverse',
    loop: loop || false,
    delay: delay
  };
});

var swing = (function (_ref) {
  var target = _ref.target,
      duration = _ref.duration,
      loop = _ref.loop,
      delay = _ref.delay;

  target.style.transformOrigin = 'top center';
  return {
    targets: target,
    rotateZ: [15, -10, 5, -5, 0],
    duration: duration || 2000,
    easing: 'linear',
    direction: 'reverse',
    loop: loop || false,
    delay: delay
  };
});

// @create-index

var match = (function (isMultiple, mode) {
  if (!isMultiple) {
    var _match = {
      typewrite: typewrite,
      fadeDown: singeFade({
        translateY: 20
      }),
      fadeTop: singeFade({
        translateY: -20
      }),
      fadeLeft: singeFade({
        translateX: 20
      }),
      fadeRight: singeFade({
        translateX: -20
      }),
      zoom: singeZoom,
      bounce: bounce,
      swing: swing
    };
    return _match[mode];
  }
  var match = {
    slider: slider,
    fade: fade,
    rotate: rotate,
    push: push
  };
  return match[mode];
});

var _dec;
var _dec2;
var _dec3;
var _dec4;
var _class;

var AnimateText = (_dec = As.styleable(classes), _dec2 = As.eventable(events), _dec3 = As.stateable(), _dec4 = As.register(namespace, {
  defaults: defaults,
  methods: methods,
  dependencies: dependencies
}, info), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function (_Plugin) {
  inherits(AnimateText, _Plugin);

  function AnimateText(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, AnimateText);

    var _this = possibleConstructorReturn(this, (AnimateText.__proto__ || Object.getPrototypeOf(AnimateText)).call(this, namespace, element));

    _this.options = $.extend(true, {}, defaults, options, _this.getDataOptions());
    _this.initClasses(classes);
    _this.initStates();
    _this.initialize();
    return _this;
  }

  createClass(AnimateText, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.bind();
      var options = ['mode', 'loop', 'delay', 'duration'].reduce(function (newOptions, key) {
        return _extends({}, newOptions, defineProperty({}, key, _this2.options[key]));
      }, { target: this.element });
      var getAnimeConfigByOptions = function getAnimeConfigByOptions(options) {
        var mode = options.mode,
            animeOptions = objectWithoutProperties(options, ['mode']);

        if (mode === 'custom') {
          return _this2.options.scripts;
        }
        var isMultiple = Boolean(_this2.element.children.length);
        if (isMultiple) {
          _this2.$element.addClass(_this2.classes.CONTAINER);
        }
        var animeGateWay = match(isMultiple, mode);
        return animeGateWay(animeOptions);
      };
      var animeConfig = getAnimeConfigByOptions(options);
      anime(animeConfig);
      this.enter('initialized');
      this.trigger(events.READY);
    }
  }, {
    key: 'render',
    value: function render(dom) {
      this.element.textContent = '';
      this.element.append(dom);
    }
  }, {
    key: 'bind',
    value: function bind() {
      this.$element.on(this.eventName('click touch'), function () {
        return false;
      });
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.$element.off(this.eventName());
    }
  }, {
    key: 'enable',
    value: function enable() {
      if (this.is('disabled')) {
        this.leave('disabled');
      }
      this.trigger(events.ENABLE);
    }
  }, {
    key: 'disable',
    value: function disable() {
      if (!this.is('disabled')) {
        this.enter('disabled');
      }

      this.trigger(events.DISABLE);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.is('initialized')) {
        this.unbind();

        this.leave('initialized');
      }

      this.trigger(events.DESTROY);
      get(AnimateText.prototype.__proto__ || Object.getPrototypeOf(AnimateText.prototype), 'destroy', this).call(this);
    }
  }]);
  return AnimateText;
}(As.Plugin)) || _class) || _class) || _class) || _class);

return AnimateText;

})));
