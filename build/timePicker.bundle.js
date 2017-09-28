(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('As')) :
	typeof define === 'function' && define.amd ? define(['jquery', 'As'], factory) :
	(global.timePicker = factory(global.jquery,global.As));
}(this, (function ($,As) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

var namespace = 'timePicker';

var events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change'
};

var classes = {
  NAMESPACE: 'as-' + namespace,
  THEME: '{namespace}--{theme}',
  WRAP: '{namespace}-wrap'
};

var methods = ['enable', 'disable', 'destroy', 'get', 'val', 'set', 'timeLimit', 'observeOtherTimePicker'];

var defaults = {
  value: null,
  name: 'time-picker',
  use24HourFormat: true,
  placeholder: 'Select Time',
  maxTime: '',
  minTime: '',
  step: 30
};

var dependencies = ['dropdown'];

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

var compose = As.util.compose;

// time2AST :: String -> AST

var time2AST = function time2AST(time) {
  var _time$split = time.split(' '),
      _time$split2 = slicedToArray(_time$split, 2),
      pureTime = _time$split2[0],
      format = _time$split2[1];

  var _pureTime$split = pureTime.split(':'),
      _pureTime$split2 = slicedToArray(_pureTime$split, 2),
      hour = _pureTime$split2[0],
      min = _pureTime$split2[1];

  return {
    hour: Number(hour),
    min: Number(min),
    format: format
  };
};

// parseTimeAST :: AST -> String
var parseTimeAST = function parseTimeAST(timeAST) {
  var hour = timeAST.hour,
      min = timeAST.min,
      format = timeAST.format;

  var isGtTen = function isGtTen(n) {
    return n >= 10 ? n : '0' + n;
  };
  return isGtTen(hour) + ':' + isGtTen(min) + (format ? ' ' + format : '');
};

// timeAST2Minute :: AST -> minute
var timeAST2Minute = function timeAST2Minute(AST) {
  var hour = AST.hour,
      min = AST.min,
      format = AST.format;

  switch (format) {
    case 'AM':
      {
        return hour * 60 + min;
      }

    case 'PM':
      {
        return (hour + 12) * 60 + min;
      }

    default:
      {
        return hour * 60 + min;
      }
  }
};

// minute2TimeAST :: minute -> AST
var minute2TimeAST = function minute2TimeAST(minute) {
  var hour = Math.floor(minute / 60);
  var min = minute - hour * 60;
  return {
    hour: hour,
    min: min
  };
};

var time2Minute = compose(timeAST2Minute, time2AST);

// convertTo12HourFormat :: { hour, min } -> { hour, min, format }
var convertTo12HourFormat = function convertTo12HourFormat(timeAST) {
  var hour = timeAST.hour;

  if (hour > 12) {
    return _extends({}, timeAST, {
      format: 'PM'
    });
  }
  return _extends({}, timeAST, {
    format: 'AM'
  });
};

// splitTime :: Number || function -> timeList
var splitTime = function splitTime(step, range) {
  var point = function point(i) {
    if (typeof step === 'function') {
      return step(i);
    }
    return Number(step);
  };
  var getTimeList = function getTimeList() {
    var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 24 * 60];
    var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var _range = slicedToArray(range, 2),
        minTime = _range[0],
        maxTime = _range[1];

    if (maxTime < minTime) {
      return result;
    }
    var nextPoint = point(index);
    var nextTotal = maxTime - nextPoint;
    var nextTimeNode = result.length ? result[result.length - 1] + nextPoint : minTime;
    return getTimeList([minTime, nextTotal], [].concat(toConsumableArray(result), [nextTimeNode]), index++);
  };
  return getTimeList(range);
};

// formatTime :: (boolean, timeList) -> timeList
var formatTime = function formatTime(use24HourFormat, timeList) {
  if (!use24HourFormat) {
    return timeList.map(compose(parseTimeAST, convertTo12HourFormat, minute2TimeAST));
  }

  return timeList.map(compose(parseTimeAST, minute2TimeAST));
};

