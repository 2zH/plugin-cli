(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('As')) :
	typeof define === 'function' && define.amd ? define(['jquery', 'As'], factory) :
	(global.tableSort = factory(global.jquery,global.As));
}(this, (function ($,As) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;
var As__default = 'default' in As ? As['default'] : As;

var namespace = 'tableSort';

var events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
};

var classes = {
  NAMESPACE: 'as-' + namespace
};

var methods = ['init', 'enable', 'disable', 'destroy', 'append', 'replace', 'sort'];

var defaults = {
  icons: {
    sort: 'icon-sort',
    asc: 'icon-sort-ascending',
    desc: 'icon-sort-descending'
  }
};

var info = {
  version: '0.0.1'
};

var stringCompare = function stringCompare(index) {
  return function (currentElement, nextElement) {
    var a = currentElement[index].textContent;
    var b = nextElement[index].textContent;
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  };
};

var intCompare = function intCompare(index) {
  return function (currentElement, nextElement) {
    var a = currentElement[index].textContent;
    var b = nextElement[index].textContent;
    return parseInt(a, 10) - parseInt(b, 10);
  };
};

var floatCompare = function floatCompare(index) {
  return function (currentElement, nextElement) {
    var a = currentElement[index].textContent;
    var b = nextElement[index].textContent;
    return parseFloat(a) - parseFloat(b);
  };
};

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

var _dec;
var _dec2;
var _dec3;
var _dec4;
var _dec5;
var _class;

var _As$util = As__default.util;
var compose = _As$util.compose;
var curry = _As$util.curry;


var Store = function () {
  function Store() {
    var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Store);

    this.__store = store;
  }

  createClass(Store, [{
    key: 'set',
    value: function set$$1(key, value) {
      this.__store[key] = value;
    }
  }, {
    key: 'get',
    value: function get$$1(key) {
      return this.__store[key];
    }
  }], [{
    key: 'of',
    value: function of(store) {
      return new Store(store);
    }
  }]);
  return Store;
}();

