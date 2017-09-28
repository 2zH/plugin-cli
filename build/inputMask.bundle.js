(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('As')) :
	typeof define === 'function' && define.amd ? define(['jquery', 'As'], factory) :
	(global.inputMask = factory(global.jquery,global.As));
}(this, (function ($,As) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;
var As__default = 'default' in As ? As['default'] : As;

var namespace = 'inputMask';

var events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
};

var methods = ['enable', 'disable', 'destroy'];

var defaults = {
  type: 'custom',
  delimiter: '',
  blocks: 'noLimit'
};

var info = {
  version: '0.0.1'
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

var curry = As__default.util.curry;


var Model = function () {
  function Model(data) {
    classCallCheck(this, Model);

    this.__value = data;
  }
  // value1 -> func -> func -> value2


  createClass(Model, [{
    key: 'isNothing',
    value: function isNothing() {
      return !this.__value;
    }
  }, {
    key: 'join',
    value: function join() {
      return this.isNothing() ? '' : this.__value;
    }
  }, {
    key: 'map',
    value: function map(f) {
      return Model.of(f(this.__value));
    }
  }, {
    key: 'chain',
    value: function chain(f) {
      return this.map(f).join();
    }
  }], [{
    key: 'of',
    value: function of(data) {
      return new Model(data);
    }
  }]);
  return Model;
}();

var map = curry(function (f, functor) {
  return functor.map(f);
});

var chain = curry(function (f, monad) {
  return monad.chain(f);
});

var reduce = curry(function (f, v) {
  return v.reduce(f);
});

var _As$util = As__default.util;
var compose$1 = _As$util.compose;
var curry$1 = _As$util.curry;


var getRange = curry$1(function (blocks, index) {
  if (!index) {
    return [0, blocks[index]];
  }

  var min = index >= 2 ? blocks.filter(function (v, i) {
    return i < index;
  }).reduce(function (a, b) {
    return a + b;
  }) : blocks[index - 1];

  var max = blocks.filter(function (v, i) {
    return i <= index;
  }).reduce(function (a, b) {
    return a + b;
  });
  return [min, max];
});

var sum = function sum(a, b) {
  return a + b;
};

var computeLens = compose$1(map(reduce(sum)), Model.of);

// baseFormat :: config => String
var baseFormat = curry$1(function (_ref, data) {
  var blocks = _ref.blocks,
      delimiter = _ref.delimiter;

  var range = getRange(blocks);
  var blockLens = computeLens(blocks).join();
  return blocks.map(function (v, k) {
    return data.slice.apply(data, toConsumableArray(range(k)));
  }).filter(Boolean).join(delimiter).concat(data.slice(blockLens));
});

var timeFormat = function timeFormat(formattedData) {
  return formattedData.slice(0, 5) + ' ' + formattedData.slice(5);
};

var lensLimit = curry$1(function (length, data) {
  if (data.length > length) {
    return data.slice(0, length);
  }
  return data;
});

var isNumber = function isNumber(data) {
  var result = !isNaN(Number(data.slice(-1)));
  return result;
};

var getNumberByStrRange = curry$1(function (data, min, max) {
  if (data.length > min + 1) {
    return Number(data.slice(min, max));
  }
  return Number(data[min] + '0');
});

var dateLimit = function dateLimit(data) {
  var backspace = data.slice(0, -1);
  var range = getNumberByStrRange(data);
  var mm = range(4, 6);
  var dd = range(6, 8);
  // check isNumber
  if (!isNumber(data)) {
    return backspace;
  }

  // check mm
  if (mm && mm > 12) {
    return backspace;
  }

  // check dd
  if (dd && dd > 31) {
    return backspace;
  }

  return data;
};

var timeLimit = curry$1(function (hourFormat, data) {
  var type = ['AM', 'PM'];
  var time = data.slice(0, 4);
  var range = getNumberByStrRange(time);
  var min = range(0, 2);
  var sec = range(2, 4);
  var is12Hour = hourFormat === '12';
  var backspace = data.slice(0, -1);

  // check isNumber
  if (!isNumber(time)) {
    return backspace;
  }

  if (sec && sec > 60) {
    return backspace;
  }

  if (!is12Hour) {
    if (min > 24) {
      return backspace;
    }
    return data;
  }

  if (min > 12) {
    return backspace;
  }

  var unit = data.slice(4).toUpperCase();

  // check string limit
  if (unit.length === 1 && type.map(function (v) {
    return v[0];
  }).find(function (v) {
    return v === unit;
  })) {
    return time + unit;
  }

  if (unit.length === 2) {
    if (type.find(function (v) {
      return v === unit;
    })) {
      return time + unit;
    }
    return time + unit[0];
  }

  return time;
});

var _dec;
var _dec2;
var _dec3;
var _class;

var compose = As__default.util.compose;
var InputMask = (_dec = As.eventable(events), _dec2 = As.stateable(), _dec3 = As.register(namespace, {
  defaults: defaults,
  methods: methods
}, info), _dec(_class = _dec2(_class = _dec3(_class = function (_Plugin) {
  inherits(InputMask, _Plugin);

  function InputMask(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, InputMask);

    var _this = possibleConstructorReturn(this, (InputMask.__proto__ || Object.getPrototypeOf(InputMask)).call(this, namespace, element));

    _this.options = $.extend(true, {}, defaults, options, _this.getDataOptions());
    _this.data = '';
    _this.initStates();
    _this.initialize();
    return _this;
  }

  createClass(InputMask, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.bind();
      this.lastValue = '';
      var options = this.match(this.options.type);

      var input = function input(newData) {
        if (_this2.data.length && _this2._hasBackspace) {
          _this2._hasBackspace = false;
          return Model.of(_this2.data.slice(0, -1));
        }
        return Model.of(_this2.data + newData);
      };

      var updateMiddleware = function updateMiddleware(options) {
        var type = options.type,
            blocks = options.blocks;

        var lens = computeLens(blocks).join();
        switch (type) {
          case 'time':
            {
              var _format = options.format;

              var timeLens = _format === '12' ? lens + 2 : lens;
              return compose(timeLimit(_format), lensLimit(timeLens));
            }
          case 'date':
            {
              return compose(dateLimit, lensLimit(lens));
            }
          default:
            {
              return lensLimit(lens);
            }
        }
      };

      var formatMiddleware = function formatMiddleware(options) {
        var type = options.type;

        switch (type) {
          case 'time':
            {
              return compose(timeFormat, baseFormat(options));
            }
          default:
            {
              return baseFormat(options);
            }
        }
      };

      // update :: String -> monad
      var update = compose(chain(updateMiddleware(options)), input);

      // getFormattedData :: {} -> String
      var format = compose(chain(formatMiddleware(options)), Model.of);
      this.onChange = function (event) {
        var data = event.target.value.slice(_this2.lastValue.length);
        _this2.data = update(data);
        return _this2.element.value = format(_this2.data);
      };
      this.observe();
      this.enter('initialized');
      this.trigger(events.READY);
    }
  }, {
    key: 'observe',
    value: function observe() {
      var _this3 = this;

      var getLastValue = function getLastValue(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 8) {
          _this3._hasBackspace = true;
        }
        _this3.lastValue = e.target.value;
      };
      this.element.addEventListener('keydown', getLastValue, false);
      this.element.addEventListener('input', this.onChange, false);
      this.hasObserve = true;
    }
  }, {
    key: 'unObserve',
    value: function unObserve() {
      if (this.hasObserve) {
        this.element.removeEventListener('input', this.onChange, false);
        this.hasObserve = false;
      }
    }
  }, {
    key: 'match',
    value: function match(type) {
      switch (type) {
        default:
          {
            return {
              type: type,
              blocks: this.options.blocks,
              delimiter: this.options.delimiter
            };
          }
        case 'time':
          {
            return {
              type: type,
              delimiter: ':',
              blocks: [2, 2],
              format: this.options.hours
            };
          }
        case 'card':
          {
            return {
              type: type,
              delimiter: ' ',
              blocks: [4, 4, 4, 4]
            };
          }
        case 'date':
          {
            return {
              type: type,
              delimiter: '/',
              blocks: [4, 2, 2]
            };
          }
      }
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
      this.unObserve();
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
      get(InputMask.prototype.__proto__ || Object.getPrototypeOf(InputMask.prototype), 'destroy', this).call(this);
    }
  }]);
  return InputMask;
}(As.Plugin)) || _class) || _class) || _class);

return InputMask;

})));