var _dec;
var _dec2;
var _dec3;
var _dec4;
var _dec5;
var _class;

var TimePicker = (_dec = As.themeable(), _dec2 = As.styleable(classes), _dec3 = As.eventable(events), _dec4 = As.stateable(), _dec5 = As.register(namespace, {
  defaults: defaults,
  methods: methods,
  dependencies: dependencies
}, info), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = function (_Plugin) {
  inherits(TimePicker, _Plugin);

  function TimePicker(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, TimePicker);

    var _this = possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, namespace, element));

    _this.options = $.extend(true, {}, defaults, options, _this.getDataOptions());
    _this.initClasses(classes);
    if (_this.options.theme) {
      _this.$element.addClass(_this.getThemeClass());
    }
    _this.$element.addClass(_this.classes.NAMESPACE);
    _this.$element.parent().addClass(_this.classes.WRAP);
    _this.initStates();
    _this.initialize();
    return _this;
  }

  createClass(TimePicker, [{
    key: 'initialize',
    value: function initialize() {
      this.$element.parent().addClass('timepicker-wrap');
      var dropdownConf = {
        data: this.getTimeList().map(function (value) {
          return {
            label: value
          };
        }),
        placeholder: this.options.placeholder,
        placement: 'bottom-left',
        icon: 'icon-char icon-oclock',
        imitateSelect: true,
        inputLabel: true,
        hideOutClick: true
      };
      this.dropdown = this.$element.asDropdown(dropdownConf).data('dropdown');
      this.bind();
      this.enter('initialized');
      this.trigger(events.READY);
    }
  }, {
    key: 'getTimeList',
    value: function getTimeList() {
      var _options = this.options,
          use24HourFormat = _options.use24HourFormat,
          maxTime = _options.maxTime,
          minTime = _options.minTime,
          step = _options.step;

      var max = maxTime ? time2Minute(maxTime) : 1440;
      var min = minTime ? time2Minute(minTime) : 0;
      var timeList = splitTime(step, [min, max]);
      return formatTime(use24HourFormat, timeList);
    }
  }, {
    key: 'timeLimit',
    value: function timeLimit(_ref) {
      var minTime = _ref.minTime,
          maxTime = _ref.maxTime;

      this.options.minTime = minTime;
      this.options.maxTime = maxTime;
      var data = this.getTimeList();
      this.$element.asDropdown('replaceByData', data.map(function (value) {
        return {
          label: value
        };
      }));
    }
  }, {
    key: 'observeOtherTimePicker',
    value: function observeOtherTimePicker(el) {
      var _this2 = this;

      el.on('dropdown:change', function (e, i) {
        _this2.timeLimit({
          minTime: i.value
        });
      });
      this.$element.on('dropdown:change', function (e, i) {
        el.asTimePicker('timeLimit', {
          maxTime: i.value
        });
      });
    }
  }, {
    key: 'get',
    value: function get$$1() {
      return this.val();
    }
  }, {
    key: 'set',
    value: function set$$1(v) {
      this.val(v);
    }
  }, {
    key: 'val',
    value: function val(v) {
      return this.input.val(v);
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
      var _this3 = this;

      this.$element.on('dropdown:change', function () {
        return _this3.trigger(events.CHANGE);
      });
      this.$element.on('input', function () {
        return _this3.trigger(events.CHANGE);
      });
      this.input = this.$element.find('input');
      this.input.attr('name', this.options.name);
      this.mask = this.input.asInputMask({
        type: 'time'
      });
      if (this.options.value) {
        this.val(this.options.value);
      }
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.$element.off('dropdown:change');
      this.$element.off('input');
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
      get(TimePicker.prototype.__proto__ || Object.getPrototypeOf(TimePicker.prototype), 'destroy', this).call(this);
    }
  }]);
  return TimePicker;
}(As.Plugin)) || _class) || _class) || _class) || _class) || _class);

return TimePicker;

})));