var TableSort = (_dec = As.themeable(), _dec2 = As.styleable(classes), _dec3 = As.eventable(events), _dec4 = As.stateable(), _dec5 = As.register(namespace, {
  defaults: defaults,
  methods: methods
}, info), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = function (_Plugin) {
  inherits(TableSort, _Plugin);

  function TableSort(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, TableSort);

    var _this = possibleConstructorReturn(this, (TableSort.__proto__ || Object.getPrototypeOf(TableSort)).call(this, defaults, element));

    _this.beforeSort = [];
    _this.afterSore = [];
    _this._compare = false;

    _this.options = $.extend(true, {}, defaults, options, _this.getDataOptions());
    _this.initClasses(classes);
    _this.$element.addClass(_this.classes.NAMESPACE);
    _this.initStates();
    _this.initialize();
    return _this;
  }

  createClass(TableSort, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.initState();
      if (this.options.icons) {
        var createIconElement = function createIconElement(iconName) {
          var el = document.createElement('i');
          el.setAttribute('class', iconName);
          return el;
        };
        this.hashMap.get('keyNode').map(function (el) {
          return el.appendChild(createIconElement(_this2.options.icons.sort));
        });
      }
      this.initEvent();
      this.bind();
      this.enter('initialized');
      this.trigger(events.READY);
    }
  }, {
    key: 'initState',
    value: function initState() {
      var element = this.element;
      var hashMap = Store.of();
      var keyNode = [].concat(toConsumableArray(element.querySelector('thead > tr').children));
      var keys = keyNode.map(function (node) {
        return node.textContent;
      });
      var types = keyNode.map(function (node) {
        return node.dataset.type;
      });
      hashMap.set('keys', keys);
      hashMap.set('keyNode', keyNode);
      hashMap.set('types', types);
      var data = [].concat(toConsumableArray(element.querySelector('tbody').children)).map(function (tr, index) {
        var subDom = [].concat(toConsumableArray(tr.children));
        hashMap.set(index, subDom);
        return subDom;
      });
      this.hashMap = hashMap;
      this._data = data;
    }
  }, {
    key: 'initEvent',
    value: function initEvent() {
      var _this3 = this;

      this.hashMap.get('keyNode').map(function (node, index) {
        if (node.dataset.type) {
          return node.addEventListener('click', function () {
            return _this3.sort({
              index: index
            });
          });
        }
        return false;
      });
    }
  }, {
    key: 'render',
    value: function render(nextData) {
      var oldChildren = this.element.querySelector('tbody');
      var newChildren = document.createElement('tbody');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nextData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var childrens = _step.value;

          var item = document.createElement('tr');
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = childrens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var children = _step2.value;

              item.appendChild(children);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          newChildren.appendChild(item);
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

      this.element.replaceChild(newChildren, oldChildren);
    }
  }, {
    key: 'format',
    value: function format(data, config) {
      var _this4 = this;

      if (typeof config === 'function') {
        var customCompareFn = config;
        return data.sort(customCompareFn);
      }
      var key = config.key,
          direction = config.direction;

      var getType = function getType(key) {
        return _this4.hashMap.get('types')[key];
      };
      var getCompareByDirection = curry(function (direction, fn) {
        if (direction === 'desc') {
          return function (a, b) {
            return fn(b, a);
          };
        }
        return fn;
      });
      var getCompareByKey = function getCompareByKey(key) {
        var type = getType(key);
        switch (type) {
          case 'string':
            return stringCompare(key);
          case 'int':
            return intCompare(key);
          case 'float':
            return floatCompare(key);
          default:
            return false;
        }
      };
      var getCompare = compose(getCompareByDirection(direction), getCompareByKey);
      var result = data.sort(getCompare(key));
      return result;
    }
  }, {
    key: 'sort',
    value: function sort(config) {
      var Dataset = function () {
        function Dataset(eles) {
          classCallCheck(this, Dataset);

          this.childrens = eles;
        }

        createClass(Dataset, [{
          key: 'map',
          value: function map(direction, key) {
            var eles = this.childrens;
            var node = eles[key];
            node.dataset.direction = direction;
            return Dataset.of(eles);
          }
        }, {
          key: 'clear',
          value: function clear() {
            var eles = this.childrens;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = eles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var ele = _step3.value;

                ele.dataset.direction = '';
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            return Dataset.of(eles);
          }
        }], [{
          key: 'of',
          value: function of(eles) {
            return new Dataset(eles);
          }
        }]);
        return Dataset;
      }();
      var columnNameList = this.hashMap.get('keyNode');
      var isDesc = function isDesc(node) {
        return node.dataset.direction === 'desc';
      };
      if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
        var index = config.index;
        var direction = config.direction || isDesc(columnNameList[index]) ? 'asc' : 'desc';
        this.data = this.format(this.data, {
          key: index,
          direction: direction
        });
        Dataset.of(columnNameList).clear().map(direction, index);
        if (this.options.icons) {
          columnNameList[index].querySelector('i').setAttribute('class', this.options.icons[direction]);
        }
      } else if (typeof config === 'function') {
        var customCompareFn = config;
        this.data = this.format(this.data, customCompareFn);
        Dataset.of(columnNameList).clear();
      }
    }
  }, {
    key: 'setCompare',
    value: function setCompare(fn) {
      this._compare = fn;
    }
  }, {
    key: 'append',
    value: function append(data) {
      var _this5 = this;

      var length = this.element.querySelector('tbody').children.length;
      var mapper = this.mapJsonToData(data);
      mapper.map(function (column, index) {
        return _this5.hashMap.set(length + index, column);
      });
      var nextData = [].concat(toConsumableArray(this.data), toConsumableArray(mapper));
      this.data = nextData;
    }
  }, {
    key: 'replace',
    value: function replace(data) {
      var _this6 = this;

      var mapper = this.mapJsonToData(data);
      mapper.map(function (column, index) {
        return _this6.hashMap.set(index, column);
      });
      this.data = mapper;
    }
  }, {
    key: 'mapJsonToData',
    value: function mapJsonToData(data) {
      var keys = this.hashMap.get('keys');
      return data.map(function (column) {
        return Object.entries(column).reduce(function (initState, _ref) {
          var _ref2 = slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          var index = keys.indexOf(key);
          var dom = document.createElement('td');
          if (value instanceof HTMLElement) {
            dom.appendChild(value);
          } else {
            dom.textContent = value;
          }
          var nextState = initState;
          nextState[index] = dom;
          return nextState;
        }, []);
      });
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
      get(TableSort.prototype.__proto__ || Object.getPrototypeOf(TableSort.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'data',
    get: function get$$1() {
      return this._data;
    },
    set: function set$$1(value) {
      this.render(value);
      this._data = value;
    }
  }]);
  return TableSort;
}(As.Plugin)) || _class) || _class) || _class) || _class) || _class);

return TableSort;

})));
