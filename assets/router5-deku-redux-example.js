/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var slice = __webpack_require__(88)
	var flatten = __webpack_require__(87)

	/**
	 * This function lets us create virtual nodes using a simple
	 * syntax. It is compatible with JSX transforms so you can use
	 * JSX to write nodes that will compile to this function.
	 *
	 * let node = element('div', { id: 'foo' }, [
	 *   element('a', { href: 'http://google.com' }, 'Google')
	 * ])
	 *
	 * You can leave out the attributes or the children if either
	 * of them aren't needed and it will figure out what you're
	 * trying to do.
	 */

	module.exports = element

	/**
	 * Create virtual trees of components.
	 *
	 * This creates the nicer API for the user.
	 * It translates that friendly API into an actual tree of nodes.
	 *
	 * @param {*} type
	 * @param {Object} attributes
	 * @param {Array} children
	 * @return {Object}
	 * @api public
	 */

	function element (type, attributes, children) {
	  // Default to div with no args
	  if (!type) {
	    throw new TypeError('element() needs a type.')
	  }

	  // Skipped adding attributes and we're passing
	  // in children instead.
	  if (arguments.length === 2 && (typeof attributes === 'string' || Array.isArray(attributes))) {
	    children = [ attributes ]
	    attributes = {}
	  }

	  // Account for JSX putting the children as multiple arguments.
	  // This is essentially just the ES6 rest param
	  if (arguments.length > 2) {
	    children = slice(arguments, 2)
	  }

	  children = children || []
	  attributes = attributes || {}

	  // Flatten nested child arrays. This is how JSX compiles some nodes.
	  children = flatten(children, 2)

	  // Filter out any `undefined` elements
	  children = children.filter(function (i) { return typeof i !== 'undefined' })

	  // if you pass in a function, it's a `Component` constructor.
	  // otherwise it's an element.
	  return {
	    type: type,
	    children: children,
	    attributes: attributes
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _connect = __webpack_require__(39);

	var _connect2 = _interopRequireDefault(_connect);

	var _storePlugin = __webpack_require__(40);

	var _storePlugin2 = _interopRequireDefault(_storePlugin);

	exports['default'] = { connect: _connect2['default'], storePlugin: _storePlugin2['default'] };
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var actionTypes = {
	    NAVIGATE_TO: 'R5_NAVIGATE',
	    CANCEL_TRANSITION: 'R5_CANCEL',
	    TRANSITION_ERROR: 'R5_TRANSITION_ERROR',
	    TRANSITION_SUCCESS: 'R5_TRANSITION_SUCCESS',
	    TRANSITION_START: 'R5_TRANSITION_START',
	    CLEAR_ERRORS: 'R5_CLEAR_ERRORS'
	};

	exports['default'] = actionTypes;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _router5Middleware = __webpack_require__(71);

	var _router5Middleware2 = _interopRequireDefault(_router5Middleware);

	var _router5Reducer = __webpack_require__(72);

	var _router5Reducer2 = _interopRequireDefault(_router5Reducer);

	var _routeNodeSelector = __webpack_require__(70);

	var _routeNodeSelector2 = _interopRequireDefault(_routeNodeSelector);

	var _actions = __webpack_require__(11);

	var actions = _interopRequireWildcard(_actions);

	var _actionTypes = __webpack_require__(3);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	exports['default'] = {
	    router5Middleware: _router5Middleware2['default'],
	    router5Reducer: _router5Reducer2['default'],
	    actions: actions,
	    actionTypes: _actionTypes2['default'],
	    routeNodeSelector: _routeNodeSelector2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getEmails = getEmails;
	exports.getEmail = getEmail;
	var emails = [{
	    "id": "1",
	    "mailTitle": "Why router5?",
	    "mailMessage": "I imagine a lot of developers who will first see router5 will ask themselves the question: is it yet another router? is it any good? Why oh why do people keep writing new routers all the time? It is not always easy to see the potential of something straight away, or understand the motivations behind. I therefore decided to try to tell you more about router5, why I decided to develop an entire new routing solution, and what problems it tries to solve."
	}, {
	    "id": "2",
	    "mailTitle": "Use with React",
	    "mailMessage": "I have just started playing with it. It does make sense to use a flux-like implementation, to provide a layer between the router and view updates."
	}, {
	    "id": "3",
	    "mailTitle": "Compose a new message",
	    "mailMessage": "Click on compose, start to fill title and message fields and then try to navigate away by clicking on app links, or by using the back button."
	}];

	function getEmails() {
	    return emails;
	}

	function getEmail(id) {
	    var index = undefined;

	    if (emails) {
	        for (index in emails) {
	            if (emails[index].id === id) return emails[index];
	        }
	    }
	    return null;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var type = __webpack_require__(7)

	/**
	 * Returns the type of a virtual node
	 *
	 * @param  {Object} node
	 * @return {String}
	 */

	module.exports = function nodeType (node) {
	  var v = type(node)
	  if (v === 'null' || node === false) return 'empty'
	  if (v !== 'object') return 'text'
	  if (type(node.type) === 'string') return 'element'
	  return 'component'
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/**
	 * toString ref.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }

	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';

	  if (typeof Buffer != 'undefined' && Buffer.isBuffer(val)) return 'buffer';

	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)

	  return typeof val;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Internal helper to bind a function known to have 3 arguments
	 * to a given context.
	 */
	module.exports = function bindInternal3 (func, thisContext) {
	  return function (a, b, c) {
	    return func.call(thisContext, a, b, c);
	  };
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Internal helper to bind a function known to have 4 arguments
	 * to a given context.
	 */
	module.exports = function bindInternal4 (func, thisContext) {
	  return function (a, b, c, d) {
	    return func.call(thisContext, a, b, c, d);
	  };
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict'

	module.exports = function(target) {
	  target = target || {}

	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i]
	    if (!source) continue

	    Object.getOwnPropertyNames(source).forEach(function(key) {
	      if (undefined === target[key])
	        target[key] = source[key]
	    })
	  }

	  return target
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.navigateTo = navigateTo;
	exports.cancelTransition = cancelTransition;
	exports.clearErrors = clearErrors;
	exports.transitionStart = transitionStart;
	exports.transitionSuccess = transitionSuccess;
	exports.transitionError = transitionError;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _actionTypes = __webpack_require__(3);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	function navigateTo(name) {
	    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    return {
	        type: _actionTypes2['default'].NAVIGATE_TO,
	        name: name,
	        params: params,
	        opts: opts
	    };
	}

	function cancelTransition() {
	    return {
	        type: _actionTypes2['default'].CANCEL_TRANSITION
	    };
	}

	function clearErrors() {
	    return {
	        type: _actionTypes2['default'].CLEAR_ERRORS
	    };
	}

	function transitionStart(route, previousRoute) {
	    return {
	        type: _actionTypes2['default'].TRANSITION_START,
	        route: route,
	        previousRoute: previousRoute
	    };
	}

	function transitionSuccess(route, previousRoute) {
	    return {
	        type: _actionTypes2['default'].TRANSITION_SUCCESS,
	        route: route,
	        previousRoute: previousRoute
	    };
	}

	function transitionError(route, previousRoute, transitionError) {
	    return {
	        type: _actionTypes2['default'].TRANSITION_ERROR,
	        route: route,
	        previousRoute: previousRoute,
	        transitionError: transitionError
	    };
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(15);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);
	    var isSubscribed = true;

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(12);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(77);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(76);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(75);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(14);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.defaultMemoize = defaultMemoize;
	exports.createSelectorCreator = createSelectorCreator;
	exports.createSelector = createSelector;
	exports.createStructuredSelector = createStructuredSelector;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function defaultEqualityCheck(a, b) {
	    return a === b;
	}

	function defaultMemoize(func) {
	    var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];

	    var lastArgs = null;
	    var lastResult = null;
	    return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        if (lastArgs !== null && args.every(function (value, index) {
	            return equalityCheck(value, lastArgs[index]);
	        })) {
	            return lastResult;
	        }
	        lastArgs = args;
	        lastResult = func.apply(undefined, args);
	        return lastResult;
	    };
	}

	function getDependencies(funcs) {
	    var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

	    if (!dependencies.every(function (dep) {
	        return typeof dep === 'function';
	    })) {
	        var dependencyTypes = dependencies.map(function (dep) {
	            return typeof dep;
	        }).join(', ');
	        throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
	    }

	    return dependencies;
	}

	function createSelectorCreator(memoize) {
	    for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        memoizeOptions[_key2 - 1] = arguments[_key2];
	    }

	    return function () {
	        for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            funcs[_key3] = arguments[_key3];
	        }

	        var recomputations = 0;
	        var resultFunc = funcs.pop();
	        var dependencies = getDependencies(funcs);

	        var memoizedResultFunc = memoize.apply(undefined, [function () {
	            recomputations++;
	            return resultFunc.apply(undefined, arguments);
	        }].concat(memoizeOptions));

	        var selector = function selector(state, props) {
	            for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	                args[_key4 - 2] = arguments[_key4];
	            }

	            var params = dependencies.map(function (dependency) {
	                return dependency.apply(undefined, [state, props].concat(args));
	            });
	            return memoizedResultFunc.apply(undefined, _toConsumableArray(params));
	        };

	        selector.recomputations = function () {
	            return recomputations;
	        };
	        return selector;
	    };
	}

	function createSelector() {
	    return createSelectorCreator(defaultMemoize).apply(undefined, arguments);
	}

	function createStructuredSelector(selectors) {
	    var selectorCreator = arguments.length <= 1 || arguments[1] === undefined ? createSelector : arguments[1];

	    if (typeof selectors !== 'object') {
	        throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
	    }
	    var objectKeys = Object.keys(selectors);
	    return selectorCreator(objectKeys.map(function (key) {
	        return selectors[key];
	    }), function () {
	        for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	            values[_key5] = arguments[_key5];
	        }

	        return values.reduce(function (composition, value, index) {
	            composition[objectKeys[index]] = value;
	            return composition;
	        }, {});
	    });
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var constants = {
	    ROUTER_NOT_STARTED: 'NOT_STARTED',
	    ROUTER_ALREADY_STARTED: 'ALREADY_STARTED',
	    ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
	    SAME_STATES: 'SAME_STATES',
	    CANNOT_DEACTIVATE: 'CANNOT_DEACTIVATE',
	    CANNOT_ACTIVATE: 'CANNOT_ACTIVATE',
	    TRANSITION_ERR: 'TRANSITION_ERR',
	    TRANSITION_CANCELLED: 'CANCELLED'
	};

	exports['default'] = constants;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _pathParser = __webpack_require__(86);

	var _pathParser2 = _interopRequireDefault(_pathParser);

	var isSerialisable = function isSerialisable(val) {
	    return val !== undefined && val !== null && val !== '';
	};

	var removeQueryParamsFromPath = function removeQueryParamsFromPath(path, params) {
	    if (path.indexOf('?') === -1) return path;
	    var splitPath = path.split('?');
	    var pathPart = splitPath[0];
	    var searchPart = splitPath[1];

	    var remainingSearchParams = searchPart.split('&').reduce(function (obj, p) {
	        var splitParam = p.split('=');
	        var key = splitParam[0];
	        var val = decodeURIComponent(splitParam[1]);
	        if (params.indexOf(key) === -1) obj[key] = val || '';
	        return obj;
	    }, {});

	    var remainingSearchPart = Object.keys(remainingSearchParams).map(function (p) {
	        return [p].concat(isSerialisable(remainingSearchParams[p]) ? encodeURIComponent(remainingSearchParams[p]) : []);
	    }).map(function (p) {
	        return p.join('=');
	    }).join('&');

	    return pathPart + (remainingSearchPart ? '?' + remainingSearchPart : '');
	};

	var RouteNode = (function () {
	    function RouteNode() {
	        var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	        var path = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	        var childRoutes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	        _classCallCheck(this, RouteNode);

	        this.name = name;
	        this.path = path;
	        this.parser = path ? new _pathParser2['default'](path) : null;
	        this.children = [];

	        this.add(childRoutes);

	        return this;
	    }

	    _createClass(RouteNode, [{
	        key: 'add',
	        value: function add(route) {
	            var _this = this;

	            if (route === undefined || route === null) return;

	            if (route instanceof Array) {
	                route.forEach(function (r) {
	                    return _this.add(r);
	                });
	                return;
	            }

	            if (!(route instanceof RouteNode) && !(route instanceof Object)) {
	                throw new Error('RouteNode.add() expects routes to be an Object or an instance of RouteNode.');
	            }
	            if (route instanceof Object) {
	                if (!route.name || !route.path) {
	                    throw new Error('RouteNode.add() expects routes to have a name and a path defined.');
	                }
	                route = new RouteNode(route.name, route.path, route.children);
	            }
	            // Check duplicated routes
	            if (this.children.map(function (child) {
	                return child.name;
	            }).indexOf(route.name) !== -1) {
	                throw new Error('Alias "' + route.name + '" is already defined in route node');
	            }
	            // Check duplicated paths
	            if (this.children.map(function (child) {
	                return child.path;
	            }).indexOf(route.path) !== -1) {
	                throw new Error('Path "' + route.path + '" is already defined in route node');
	            }

	            var names = route.name.split('.');

	            if (names.length === 1) {
	                this.children.push(route);
	                // Push greedy spats to the bottom of the pile
	                this.children.sort(function (a, b) {
	                    // '/' last
	                    if (a.path === '/') return 1;
	                    if (b.path === '/') return -1;
	                    var aHasParams = a.parser.hasUrlParams || a.parser.hasSpatParam;
	                    var bHasParams = b.parser.hasUrlParams || b.parser.hasSpatParam;
	                    // No params first, sort by length descending
	                    if (!aHasParams && !bHasParams) {
	                        return a.path && b.path ? a.path.length < b.path.length ? 1 : -1 : 0;
	                    }
	                    // Params last
	                    if (aHasParams && !bHasParams) return 1;
	                    if (!aHasParams && bHasParams) return -1;
	                    // Spat params last
	                    if (!a.parser.hasSpatParam && b.parser.hasSpatParam) return -1;
	                    if (!b.parser.hasSpatParam && a.parser.hasSpatParam) return 1;
	                    // Sort by number of segments descending
	                    var aSegments = (a.path.match(/\//g) || []).length;
	                    var bSegments = (b.path.match(/\//g) || []).length;
	                    if (aSegments < bSegments) return 1;
	                    return 0;
	                });
	            } else {
	                // Locate parent node
	                var segments = this.getSegmentsByName(names.slice(0, -1).join('.'));
	                if (segments) {
	                    segments[segments.length - 1].add(new RouteNode(names[names.length - 1], route.path, route.children));
	                } else {
	                    throw new Error('Could not add route named \'' + route.name + '\', parent is missing.');
	                }
	            }

	            return this;
	        }
	    }, {
	        key: 'addNode',
	        value: function addNode(name, params) {
	            this.add(new RouteNode(name, params));
	            return this;
	        }
	    }, {
	        key: 'getSegmentsByName',
	        value: function getSegmentsByName(routeName) {
	            var findSegmentByName = function findSegmentByName(name, routes) {
	                var filteredRoutes = routes.filter(function (r) {
	                    return r.name === name;
	                });
	                return filteredRoutes.length ? filteredRoutes[0] : undefined;
	            };
	            var segments = [];
	            var names = routeName.split('.');
	            var routes = this.children;

	            var matched = names.every(function (name) {
	                var segment = findSegmentByName(name, routes);
	                if (segment) {
	                    routes = segment.children;
	                    segments.push(segment);
	                    return true;
	                }
	                return false;
	            });

	            return matched ? segments : null;
	        }
	    }, {
	        key: 'getSegmentsMatchingPath',
	        value: function getSegmentsMatchingPath(path) {
	            var trailingSlash = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            var matchChildren = function matchChildren(nodes, pathSegment, segments) {
	                var _loop = function (i) {
	                    var child = nodes[i];
	                    // Partially match path
	                    var match = child.parser.partialMatch(pathSegment);
	                    var remainingPath = undefined,
	                        remainingSearch = undefined;

	                    if (!match && trailingSlash) {
	                        // Try with optional trailing slash
	                        match = child.parser.match(pathSegment, true);
	                        remainingPath = '';
	                    } else if (match) {
	                        // Remove consumed segment from path
	                        var consumedPath = child.parser.build(match, { ignoreSearch: true });
	                        remainingPath = removeQueryParamsFromPath(pathSegment.replace(consumedPath, ''), child.parser.queryParams);

	                        if (trailingSlash && remainingPath === '/' && !/\/$/.test(consumedPath)) {
	                            remainingPath = '';
	                        }
	                    }

	                    if (match) {
	                        segments.push(child);
	                        Object.keys(match).forEach(function (param) {
	                            return segments.params[param] = match[param];
	                        });
	                        // If fully matched
	                        if (!remainingPath.length) {
	                            return {
	                                v: segments
	                            };
	                        }
	                        // If no children to match against but unmatched path left
	                        if (!child.children.length) {
	                            return {
	                                v: null
	                            };
	                        }
	                        // Else: remaining path and children
	                        return {
	                            v: matchChildren(child.children, remainingPath, segments)
	                        };
	                    }
	                };

	                // for (child of node.children) {
	                for (var i in nodes) {
	                    var _ret = _loop(i);

	                    if (typeof _ret === 'object') return _ret.v;
	                }
	                return null;
	            };

	            var startingNodes = this.parser ? [this] : this.children;
	            var segments = [];
	            segments.params = {};

	            return matchChildren(startingNodes, path, segments);
	        }
	    }, {
	        key: 'getPathFromSegments',
	        value: function getPathFromSegments(segments) {
	            return segments ? segments.map(function (segment) {
	                return segment.path;
	            }).join('') : null;
	        }
	    }, {
	        key: 'getPath',
	        value: function getPath(routeName) {
	            return this.getPathFromSegments(this.getSegmentsByName(routeName));
	        }
	    }, {
	        key: 'buildPathFromSegments',
	        value: function buildPathFromSegments(segments) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            if (!segments) return null;

	            var searchParams = segments.filter(function (s) {
	                return s.parser.hasQueryParams;
	            }).map(function (s) {
	                return s.parser.queryParams;
	            });

	            var searchPart = !searchParams.length ? null : searchParams.reduce(function (queryParams, params) {
	                return queryParams.concat(params);
	            }).filter(function (p) {
	                return Object.keys(params).indexOf(p) !== -1;
	            }).map(function (p) {
	                return _pathParser2['default'].serialise(p, params[p]);
	            }).join('&');

	            return segments.map(function (segment) {
	                return segment.parser.build(params, { ignoreSearch: true });
	            }).join('') + (searchPart ? '?' + searchPart : '');
	        }
	    }, {
	        key: 'getMetaFromSegments',
	        value: function getMetaFromSegments(segments) {
	            var accName = '';

	            return segments.reduce(function (meta, segment, i) {
	                var urlParams = segment.parser.urlParams.reduce(function (params, p) {
	                    params[p] = 'url';
	                    return params;
	                }, {});

	                var allParams = segment.parser.queryParams.reduce(function (params, p) {
	                    params[p] = 'query';
	                    return params;
	                }, urlParams);

	                accName = accName ? accName + '.' + segment.name : segment.name;
	                meta[accName] = allParams;
	                return meta;
	            }, {});
	        }
	    }, {
	        key: 'buildPath',
	        value: function buildPath(routeName) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            return this.buildPathFromSegments(this.getSegmentsByName(routeName), params);
	        }
	    }, {
	        key: 'buildStateFromSegments',
	        value: function buildStateFromSegments(segments) {
	            if (!segments || !segments.length) return null;

	            var name = segments.map(function (segment) {
	                return segment.name;
	            }).join('.');
	            var params = segments.params;

	            return {
	                name: name,
	                params: params,
	                _meta: this.getMetaFromSegments(segments)
	            };
	        }
	    }, {
	        key: 'buildState',
	        value: function buildState(name) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            var segments = this.getSegmentsByName(name);
	            if (!segments || !segments.length) return null;

	            return {
	                name: name,
	                params: params,
	                _meta: this.getMetaFromSegments(segments)
	            };
	        }
	    }, {
	        key: 'matchPath',
	        value: function matchPath(path) {
	            var trailingSlash = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            return this.buildStateFromSegments(this.getSegmentsMatchingPath(path, trailingSlash));
	        }
	    }]);

	    return RouteNode;
	})();

	exports['default'] = RouteNode;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function nameToIDs(name) {
	    return name.split('.').reduce(function (ids, name) {
	        return ids.concat(ids.length ? ids[ids.length - 1] + '.' + name : name);
	    }, []);
	}

	function extractSegmentParams(name, state) {
	    if (!state._meta || !state._meta[name]) return {};

	    return Object.keys(state._meta[name]).reduce(function (params, p) {
	        params[p] = state.params[p];
	        return params;
	    }, {});
	}

	function transitionPath(toState, fromState) {
	    var fromStateIds = fromState ? nameToIDs(fromState.name) : [];
	    var toStateIds = nameToIDs(toState.name);
	    var maxI = Math.min(fromStateIds.length, toStateIds.length);

	    function pointOfDifference() {
	        var i = undefined;

	        var _loop = function () {
	            var left = fromStateIds[i];
	            var right = toStateIds[i];

	            if (left !== right) return {
	                    v: i
	                };

	            var leftParams = extractSegmentParams(left, toState);
	            var rightParams = extractSegmentParams(right, fromState);

	            if (leftParams.length !== rightParams.length) return {
	                    v: i
	                };
	            if (leftParams.length === 0) return 'continue';

	            var different = Object.keys(leftParams).some(function (p) {
	                return rightParams[p] !== leftParams[p];
	            });
	            if (different) {
	                return {
	                    v: i
	                };
	            }
	        };

	        for (i = 0; i < maxI; i += 1) {
	            var _ret = _loop();

	            switch (_ret) {
	                case 'continue':
	                    continue;

	                default:
	                    if (typeof _ret === 'object') return _ret.v;
	            }
	        }

	        return i;
	    }

	    var i = undefined;
	    if (!fromState) {
	        i = 0;
	    } else if (!fromState || toState.name === fromState.name && (!toState._meta || !fromState._meta)) {
	        console.log('[router5.transition-path] Some states are missing metadata, reloading all segments');
	        i = 0;
	    } else {
	        i = pointOfDifference();
	    }

	    var toDeactivate = fromStateIds.slice(i).reverse();
	    var toActivate = toStateIds.slice(i);

	    var intersection = fromState && i > 0 ? fromStateIds[i - 1] : '';

	    return {
	        intersection: intersection,
	        toDeactivate: toDeactivate,
	        toActivate: toActivate
	    };
	}

	exports['default'] = transitionPath;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(90)
	var ieee754 = __webpack_require__(91)
	var isArray = __webpack_require__(92)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer, (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.updateTitle = updateTitle;
	exports.updateMessage = updateMessage;

	function updateTitle(title) {
	    return {
	        type: 'UPDATE_TITLE',
	        title: title
	    };
	}

	function updateMessage(message) {
	    return {
	        type: 'UPDATE_MESSAGE',
	        message: message
	    };
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _Nav = __webpack_require__(32);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _Main = __webpack_require__(30);

	var _Main2 = _interopRequireDefault(_Main);

	var App = {
	    render: function render(_ref) {
	        var props = _ref.props;

	        return (0, _virtualElement2['default'])('div', { 'class': 'mail-client' }, [(0, _virtualElement2['default'])('aside', {}, (0, _virtualElement2['default'])(_Nav2['default'])), (0, _virtualElement2['default'])('main', {}, (0, _virtualElement2['default'])(_Main2['default']))]);
	    }
	};

	exports['default'] = App;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _dekuRedux = __webpack_require__(2);

	var _reselect = __webpack_require__(17);

	var _actionsDraft = __webpack_require__(23);

	var draftSelector = (0, _reselect.createSelector)(function (state) {
	    return state.draft;
	}, function (state) {
	    return state.router;
	}, function (draft, router) {
	    return {
	        title: draft.title,
	        message: draft.message,
	        error: hasCannotDeactivateError(router.transitionError)
	    };
	});

	function hasCannotDeactivateError(error) {
	    return error && error.code === 'CANNOT_DEACTIVATE' && error.segment === 'compose';
	}

	var Compose = {
	    propTypes: {
	        router: { source: 'router' }
	    },

	    intitalState: function intitalState(props) {
	        return { title: '', message: '' };
	    },

	    render: function render(_ref, setState) {
	        var state = _ref.state;
	        var props = _ref.props;
	        var title = props.title;
	        var message = props.message;
	        var error = props.error;
	        var updateTitle = props.updateTitle;
	        var updateMessage = props.updateMessage;
	        var router = props.router;

	        var updateState = function updateState(prop) {
	            return function (evt) {
	                return setState(prop, evt.target.value);
	            };
	        };
	        router.canDeactivate('compose', !title && !message);

	        return (0, _virtualElement2['default'])('div', { 'class': 'compose' }, [(0, _virtualElement2['default'])('h4', {}, 'Compose a new message'), (0, _virtualElement2['default'])('input', { name: 'title', value: title, onChange: updateState('title') }), (0, _virtualElement2['default'])('textarea', { name: 'message', value: message, onChange: updateState('message') }), error ? (0, _virtualElement2['default'])('p', {}, 'Clear inputs before continuing') : null]);
	    }
	};

	exports['default'] = (0, _dekuRedux.connect)(draftSelector, { updateTitle: _actionsDraft.updateTitle, updateMessage: _actionsDraft.updateMessage })(Compose);
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _InboxList = __webpack_require__(28);

	var _InboxList2 = _interopRequireDefault(_InboxList);

	var _Message = __webpack_require__(31);

	var _Message2 = _interopRequireDefault(_Message);

	var _dekuRedux = __webpack_require__(2);

	var _reduxRouter5 = __webpack_require__(4);

	var _api = __webpack_require__(5);

	var Inbox = {
	    displayName: 'Inbox',
	    render: function render(_ref) {
	        var props = _ref.props;
	        var route = props.route;

	        return (0, _virtualElement2['default'])('div', { 'class': 'inbox' }, [(0, _virtualElement2['default'])(_InboxList2['default'], { emails: (0, _api.getEmails)() }), route && route.name === 'inbox.message' ? (0, _virtualElement2['default'])(_Message2['default'], { messageId: route.params.id, key: route.params.id }) : null]);
	    }
	};

	exports['default'] = (0, _dekuRedux.connect)((0, _reduxRouter5.routeNodeSelector)('inbox'))(Inbox);
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var InboxItem = {
	    propTypes: {
	        router: { source: 'router' }
	    },

	    render: function render(_ref) {
	        var props = _ref.props;
	        var mailTitle = props.mailTitle;
	        var mailMessage = props.mailMessage;
	        var router = props.router;
	        var id = props.id;

	        return (0, _virtualElement2['default'])('li', { onClick: function onClick() {
	                return router.navigate('inbox.message', { id: id });
	            } }, [(0, _virtualElement2['default'])('h4', {}, mailTitle), (0, _virtualElement2['default'])('p', {}, mailMessage)]);
	    }
	};

	exports['default'] = InboxItem;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _InboxItem = __webpack_require__(27);

	var _InboxItem2 = _interopRequireDefault(_InboxItem);

	var InboxList = {
	    render: function render(_ref) {
	        var props = _ref.props;

	        return (0, _virtualElement2['default'])('ul', { 'class': 'mail-list' }, props.emails.map(function (mail) {
	            return (0, _virtualElement2['default'])(_InboxItem2['default'], _extends({}, mail, { key: mail.id }));
	        }));
	    }
	};

	exports['default'] = InboxList;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var Link = {
	    propTypes: {
	        name: { type: 'string' },
	        params: { type: 'object' },
	        options: { type: 'object' },
	        navigateTo: { type: 'function' }
	    },

	    defaultProps: {
	        params: {},
	        options: {}
	    },

	    render: function render(_ref) {
	        var props = _ref.props;
	        var name = props.name;
	        var params = props.params;
	        var options = props.options;
	        var router = props.router;
	        var navigateTo = props.navigateTo;

	        var href = router.buildUrl(name);
	        var onClick = function onClick() {
	            return navigateTo(name, params, options);
	        };
	        var className = router.isActive(name, params) ? 'active' : '';

	        return (0, _virtualElement2['default'])('a', { href: href, onClick: onClick, 'class': className }, props.children);
	    }
	};

	exports['default'] = Link;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _Inbox = __webpack_require__(26);

	var _Inbox2 = _interopRequireDefault(_Inbox);

	var _Compose = __webpack_require__(25);

	var _Compose2 = _interopRequireDefault(_Compose);

	var _NotFound = __webpack_require__(33);

	var _NotFound2 = _interopRequireDefault(_NotFound);

	var _dekuRedux = __webpack_require__(2);

	var _reduxRouter5 = __webpack_require__(4);

	var components = {
	    'inbox': _Inbox2['default'],
	    'compose': _Compose2['default']
	};

	var Main = {
	    render: function render(_ref) {
	        var props = _ref.props;
	        var route = props.route;

	        var segment = route ? route.name.split('.')[0] : undefined;

	        return (0, _virtualElement2['default'])(components[segment] || _NotFound2['default']);
	    }
	};

	exports['default'] = (0, _dekuRedux.connect)((0, _reduxRouter5.routeNodeSelector)(''))(Main);
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _api = __webpack_require__(5);

	var Message = {
	    render: function render(_ref) {
	        var props = _ref.props;

	        var _getEmail = (0, _api.getEmail)(props.messageId);

	        var mailTitle = _getEmail.mailTitle;
	        var mailMessage = _getEmail.mailMessage;

	        return (0, _virtualElement2['default'])('section', { 'class': 'mail' }, [(0, _virtualElement2['default'])('h4', {}, mailTitle), (0, _virtualElement2['default'])('p', {}, mailMessage)]);
	    }
	};

	exports['default'] = Message;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _Link = __webpack_require__(29);

	var _Link2 = _interopRequireDefault(_Link);

	var _dekuRedux = __webpack_require__(2);

	var _reduxRouter5 = __webpack_require__(4);

	var Nav = {
	    propTypes: {
	        router: { source: 'router' }
	    },

	    render: function render(_ref) {
	        var props = _ref.props;
	        var router = props.router;
	        var navigateTo = props.navigateTo;

	        return (0, _virtualElement2['default'])('nav', {}, [(0, _virtualElement2['default'])(_Link2['default'], { router: router, navigateTo: navigateTo, name: 'inbox', options: { reload: true } }, 'Inbox'), (0, _virtualElement2['default'])(_Link2['default'], { router: router, navigateTo: navigateTo, name: 'compose' }, 'Compose'), (0, _virtualElement2['default'])(_Link2['default'], { router: router, navigateTo: navigateTo, name: 'contacts' }, 'Contacts')]);
	    }
	};

	exports['default'] = (0, _dekuRedux.connect)(function (state) {
	    return state.router.route;
	}, { navigateTo: _reduxRouter5.actions.navigateTo })(Nav);
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var NotFound = {
	    render: function render() {
	        return (0, _virtualElement2['default'])('div', { 'class': 'not-found' }, 'Purposely not found (not a bug)');
	    }
	};

	exports['default'] = NotFound;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = createRouter;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _router5 = __webpack_require__(82);

	var _router5History = __webpack_require__(80);

	var _router5History2 = _interopRequireDefault(_router5History);

	function createRouter(routes) {
	    var router = new _router5.Router5().setOption('useHash', true)
	    // .setOption('hashPrefix', '!')
	    .setOption('defaultRoute', 'inbox')
	    // Routes
	    .addNode('inbox', '/inbox').addNode('inbox.message', '/message/:id').addNode('compose', '/compose').addNode('contacts', '/contacts')
	    // Plugins
	    .usePlugin(_router5.Router5.loggerPlugin()).usePlugin((0, _router5History2['default'])());

	    return router;
	}

	;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _deku = __webpack_require__(52);

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _dekuRedux = __webpack_require__(2);

	var _dekuRouter5 = __webpack_require__(47);

	var _componentsApp = __webpack_require__(24);

	var _componentsApp2 = _interopRequireDefault(_componentsApp);

	var _createRouter = __webpack_require__(34);

	var _createRouter2 = _interopRequireDefault(_createRouter);

	var _store = __webpack_require__(38);

	var _store2 = _interopRequireDefault(_store);

	var router = (0, _createRouter2['default'])();

	router.start(function (err, state) {
	    var store = (0, _store2['default'])(router, { router: { route: state } });

	    var app = (0, _deku.tree)().use((0, _dekuRedux.storePlugin)(store)).set('router', router).mount((0, _virtualElement2['default'])(_componentsApp2['default']));

	    (0, _deku.render)(app, document.getElementById('app'));
	});

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = draft;
	var initialState = {
	    title: '',
	    message: ''
	};

	function draft(state, action) {
	    if (state === undefined) state = initialState;

	    switch (action.type) {
	        case 'UPDATE_TITLE':
	            return _extends({}, state, {
	                title: action.title
	            });

	        case 'UPDATE_MESSAGE':
	            return _extends({}, state, {
	                message: action.message
	            });

	        default:
	            return state;
	    }
	}

	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = emails;
	var initialState = [{
	    "id": "1",
	    "mailTitle": "Why router5?",
	    "mailMessage": "I imagine a lot of developers who will first see router5 will ask themselves the question: is it yet another router? is it any good? Why oh why do people keep writing new routers all the time? It is not always easy to see the potential of something straight away, or understand the motivations behind. I therefore decided to try to tell you more about router5, why I decided to develop an entire new routing solution, and what problems it tries to solve."
	}, {
	    "id": "2",
	    "mailTitle": "Use with React",
	    "mailMessage": "I have just started playing with it. It does make sense to use a flux-like implementation, to provide a layer between the router and view updates."
	}, {
	    "id": "3",
	    "mailTitle": "Compose a new message",
	    "mailMessage": "Click on compose, start to fill title and message fields and then try to navigate away by clicking on app links, or by using the back button."
	}];

	function emails(state, action) {
	    if (state === undefined) state = initialState;

	    switch (action.type) {
	        default:
	            return state;
	    }
	}

	module.exports = exports["default"];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = configureStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _redux = __webpack_require__(13);

	var _reduxThunk = __webpack_require__(74);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxRouter5 = __webpack_require__(4);

	var _reducersEmails = __webpack_require__(37);

	var _reducersEmails2 = _interopRequireDefault(_reducersEmails);

	var _reducersDraft = __webpack_require__(36);

	var _reducersDraft2 = _interopRequireDefault(_reducersDraft);

	function configureStore(router) {
	    var initialState = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var createStoreWithMiddleware = (0, _redux.applyMiddleware)((0, _reduxRouter5.router5Middleware)(router))(_redux.createStore);

	    var store = createStoreWithMiddleware((0, _redux.combineReducers)({
	        router: _reduxRouter5.router5Reducer,
	        emails: _reducersEmails2['default'],
	        draft: _reducersDraft2['default']
	    }), initialState);

	    window.store = store;
	    return store;
	}

	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _redux = __webpack_require__(13);

	var _isEqualShallow = __webpack_require__(42);

	var _isEqualShallow2 = _interopRequireDefault(_isEqualShallow);

	var _isPlainObject = __webpack_require__(44);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _invariant = __webpack_require__(41);

	var _invariant2 = _interopRequireDefault(_invariant);

	var defaultMapStateToProps = function defaultMapStateToProps() {
	    return {};
	};
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	    return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	    return _extends({}, parentProps, stateProps, dispatchProps);
	};

	var wrapActionCreators = function wrapActionCreators(actionCreators) {
	    return function (dispatch) {
	        return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	    };
	};

	function connect() {
	    var mapStateToProps = arguments.length <= 0 || arguments[0] === undefined ? defaultMapStateToProps : arguments[0];
	    var mapDispatchToProps = arguments.length <= 1 || arguments[1] === undefined ? defaultMapDispatchToProps : arguments[1];
	    var mergeProps = arguments.length <= 2 || arguments[2] === undefined ? defaultMergeProps : arguments[2];

	    if ((0, _isPlainObject2['default'])(mapDispatchToProps)) {
	        mapDispatchToProps = wrapActionCreators(mapDispatchToProps);
	    }

	    var mappedStateUseProps = mapStateToProps.length > 1;
	    var mappedDispatchUseProps = mapDispatchToProps.length > 1;

	    var computeStateProps = function computeStateProps(props) {
	        var state = props.store.getState();
	        var stateProps = mapStateToProps(state, props);

	        (0, _invariant2['default'])((0, _isPlainObject2['default'])(stateProps), '[deku-redux][connect] mapStateToProps must return an object. Instead received %s', stateProps);

	        return stateProps;
	    };

	    var computeDispatchProps = function computeDispatchProps(props) {
	        var dispatch = props.store.dispatch;
	        var dispatchProps = mapDispatchToProps(dispatch, props);

	        (0, _invariant2['default'])((0, _isPlainObject2['default'])(dispatchProps), '[deku-redux][connect] mapDispatchToProps must return an object. Instead received %s', dispatchProps);

	        return dispatchProps;
	    };

	    return function connectWrapper(Component) {
	        var connectRegistry = {};
	        var getStateProps = function getStateProps(id) {
	            return connectRegistry[id] ? connectRegistry[id].stateProps : null;
	        };
	        var setStateProps = function setStateProps(id, stateProps) {
	            return connectRegistry[id].stateProps = stateProps;
	        };
	        var getDispatchProps = function getDispatchProps(id) {
	            return connectRegistry[id] ? connectRegistry[id].dispatchProps : null;
	        };
	        var setDispatchProps = function setDispatchProps(id, dispatchProps) {
	            return connectRegistry[id].dispatchProps = dispatchProps;
	        };

	        var ConnectedComponent = {
	            propTypes: {
	                store: { source: 'store' },
	                storeState: { source: 'storeState' }
	            },

	            beforeMount: function beforeMount(_ref, elm, setState) {
	                var id = _ref.id;
	                var props = _ref.props;

	                (0, _invariant2['default'])(props.store, '[deku-redux][connect] Could not find store. Did you use `storePlugin` on your deku tree?');
	                (0, _invariant2['default'])(props.store.getState && props.store.subscribe && props.store.subscribe, '[deku-redux][connect] Could not recognise store. Did you use `storePlugin` with a valid redux store?');

	                connectRegistry[id] = {};
	                setStateProps(id, computeStateProps(props));
	                setDispatchProps(id, computeDispatchProps(props));
	            },

	            shouldUpdate: function shouldUpdate(_ref2, nextProps) {
	                var id = _ref2.id;
	                var props = _ref2.props;

	                var storeChanged = nextProps.storeState !== props.storeState;
	                var propsChanged = !(0, _isEqualShallow2['default'])(nextProps, props);

	                var computeNewStateProps = storeChanged || propsChanged && mappedStateUseProps;
	                var computeNewDispatchProps = propsChanged && mappedDispatchUseProps;

	                var statePropsChanged = false;
	                var dispatchPropsChanged = false;

	                if (computeNewStateProps) {
	                    var _stateProps = computeStateProps(props);
	                    statePropsChanged = !(0, _isEqualShallow2['default'])(_stateProps, getStateProps(id));
	                    if (statePropsChanged) {
	                        setStateProps(id, _stateProps);
	                    }
	                }

	                if (computeNewDispatchProps) {
	                    var dispatchProps = computeDispatchProps(props);
	                    dispatchPropsChanged = !(0, _isEqualShallow2['default'])(dispatchProps, getDispatchProps(id));
	                    if (dispatchPropsChanged) {
	                        setDispatchProps(id, stateProps);
	                    }
	                }

	                return propsChanged || statePropsChanged || dispatchPropsChanged;
	            },

	            beforeUnmount: function beforeUnmount(_ref3) {
	                var id = _ref3.id;

	                connectRegistry[id] = undefined;
	            },

	            render: function render(_ref4) {
	                var id = _ref4.id;
	                var props = _ref4.props;

	                // TODO: use _.omit or similar
	                var parentProps = Object.keys(props).filter(function (prop) {
	                    return prop !== 'store' || prop !== 'storeState';
	                }).reduce(function (acc, prop) {
	                    acc[prop] = props[prop];
	                    return acc;
	                }, {});

	                var componentProps = mergeProps(parentProps, getStateProps(id), getDispatchProps(id));

	                (0, _invariant2['default'])((0, _isPlainObject2['default'])(componentProps), '[deku-redux][connect] `mergeProps` function didn\'t return a plain object.');

	                return (0, _virtualElement2['default'])(Component, componentProps);
	            }
	        };

	        return ConnectedComponent;
	    };
	}

	exports['default'] = connect;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var storePlugin = function storePlugin(store) {
	    return function (app) {
	        // TODO: check store is a store indeed
	        app.set('store', store);
	        app.set('storeState', store.getState());
	        store.subscribe(function () {
	            return app.set('storeState', store.getState());
	        });
	    };
	};

	exports['default'] = storePlugin;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-equal-shallow <https://github.com/jonschlinkert/is-equal-shallow>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isPrimitive = __webpack_require__(43);

	module.exports = function isEqual(a, b) {
	  if (!a && !b) { return true; }
	  if (!a && b || a && !b) { return false; }

	  var numKeysA = 0, numKeysB = 0, key;
	  for (key in b) {
	    numKeysB++;
	    if (!isPrimitive(b[key]) || !a.hasOwnProperty(key) || (a[key] !== b[key])) {
	      return false;
	    }
	  }
	  for (key in a) {
	    numKeysA++;
	  }
	  return numKeysA === numKeysB;
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	/*!
	 * is-primitive <https://github.com/jonschlinkert/is-primitive>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	// see http://jsperf.com/testing-value-is-primitive/7
	module.exports = function isPrimitive(value) {
	  return value == null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isObject = __webpack_require__(45);

	function isObjectObject(o) {
	  return isObject(o) === true
	    && Object.prototype.toString.call(o) === '[object Object]';
	}

	module.exports = function isPlainObject(o) {
	  var ctor,prot;
	  
	  if (isObjectObject(o) === false) return false;
	  
	  // If has modified constructor
	  ctor = o.constructor;
	  if (typeof ctor !== 'function') return false;
	  
	  // If has modified prototype
	  prot = ctor.prototype;
	  if (isObjectObject(prot) === false) return false;
	  
	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }
	  
	  // Most likely a plain Object
	  return true;
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object'
	    && !Array.isArray(val);
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var Link = {
	    propTypes: {
	        router: { source: 'router' },
	        route: { source: 'route' },
	        button: { type: 'boolean' },
	        routeName: { type: 'string', optional: false },
	        routeParams: { type: 'object' },
	        routeOptions: { type: 'object' },
	        activeClass: { type: 'string' },
	        activeStrict: { type: 'function' },
	        onClick: { type: 'function' }
	    },

	    defaultProps: {
	        activeClass: 'active',
	        button: false,
	        activeStrict: false,
	        routeParams: {},
	        routeOptions: {}
	    },

	    render: function render(_ref) {
	        var props = _ref.props;
	        var button = props.button;
	        var activeClass = props.activeClass;
	        var routeName = props.routeName;
	        var routeParams = props.routeParams;
	        var routeOptions = props.routeOptions;
	        var children = props.children;
	        var router = props.router;

	        var clickHandler = function clickHandler(evt) {
	            evt.preventDefault();
	            router.navigate(routeName, routeParams, routeOptions);
	        };

	        var active = router.isActive(routeName, routeParams);
	        var href = router.buildUrl(routeName, routeParams);

	        var className = (props['class'] ? props['class'].split(' ') : []).concat(active ? [activeClass] : []).join(' ');

	        var onClick = props.onClick || clickHandler;

	        if (button) {
	            return (0, _virtualElement2['default'])('button', { type: 'button', 'class': className, onClick: onClick }, children);
	        }

	        return (0, _virtualElement2['default'])('a', { href: href, 'class': className, onClick: onClick }, children);
	    }
	};

	exports['default'] = Link;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Link = __webpack_require__(46);

	var _Link2 = _interopRequireDefault(_Link);

	var _routeNode = __webpack_require__(48);

	var _routeNode2 = _interopRequireDefault(_routeNode);

	var _routerPlugin = __webpack_require__(49);

	var _routerPlugin2 = _interopRequireDefault(_routerPlugin);

	exports['default'] = {
	    Link: _Link2['default'],
	    routeNode: _routeNode2['default'],
	    routerPlugin: _routerPlugin2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	function routeNode(nodeName) {
	    return function routeNodeWrapper(RouteSegment) {
	        var RouteNode = {
	            propTypes: {
	                router: { source: 'router' }
	            },

	            afterMount: function afterMount(_ref, elm, setState) {
	                var props = _ref.props;

	                props.router.addNodeListener(nodeName, function (toState, fromState) {
	                    setState({ route: toState, previousRoute: fromState });
	                });
	            },

	            render: function render(_ref2) {
	                var props = _ref2.props;
	                var state = _ref2.state;
	                var route = state.route;
	                var previousRoute = state.previousRoute;

	                if (route === undefined) {
	                    route = props.router.getState();
	                    previousRoute = null;
	                }

	                return (0, _virtualElement2['default'])(RouteSegment, _extends({}, props, { route: route, previousRoute: previousRoute }));
	            }
	        };

	        return RouteNode;
	    };
	}

	exports['default'] = routeNode;
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var routerPlugin = function routerPlugin(router) {
	    return function (app) {
	        app.set('router', router);
	        app.set('route', router.getState());
	        router.addListener(function (toState) {
	            return app.set('route', toState);
	        });
	    };
	};

	exports['default'] = routerPlugin;
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(56)

	/**
	 * Expose `scene`.
	 */

	module.exports = Application

	/**
	 * Create a new `Application`.
	 *
	 * @param {Object} element Optional initial element
	 */

	function Application (element) {
	  if (!(this instanceof Application)) return new Application(element)
	  this.options = {}
	  this.sources = {}
	  this.element = element
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Application.prototype)

	/**
	 * Add a plugin
	 *
	 * @param {Function} plugin
	 */

	Application.prototype.use = function (plugin) {
	  plugin(this)
	  return this
	}

	/**
	 * Set an option
	 *
	 * @param {String} name
	 */

	Application.prototype.option = function (name, val) {
	  this.options[name] = val
	  return this
	}

	/**
	 * Set value used somewhere in the IO network.
	 */

	Application.prototype.set = function (name, data) {
	  this.sources[name] = data
	  this.emit('source', name, data)
	  return this
	}

	/**
	 * Mount a virtual element.
	 *
	 * @param {VirtualElement} element
	 */

	Application.prototype.mount = function (element) {
	  this.element = element
	  this.emit('mount', element)
	  return this
	}

	/**
	 * Remove the world. Unmount everything.
	 */

	Application.prototype.unmount = function () {
	  if (!this.element) return
	  this.element = null
	  this.emit('unmount')
	  return this
	}


/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * All of the events can bind to
	 */

	module.exports = {
	  onBlur: 'blur',
	  onChange: 'change',
	  onClick: 'click',
	  onContextMenu: 'contextmenu',
	  onCopy: 'copy',
	  onCut: 'cut',
	  onDoubleClick: 'dblclick',
	  onDrag: 'drag',
	  onDragEnd: 'dragend',
	  onDragEnter: 'dragenter',
	  onDragExit: 'dragexit',
	  onDragLeave: 'dragleave',
	  onDragOver: 'dragover',
	  onDragStart: 'dragstart',
	  onDrop: 'drop',
	  onError: 'error',
	  onFocus: 'focus',
	  onInput: 'input',
	  onInvalid: 'invalid',
	  onKeyDown: 'keydown',
	  onKeyPress: 'keypress',
	  onKeyUp: 'keyup',
	  onMouseDown: 'mousedown',
	  onMouseEnter: 'mouseenter',
	  onMouseLeave: 'mouseleave',
	  onMouseMove: 'mousemove',
	  onMouseOut: 'mouseout',
	  onMouseOver: 'mouseover',
	  onMouseUp: 'mouseup',
	  onPaste: 'paste',
	  onReset: 'reset',
	  onScroll: 'scroll',
	  onSubmit: 'submit',
	  onTouchCancel: 'touchcancel',
	  onTouchEnd: 'touchend',
	  onTouchMove: 'touchmove',
	  onTouchStart: 'touchstart',
	  onWheel: 'wheel'
	}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Create the application.
	 */

	exports.tree =
	exports.scene =
	exports.deku = __webpack_require__(50)

	/**
	 * Render scenes to the DOM.
	 */

	if (typeof document !== 'undefined') {
	  exports.render = __webpack_require__(53)
	}

	/**
	 * Render scenes to a string
	 */

	exports.renderString = __webpack_require__(54)

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Dependencies.
	 */

	var raf = __webpack_require__(57)
	var isDom = __webpack_require__(66)
	var uid = __webpack_require__(65)
	var keypath = __webpack_require__(69)
	var events = __webpack_require__(51)
	var svg = __webpack_require__(55)
	var defaults = __webpack_require__(10)
	var forEach = __webpack_require__(60)
	var assign = __webpack_require__(61)
	var reduce = __webpack_require__(64)
	var nodeType = __webpack_require__(6)

	/**
	 * Expose `dom`.
	 */

	module.exports = render

	/**
	 * Render an app to the DOM
	 *
	 * @param {Application} app
	 * @param {HTMLElement} container
	 * @param {Object} opts
	 *
	 * @return {Object}
	 */

	function render (app, container, opts) {
	  var frameId
	  var isRendering
	  var rootId = 'root'
	  var currentElement
	  var currentNativeElement
	  var connections = {}
	  var components = {}
	  var entities = {}
	  var handlers = {}
	  var mountQueue = []
	  var children = {}
	  children[rootId] = {}

	  if (!isDom(container)) {
	    throw new Error('Container element must be a DOM element')
	  }

	  /**
	   * Rendering options. Batching is only ever really disabled
	   * when running tests, and pooling can be disabled if the user
	   * is doing something stupid with the DOM in their components.
	   */

	  var options = defaults(assign({}, app.options || {}, opts || {}), {
	    batching: true
	  })

	  /**
	   * Listen to DOM events
	   */
	  var rootElement = getRootElement(container)
	  addNativeEventListeners()

	  /**
	   * Watch for changes to the app so that we can update
	   * the DOM as needed.
	   */

	  app.on('unmount', onunmount)
	  app.on('mount', onmount)
	  app.on('source', onupdate)

	  /**
	   * If the app has already mounted an element, we can just
	   * render that straight away.
	   */

	  if (app.element) render()

	  /**
	   * Teardown the DOM rendering so that it stops
	   * rendering and everything can be garbage collected.
	   */

	  function teardown () {
	    removeNativeEventListeners()
	    removeNativeElement()
	    app.off('unmount', onunmount)
	    app.off('mount', onmount)
	    app.off('source', onupdate)
	  }

	  /**
	   * Swap the current rendered node with a new one that is rendered
	   * from the new virtual element mounted on the app.
	   *
	   * @param {VirtualElement} element
	   */

	  function onmount () {
	    invalidate()
	  }

	  /**
	   * If the app unmounts an element, we should clear out the current
	   * rendered element. This will remove all the entities.
	   */

	  function onunmount () {
	    removeNativeElement()
	    currentElement = null
	  }

	  /**
	   * Update all components that are bound to the source
	   *
	   * @param {String} name
	   * @param {*} data
	   */

	  function onupdate (name, data) {
	    if (!connections[name]) return;
	    connections[name].forEach(function(update) {
	      update(data)
	    })
	  }

	  /**
	   * Render and mount a component to the native dom.
	   *
	   * @param {Entity} entity
	   * @return {HTMLElement}
	   */

	  function mountEntity (entity) {
	    register(entity)
	    setSources(entity)
	    children[entity.id] = {}
	    entities[entity.id] = entity

	    // commit initial state and props.
	    commit(entity)

	    // callback before mounting.
	    trigger('beforeMount', entity, [entity.context])
	    trigger('beforeRender', entity, [entity.context])

	    // render virtual element.
	    var virtualElement = renderEntity(entity)
	    // create native element.
	    var nativeElement = toNative(entity.id, '0', virtualElement)

	    entity.virtualElement = virtualElement
	    entity.nativeElement = nativeElement

	    // Fire afterRender and afterMount hooks at the end
	    // of the render cycle
	    mountQueue.push(entity.id)

	    return nativeElement
	  }

	  /**
	   * Remove a component from the native dom.
	   *
	   * @param {Entity} entity
	   */

	  function unmountEntity (entityId) {
	    var entity = entities[entityId]
	    if (!entity) return
	    trigger('beforeUnmount', entity, [entity.context, entity.nativeElement])
	    unmountChildren(entityId)
	    removeAllEvents(entityId)
	    var componentEntities = components[entityId].entities;
	    delete componentEntities[entityId]
	    delete components[entityId]
	    delete entities[entityId]
	    delete children[entityId]
	  }

	  /**
	   * Render the entity and make sure it returns a node
	   *
	   * @param {Entity} entity
	   *
	   * @return {VirtualTree}
	   */

	  function renderEntity (entity) {
	    var component = entity.component
	    var fn = typeof component === 'function' ? component : component.render
	    if (!fn) throw new Error('Component needs a render function')
	    var result = fn(entity.context, setState(entity))
	    if (!result) throw new Error('Render function must return an element.')
	    return result
	  }

	  /**
	   * Whenever setState or setProps is called, we mark the entity
	   * as dirty in the renderer. This lets us optimize the re-rendering
	   * and skip components that definitely haven't changed.
	   *
	   * @param {Entity} entity
	   *
	   * @return {Function} A curried function for updating the state of an entity
	   */

	  function setState (entity) {
	    return function (nextState) {
	      updateEntityState(entity, nextState)
	    }
	  }

	  /**
	   * Tell the app it's dirty and needs to re-render. If batching is disabled
	   * we can just trigger a render immediately, otherwise we'll wait until
	   * the next available frame.
	   */

	  function invalidate () {
	    if (!options.batching) {
	      if (!isRendering) render()
	    } else {
	      if (!frameId) frameId = raf(render)
	    }
	  }

	  /**
	   * Update the DOM. If the update fails we stop the loop
	   * so we don't get errors on every frame.
	   *
	   * @api public
	   */

	  function render () {
	    // If this is called synchronously we need to
	    // cancel any pending future updates
	    clearFrame()

	    // If the rendering from the previous frame is still going,
	    // we'll just wait until the next frame. Ideally renders should
	    // not take over 16ms to stay within a single frame, but this should
	    // catch it if it does.
	    if (isRendering) {
	      frameId = raf(render)
	      return
	    } else {
	      isRendering = true
	    }

	    // 1. If there isn't a native element rendered for the current mounted element
	    // then we need to create it from scratch.
	    // 2. If a new element has been mounted, we should diff them.
	    // 3. We should update check all child components for changes.
	    if (!currentNativeElement) {
	      currentElement = app.element
	      currentNativeElement = toNative(rootId, '0', currentElement)
	      if (container.children.length > 0) {
	        console.info('deku: The container element is not empty. These elements will be removed. Read more: http://cl.ly/b0Sr')
	      }
	      if (container === document.body) {
	        console.warn('deku: Using document.body is allowed but it can cause some issues. Read more: http://cl.ly/b0SC')
	      }
	      removeAllChildren(container)
	      container.appendChild(currentNativeElement)
	    } else if (currentElement !== app.element) {
	      currentNativeElement = patch(rootId, currentElement, app.element, currentNativeElement)
	      currentElement = app.element
	      updateChildren(rootId)
	    } else {
	      updateChildren(rootId)
	    }

	    // Call mount events on all new entities
	    flushMountQueue()

	    // Allow rendering again.
	    isRendering = false

	  }

	  /**
	   * Call hooks for all new entities that have been created in
	   * the last render from the bottom up.
	   */

	  function flushMountQueue () {
	    while (mountQueue.length > 0) {
	      var entityId = mountQueue.shift()
	      var entity = entities[entityId]
	      trigger('afterRender', entity, [entity.context, entity.nativeElement])
	      trigger('afterMount', entity, [entity.context, entity.nativeElement, setState(entity)])
	    }
	  }

	  /**
	   * Clear the current scheduled frame
	   */

	  function clearFrame () {
	    if (!frameId) return
	    raf.cancel(frameId)
	    frameId = 0
	  }

	  /**
	   * Update a component.
	   *
	   * The entity is just the data object for a component instance.
	   *
	   * @param {String} id Component instance id.
	   */

	  function updateEntity (entityId) {
	    var entity = entities[entityId]
	    setSources(entity)

	    if (!shouldUpdate(entity)) {
	      commit(entity)
	      return updateChildren(entityId)
	    }

	    var currentTree = entity.virtualElement
	    var nextProps = entity.pendingProps
	    var nextState = entity.pendingState
	    var previousState = entity.context.state
	    var previousProps = entity.context.props

	    // hook before rendering. could modify state just before the render occurs.
	    trigger('beforeUpdate', entity, [entity.context, nextProps, nextState])
	    trigger('beforeRender', entity, [entity.context])

	    // commit state and props.
	    commit(entity)

	    // re-render.
	    var nextTree = renderEntity(entity)

	    // if the tree is the same we can just skip this component
	    // but we should still check the children to see if they're dirty.
	    // This allows us to memoize the render function of components.
	    if (nextTree === currentTree) return updateChildren(entityId)

	    // apply new virtual tree to native dom.
	    entity.nativeElement = patch(entityId, currentTree, nextTree, entity.nativeElement)
	    entity.virtualElement = nextTree
	    updateChildren(entityId)

	    // trigger render hook
	    trigger('afterRender', entity, [entity.context, entity.nativeElement])

	    // trigger afterUpdate after all children have updated.
	    trigger('afterUpdate', entity, [entity.context, previousProps, previousState, setState(entity)])
	  }

	  /**
	   * Update all the children of an entity.
	   *
	   * @param {String} id Component instance id.
	   */

	  function updateChildren (entityId) {
	    forEach(children[entityId], function (childId) {
	      updateEntity(childId)
	    })
	  }

	  /**
	   * Remove all of the child entities of an entity
	   *
	   * @param {Entity} entity
	   */

	  function unmountChildren (entityId) {
	    forEach(children[entityId], function (childId) {
	      unmountEntity(childId)
	    })
	  }

	  /**
	   * Remove the root element. If this is called synchronously we need to
	   * cancel any pending future updates.
	   */

	  function removeNativeElement () {
	    clearFrame()
	    removeElement(rootId, '0', currentNativeElement)
	    currentNativeElement = null
	  }

	  /**
	   * Create a native element from a virtual element.
	   *
	   * @param {String} entityId
	   * @param {String} path
	   * @param {Object} vnode
	   *
	   * @return {HTMLDocumentFragment}
	   */

	  function toNative (entityId, path, vnode) {
	    switch (nodeType(vnode)) {
	      case 'text': return toNativeText(vnode)
	      case 'empty': return toNativeEmptyElement(entityId, path)
	      case 'element': return toNativeElement(entityId, path, vnode)
	      case 'component': return toNativeComponent(entityId, path, vnode)
	    }
	  }

	  /**
	   * Create a native text element from a virtual element.
	   *
	   * @param {Object} vnode
	   */

	  function toNativeText (text) {
	    return document.createTextNode(text)
	  }

	  /**
	   * Create a native element from a virtual element.
	   */

	  function toNativeElement (entityId, path, vnode) {
	    var el
	    var attributes = vnode.attributes
	    var tagName = vnode.type
	    var childNodes = vnode.children

	    // create element either from pool or fresh.
	    if (svg.isElement(tagName)) {
	      el = document.createElementNS(svg.namespace, tagName)
	    } else {
	      el = document.createElement(tagName)
	    }

	    // set attributes.
	    forEach(attributes, function (value, name) {
	      setAttribute(entityId, path, el, name, value)
	    })

	    // add children.
	    forEach(childNodes, function (child, i) {
	      var childEl = toNative(entityId, path + '.' + i, child)
	      if (!childEl.parentNode) el.appendChild(childEl)
	    })

	    // store keys on the native element for fast event handling.
	    el.__entity__ = entityId
	    el.__path__ = path

	    return el
	  }

	  /**
	   * Create a native element from a virtual element.
	   */

	  function toNativeEmptyElement (entityId, path) {
	    var el = document.createElement('noscript')
	    el.__entity__ = entityId
	    el.__path__ = path
	    return el
	  }

	  /**
	   * Create a native element from a component.
	   */

	  function toNativeComponent (entityId, path, vnode) {
	    var child = new Entity(vnode.type, assign({ children: vnode.children }, vnode.attributes), entityId)
	    children[entityId][path] = child.id
	    return mountEntity(child)
	  }

	  /**
	   * Patch an element with the diff from two trees.
	   */

	  function patch (entityId, prev, next, el) {
	    return diffNode('0', entityId, prev, next, el)
	  }

	  /**
	   * Create a diff between two trees of nodes.
	   */

	  function diffNode (path, entityId, prev, next, el) {
	    var leftType = nodeType(prev)
	    var rightType = nodeType(next)

	    // Type changed. This could be from element->text, text->ComponentA,
	    // ComponentA->ComponentB etc. But NOT div->span. These are the same type
	    // (ElementNode) but different tag name.
	    if (leftType !== rightType) return replaceElement(entityId, path, el, next)

	    switch (rightType) {
	      case 'text': return diffText(prev, next, el)
	      case 'empty': return el
	      case 'element': return diffElement(path, entityId, prev, next, el)
	      case 'component': return diffComponent(path, entityId, prev, next, el)
	    }
	  }

	  /**
	   * Diff two text nodes and update the element.
	   */

	  function diffText (previous, current, el) {
	    if (current !== previous) el.data = current
	    return el
	  }

	  /**
	   * Diff the children of an ElementNode.
	   */

	  function diffChildren (path, entityId, prev, next, el) {
	    var positions = []
	    var hasKeys = false
	    var childNodes = Array.prototype.slice.apply(el.childNodes)
	    var leftKeys = reduce(prev.children, keyMapReducer, {})
	    var rightKeys = reduce(next.children, keyMapReducer, {})
	    var currentChildren = assign({}, children[entityId])

	    function keyMapReducer (acc, child, i) {
	      if (child && child.attributes && child.attributes.key != null) {
	        acc[child.attributes.key] = {
	          element: child,
	          index: i
	        }
	        hasKeys = true
	      }
	      return acc
	    }

	    // Diff all of the nodes that have keys. This lets us re-used elements
	    // instead of overriding them and lets us move them around.
	    if (hasKeys) {

	      // Removals
	      forEach(leftKeys, function (leftNode, key) {
	        if (rightKeys[key] == null) {
	          var leftPath = path + '.' + leftNode.index
	          removeElement(
	            entityId,
	            leftPath,
	            childNodes[leftNode.index]
	          )
	        }
	      })

	      // Update nodes
	      forEach(rightKeys, function (rightNode, key) {
	        var leftNode = leftKeys[key]

	        // We only want updates for now
	        if (leftNode == null) return

	        var leftPath = path + '.' + leftNode.index

	        // Updated
	        positions[rightNode.index] = diffNode(
	          leftPath,
	          entityId,
	          leftNode.element,
	          rightNode.element,
	          childNodes[leftNode.index]
	        )
	      })

	      // Update the positions of all child components and event handlers
	      forEach(rightKeys, function (rightNode, key) {
	        var leftNode = leftKeys[key]

	        // We just want elements that have moved around
	        if (leftNode == null || leftNode.index === rightNode.index) return

	        var rightPath = path + '.' + rightNode.index
	        var leftPath = path + '.' + leftNode.index

	        // Update all the child component path positions to match
	        // the latest positions if they've changed. This is a bit hacky.
	        forEach(currentChildren, function (childId, childPath) {
	          if (leftPath === childPath) {
	            delete children[entityId][childPath]
	            children[entityId][rightPath] = childId
	          }
	        })
	      })

	      // Now add all of the new nodes last in case their path
	      // would have conflicted with one of the previous paths.
	      forEach(rightKeys, function (rightNode, key) {
	        var rightPath = path + '.' + rightNode.index
	        if (leftKeys[key] == null) {
	          positions[rightNode.index] = toNative(
	            entityId,
	            rightPath,
	            rightNode.element
	          )
	        }
	      })

	    } else {
	      var maxLength = Math.max(prev.children.length, next.children.length)

	      // Now diff all of the nodes that don't have keys
	      for (var i = 0; i < maxLength; i++) {
	        var leftNode = prev.children[i]
	        var rightNode = next.children[i]

	        // Removals
	        if (rightNode === undefined) {
	          removeElement(
	            entityId,
	            path + '.' + i,
	            childNodes[i]
	          )
	          continue
	        }

	        // New Node
	        if (leftNode === undefined) {
	          positions[i] = toNative(
	            entityId,
	            path + '.' + i,
	            rightNode
	          )
	          continue
	        }

	        // Updated
	        positions[i] = diffNode(
	          path + '.' + i,
	          entityId,
	          leftNode,
	          rightNode,
	          childNodes[i]
	        )
	      }
	    }

	    // Reposition all the elements
	    forEach(positions, function (childEl, newPosition) {
	      var target = el.childNodes[newPosition]
	      if (childEl && childEl !== target) {
	        if (target) {
	          el.insertBefore(childEl, target)
	        } else {
	          el.appendChild(childEl)
	        }
	      }
	    })
	  }

	  /**
	   * Diff the attributes and add/remove them.
	   */

	  function diffAttributes (prev, next, el, entityId, path) {
	    var nextAttrs = next.attributes
	    var prevAttrs = prev.attributes

	    // add new attrs
	    forEach(nextAttrs, function (value, name) {
	      if (events[name] || !(name in prevAttrs) || prevAttrs[name] !== value) {
	        setAttribute(entityId, path, el, name, value)
	      }
	    })

	    // remove old attrs
	    forEach(prevAttrs, function (value, name) {
	      if (!(name in nextAttrs)) {
	        removeAttribute(entityId, path, el, name)
	      }
	    })
	  }

	  /**
	   * Update a component with the props from the next node. If
	   * the component type has changed, we'll just remove the old one
	   * and replace it with the new component.
	   */

	  function diffComponent (path, entityId, prev, next, el) {
	    if (next.type !== prev.type) {
	      return replaceElement(entityId, path, el, next)
	    } else {
	      var targetId = children[entityId][path]

	      // This is a hack for now
	      if (targetId) {
	        updateEntityProps(targetId, assign({ children: next.children }, next.attributes))
	      }

	      return el
	    }
	  }

	  /**
	   * Diff two element nodes.
	   */

	  function diffElement (path, entityId, prev, next, el) {
	    if (next.type !== prev.type) return replaceElement(entityId, path, el, next)
	    diffAttributes(prev, next, el, entityId, path)
	    diffChildren(path, entityId, prev, next, el)
	    return el
	  }

	  /**
	   * Removes an element from the DOM and unmounts and components
	   * that are within that branch
	   *
	   * side effects:
	   *   - removes element from the DOM
	   *   - removes internal references
	   *
	   * @param {String} entityId
	   * @param {String} path
	   * @param {HTMLElement} el
	   */

	  function removeElement (entityId, path, el) {
	    var childrenByPath = children[entityId]
	    var childId = childrenByPath[path]
	    var entityHandlers = handlers[entityId] || {}
	    var removals = []

	    // If the path points to a component we should use that
	    // components element instead, because it might have moved it.
	    if (childId) {
	      var child = entities[childId]
	      el = child.nativeElement
	      unmountEntity(childId)
	      removals.push(path)
	    } else {

	      // Just remove the text node
	      if (!isElement(el)) return el && el.parentNode.removeChild(el)

	      // Then we need to find any components within this
	      // branch and unmount them.
	      forEach(childrenByPath, function (childId, childPath) {
	        if (childPath === path || isWithinPath(path, childPath)) {
	          unmountEntity(childId)
	          removals.push(childPath)
	        }
	      })

	      // Remove all events at this path or below it
	      forEach(entityHandlers, function (fn, handlerPath) {
	        if (handlerPath === path || isWithinPath(path, handlerPath)) {
	          removeEvent(entityId, handlerPath)
	        }
	      })
	    }

	    // Remove the paths from the object without touching the
	    // old object. This keeps the object using fast properties.
	    forEach(removals, function (path) {
	      delete children[entityId][path]
	    })

	    // Remove it from the DOM
	    el.parentNode.removeChild(el)
	  }

	  /**
	   * Replace an element in the DOM. Removing all components
	   * within that element and re-rendering the new virtual node.
	   *
	   * @param {Entity} entity
	   * @param {String} path
	   * @param {HTMLElement} el
	   * @param {Object} vnode
	   *
	   * @return {void}
	   */

	  function replaceElement (entityId, path, el, vnode) {
	    var parent = el.parentNode
	    var index = Array.prototype.indexOf.call(parent.childNodes, el)

	    // remove the previous element and all nested components. This
	    // needs to happen before we create the new element so we don't
	    // get clashes on the component paths.
	    removeElement(entityId, path, el)

	    // then add the new element in there
	    var newEl = toNative(entityId, path, vnode)
	    var target = parent.childNodes[index]

	    if (target) {
	      parent.insertBefore(newEl, target)
	    } else {
	      parent.appendChild(newEl)
	    }

	    // walk up the tree and update all `entity.nativeElement` references.
	    if (entityId !== 'root' && path === '0') {
	      updateNativeElement(entityId, newEl)
	    }

	    return newEl
	  }

	  /**
	   * Update all entities in a branch that have the same nativeElement. This
	   * happens when a component has another component as it's root node.
	   *
	   * @param {String} entityId
	   * @param {HTMLElement} newEl
	   *
	   * @return {void}
	   */

	  function updateNativeElement (entityId, newEl) {
	    var target = entities[entityId]
	    if (target.ownerId === 'root') return
	    if (children[target.ownerId]['0'] === entityId) {
	      entities[target.ownerId].nativeElement = newEl
	      updateNativeElement(target.ownerId, newEl)
	    }
	  }

	  /**
	   * Set the attribute of an element, performing additional transformations
	   * dependning on the attribute name
	   *
	   * @param {HTMLElement} el
	   * @param {String} name
	   * @param {String} value
	   */

	  function setAttribute (entityId, path, el, name, value) {
	    if (!value) {
	      removeAttribute(entityId, path, el, name)
	      return
	    }
	    if (events[name]) {
	      addEvent(entityId, path, events[name], value)
	      return
	    }
	    switch (name) {
	      case 'checked':
	      case 'disabled':
	      case 'selected':
	        el[name] = true
	        break
	      case 'innerHTML':
	        el.innerHTML = value
	        break
	      case 'value':
	        setElementValue(el, value)
	        break
	      case svg.isAttribute(name):
	        el.setAttributeNS(svg.namespace, name, value)
	        break
	      default:
	        el.setAttribute(name, value)
	        break
	    }
	  }

	  /**
	   * Remove an attribute, performing additional transformations
	   * dependning on the attribute name
	   *
	   * @param {HTMLElement} el
	   * @param {String} name
	   */

	  function removeAttribute (entityId, path, el, name) {
	    if (events[name]) {
	      removeEvent(entityId, path, events[name])
	      return
	    }
	    switch (name) {
	      case 'checked':
	      case 'disabled':
	      case 'selected':
	        el[name] = false
	        break
	      case 'innerHTML':
	        el.innerHTML = ''
	      case 'value':
	        setElementValue(el, null)
	        break
	      default:
	        el.removeAttribute(name)
	        break
	    }
	  }

	  /**
	   * Checks to see if one tree path is within
	   * another tree path. Example:
	   *
	   * 0.1 vs 0.1.1 = true
	   * 0.2 vs 0.3.5 = false
	   *
	   * @param {String} target
	   * @param {String} path
	   *
	   * @return {Boolean}
	   */

	  function isWithinPath (target, path) {
	    return path.indexOf(target + '.') === 0
	  }

	  /**
	   * Is the DOM node an element node
	   *
	   * @param {HTMLElement} el
	   *
	   * @return {Boolean}
	   */

	  function isElement (el) {
	    return !!(el && el.tagName)
	  }

	  /**
	   * Remove all the child nodes from an element
	   *
	   * @param {HTMLElement} el
	   */

	  function removeAllChildren (el) {
	    while (el.firstChild) el.removeChild(el.firstChild)
	  }

	  /**
	   * Trigger a hook on a component.
	   *
	   * @param {String} name Name of hook.
	   * @param {Entity} entity The component instance.
	   * @param {Array} args To pass along to hook.
	   */

	  function trigger (name, entity, args) {
	    if (typeof entity.component[name] !== 'function') return
	    return entity.component[name].apply(null, args)
	  }

	  /**
	   * Update an entity to match the latest rendered vode. We always
	   * replace the props on the component when composing them. This
	   * will trigger a re-render on all children below this point.
	   *
	   * @param {Entity} entity
	   * @param {String} path
	   * @param {Object} vnode
	   *
	   * @return {void}
	   */

	  function updateEntityProps (entityId, nextProps) {
	    var entity = entities[entityId]
	    entity.pendingProps = defaults({}, nextProps, entity.component.defaultProps || {})
	    entity.dirty = true
	    invalidate()
	  }

	  /**
	   * Update component instance state.
	   */

	  function updateEntityState (entity, nextState) {
	    entity.pendingState = assign(entity.pendingState, nextState)
	    entity.dirty = true
	    invalidate()
	  }

	  /**
	   * Commit props and state changes to an entity.
	   */

	  function commit (entity) {
	    entity.context = {
	      state: entity.pendingState,
	      props: entity.pendingProps,
	      id: entity.id
	    }
	    entity.pendingState = assign({}, entity.context.state)
	    entity.pendingProps = assign({}, entity.context.props)
	    entity.dirty = false
	    if (typeof entity.component.validate === 'function') {
	      entity.component.validate(entity.context)
	    }
	  }

	  /**
	   * Try to avoid creating new virtual dom if possible.
	   *
	   * Later we may expose this so you can override, but not there yet.
	   */

	  function shouldUpdate (entity) {
	    if (!entity.dirty) return false
	    if (!entity.component.shouldUpdate) return true
	    var nextProps = entity.pendingProps
	    var nextState = entity.pendingState
	    var bool = entity.component.shouldUpdate(entity.context, nextProps, nextState)
	    return bool
	  }

	  /**
	   * Register an entity.
	   *
	   * This is mostly to pre-preprocess component properties and values chains.
	   *
	   * The end result is for every component that gets mounted,
	   * you create a set of IO nodes in the network from the `value` definitions.
	   *
	   * @param {Component} component
	   */

	  function register (entity) {
	    registerEntity(entity)
	    var component = entity.component
	    if (component.registered) return

	    // initialize sources once for a component type.
	    registerSources(entity)
	    component.registered = true
	  }

	  /**
	   * Add entity to data-structures related to components/entities.
	   *
	   * @param {Entity} entity
	   */

	  function registerEntity(entity) {
	    var component = entity.component
	    // all entities for this component type.
	    var entities = component.entities = component.entities || {}
	    // add entity to component list
	    entities[entity.id] = entity
	    // map to component so you can remove later.
	    components[entity.id] = component
	  }

	  /**
	   * Initialize sources for a component by type.
	   *
	   * @param {Entity} entity
	   */

	  function registerSources(entity) {
	    var component = components[entity.id]
	    // get 'class-level' sources.
	    // if we've already hooked it up, then we're good.
	    var sources = component.sources
	    if (sources) return
	    var entities = component.entities

	    // hook up sources.
	    var map = component.sourceToPropertyName = {}
	    component.sources = sources = []
	    var propTypes = component.propTypes
	    for (var name in propTypes) {
	      var data = propTypes[name]
	      if (!data) continue
	      if (!data.source) continue
	      sources.push(data.source)
	      map[data.source] = name
	    }

	    // send value updates to all component instances.
	    sources.forEach(function (source) {
	      connections[source] = connections[source] || []
	      connections[source].push(update)

	      function update (data) {
	        var prop = map[source]
	        for (var entityId in entities) {
	          var entity = entities[entityId]
	          var changes = {}
	          changes[prop] = data
	          updateEntityProps(entityId, assign(entity.pendingProps, changes))
	        }
	      }
	    })
	  }

	  /**
	   * Set the initial source value on the entity
	   *
	   * @param {Entity} entity
	   */

	  function setSources (entity) {
	    var component = entity.component
	    var map = component.sourceToPropertyName
	    var sources = component.sources
	    sources.forEach(function (source) {
	      var name = map[source]
	      if (entity.pendingProps[name] != null) return
	      entity.pendingProps[name] = app.sources[source] // get latest value plugged into global store
	    })
	  }

	  /**
	   * Add all of the DOM event listeners
	   */

	  function addNativeEventListeners () {
	    forEach(events, function (eventType) {
	      rootElement.addEventListener(eventType, handleEvent, true)
	    })
	  }

	  /**
	   * Add all of the DOM event listeners
	   */

	  function removeNativeEventListeners () {
	    forEach(events, function (eventType) {
	      rootElement.removeEventListener(eventType, handleEvent, true)
	    })
	  }

	  /**
	   * Handle an event that has occured within the container
	   *
	   * @param {Event} event
	   */

	  function handleEvent (event) {
	    var target = event.target
	    var eventType = event.type

	    // Walk up the DOM tree and see if there is a handler
	    // for this event type higher up.
	    while (target) {
	      var fn = keypath.get(handlers, [target.__entity__, target.__path__, eventType])
	      if (fn) {
	        event.delegateTarget = target
	        if (fn(event) === false) break
	      }
	      target = target.parentNode
	    }
	  }

	  /**
	   * Bind events for an element, and all it's rendered child elements.
	   *
	   * @param {String} path
	   * @param {String} event
	   * @param {Function} fn
	   */

	  function addEvent (entityId, path, eventType, fn) {
	    keypath.set(handlers, [entityId, path, eventType], function (e) {
	      var entity = entities[entityId]
	      if (entity) {
	        return fn.call(null, e, entity.context, setState(entity))
	      } else {
	        return fn.call(null, e)
	      }
	    })
	  }

	  /**
	   * Unbind events for a entityId
	   *
	   * @param {String} entityId
	   */

	  function removeEvent (entityId, path, eventType) {
	    var args = [entityId]
	    if (path) args.push(path)
	    if (eventType) args.push(eventType)
	    keypath.del(handlers, args)
	  }

	  /**
	   * Unbind all events from an entity
	   *
	   * @param {Entity} entity
	   */

	  function removeAllEvents (entityId) {
	    keypath.del(handlers, [entityId])
	  }

	  /**
	   * Used for debugging to inspect the current state without
	   * us needing to explicitly manage storing/updating references.
	   *
	   * @return {Object}
	   */

	  function inspect () {
	    return {
	      entities: entities,
	      handlers: handlers,
	      connections: connections,
	      currentElement: currentElement,
	      options: options,
	      app: app,
	      container: container,
	      children: children
	    }
	  }

	  /**
	   * Return an object that lets us completely remove the automatic
	   * DOM rendering and export debugging tools.
	   */

	  return {
	    remove: teardown,
	    inspect: inspect
	  }
	}

	/**
	 * A rendered component instance.
	 *
	 * This manages the lifecycle, props and state of the component.
	 * It's basically just a data object for more straightfoward lookup.
	 *
	 * @param {Component} component
	 * @param {Object} props
	 */

	function Entity (component, props, ownerId) {
	  this.id = uid()
	  this.ownerId = ownerId
	  this.component = component
	  this.propTypes = component.propTypes || {}
	  this.context = {}
	  this.context.id = this.id
	  this.context.props = defaults(props || {}, component.defaultProps || {})
	  this.context.state = this.component.initialState ? this.component.initialState(this.context.props) : {}
	  this.pendingProps = assign({}, this.context.props)
	  this.pendingState = assign({}, this.context.state)
	  this.dirty = false
	  this.virtualElement = null
	  this.nativeElement = null
	  this.displayName = component.name || 'Component'
	}

	/**
	 * Retrieve the nearest 'body' ancestor of the given element or else the root
	 * element of the document in which stands the given element.
	 *
	 * This is necessary if you want to attach the events handler to the correct
	 * element and be able to dispatch events in document fragments such as
	 * Shadow DOM.
	 *
	 * @param  {HTMLElement} el The element on which we will render an app.
	 * @return {HTMLElement}    The root element on which we will attach the events
	 *                          handler.
	 */

	function getRootElement (el) {
	  while (el.parentElement) {
	    if (el.tagName === 'BODY' || !el.parentElement) {
	      return el
	    }
	    el = el.parentElement
	  }
	  return el
	}

	/**
	 * Set the value property of an element and keep the text selection
	 * for input fields.
	 *
	 * @param {HTMLElement} el
	 * @param {String} value
	 */

	function setElementValue (el, value) {
	  if (el === document.activeElement && canSelectText(el)) {
	    var start = el.selectionStart
	    var end = el.selectionEnd
	    el.value = value
	    el.setSelectionRange(start, end)
	  } else {
	    el.value = value
	  }
	}

	/**
	 * For some reason only certain types of inputs can set the selection range.
	 *
	 * @param {HTMLElement} el
	 *
	 * @return {Boolean}
	 */

	function canSelectText (el) {
	  return el.tagName === 'INPUT' && ['text','search','password','tel','url'].indexOf(el.type) > -1
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var defaults = __webpack_require__(10)
	var nodeType = __webpack_require__(6)
	var type = __webpack_require__(7)

	/**
	 * Expose `stringify`.
	 */

	module.exports = function (app) {
	  if (!app.element) {
	    throw new Error('No element mounted')
	  }

	  /**
	   * Render to string.
	   *
	   * @param {Component} component
	   * @param {Object} [props]
	   * @return {String}
	   */

	  function stringify (component, optProps, children) {
	    var propTypes = component.propTypes || {}
	    var props = defaults(optProps || {}, component.defaultProps || {})
	    var state = component.initialState ? component.initialState(props) : {}
	    props.children = children;

	    for (var name in propTypes) {
	      var options = propTypes[name]
	      if (options.source) {
	        props[name] = app.sources[options.source]
	      }
	    }

	    if (component.beforeMount) component.beforeMount({ props: props, state: state })
	    if (component.beforeRender) component.beforeRender({ props: props, state: state })
	    var node = component.render({ props: props, state: state })
	    return stringifyNode(node, '0')
	  }

	  /**
	   * Render a node to a string
	   *
	   * @param {Node} node
	   * @param {Tree} tree
	   *
	   * @return {String}
	   */

	  function stringifyNode (node, path) {
	    switch (nodeType(node)) {
	      case 'empty': return '<noscript />'
	      case 'text': return node
	      case 'element':
	        var children = node.children
	        var attributes = node.attributes
	        var tagName = node.type
	        var innerHTML = attributes.innerHTML
	        var str = '<' + tagName + attrs(attributes) + '>'

	        if (innerHTML) {
	          str += innerHTML
	        } else {
	          for (var i = 0, n = children.length; i < n; i++) {
	            str += stringifyNode(children[i], path + '.' + i)
	          }
	        }

	        str += '</' + tagName + '>'
	        return str
	      case 'component': return stringify(node.type, node.attributes, node.children)
	    }

	    throw new Error('Invalid type')
	  }

	  return stringifyNode(app.element, '0')
	}

	/**
	 * HTML attributes to string.
	 *
	 * @param {Object} attributes
	 * @return {String}
	 * @api private
	 */

	function attrs (attributes) {
	  var str = ''
	  for (var key in attributes) {
	    var value = attributes[key]
	    if (key === 'innerHTML') continue
	    if (isValidAttributeValue(value)) str += attr(key, attributes[key])
	  }
	  return str
	}

	/**
	 * HTML attribute to string.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @return {String}
	 * @api private
	 */

	function attr (key, val) {
	  return ' ' + key + '="' + val + '"'
	}

	/**
	 * Is a value able to be set a an attribute value?
	 *
	 * @param {Any} value
	 *
	 * @return {Boolean}
	 */

	function isValidAttributeValue (value) {
	  var valueType = type(value)
	  switch (valueType) {
	  case 'string':
	  case 'number':
	    return true;

	  case 'boolean':
	    return value;

	  default:
	    return false;
	  }
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  isElement: __webpack_require__(68).isElement,
	  isAttribute: __webpack_require__(67),
	  namespace: 'http://www.w3.org/2000/svg'
	}


/***/ },
/* 56 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */

	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;

	/**
	 * Fallback implementation.
	 */

	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}

	/**
	 * Cancel.
	 */

	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;

	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal3 = __webpack_require__(8);

	/**
	 * # For Each
	 *
	 * A fast `.forEach()` implementation.
	 *
	 * @param  {Array}    subject     The array (or array-like) to iterate over.
	 * @param  {Function} fn          The visitor function.
	 * @param  {Object}   thisContext The context for the visitor.
	 */
	module.exports = function fastForEach (subject, fn, thisContext) {
	  var length = subject.length,
	      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
	      i;
	  for (i = 0; i < length; i++) {
	    iterator(subject[i], i, subject);
	  }
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal4 = __webpack_require__(9);

	/**
	 * # Reduce
	 *
	 * A fast `.reduce()` implementation.
	 *
	 * @param  {Array}    subject      The array (or array-like) to reduce.
	 * @param  {Function} fn           The reducer function.
	 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
	 * @param  {Object}   thisContext  The context for the reducer.
	 * @return {mixed}                 The final result.
	 */
	module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
	  var length = subject.length,
	      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
	      i, result;

	  if (initialValue === undefined) {
	    i = 1;
	    result = subject[0];
	  }
	  else {
	    i = 0;
	    result = initialValue;
	  }

	  for (; i < length; i++) {
	    result = iterator(result, subject[i], i, subject);
	  }

	  return result;
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forEachArray = __webpack_require__(58),
	    forEachObject = __webpack_require__(62);

	/**
	 * # ForEach
	 *
	 * A fast `.forEach()` implementation.
	 *
	 * @param  {Array|Object} subject     The array or object to iterate over.
	 * @param  {Function}     fn          The visitor function.
	 * @param  {Object}       thisContext The context for the visitor.
	 */
	module.exports = function fastForEach (subject, fn, thisContext) {
	  if (subject instanceof Array) {
	    return forEachArray(subject, fn, thisContext);
	  }
	  else {
	    return forEachObject(subject, fn, thisContext);
	  }
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Analogue of Object.assign().
	 * Copies properties from one or more source objects to
	 * a target object. Existing keys on the target object will be overwritten.
	 *
	 * > Note: This differs from spec in some important ways:
	 * > 1. Will throw if passed non-objects, including `undefined` or `null` values.
	 * > 2. Does not support the curious Exception handling behavior, exceptions are thrown immediately.
	 * > For more details, see:
	 * > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	 *
	 *
	 *
	 * @param  {Object} target      The target object to copy properties to.
	 * @param  {Object} source, ... The source(s) to copy properties from.
	 * @return {Object}             The updated target object.
	 */
	module.exports = function fastAssign (target) {
	  var totalArgs = arguments.length,
	      source, i, totalKeys, keys, key, j;

	  for (i = 1; i < totalArgs; i++) {
	    source = arguments[i];
	    keys = Object.keys(source);
	    totalKeys = keys.length;
	    for (j = 0; j < totalKeys; j++) {
	      key = keys[j];
	      target[key] = source[key];
	    }
	  }
	  return target;
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal3 = __webpack_require__(8);

	/**
	 * # For Each
	 *
	 * A fast object `.forEach()` implementation.
	 *
	 * @param  {Object}   subject     The object to iterate over.
	 * @param  {Function} fn          The visitor function.
	 * @param  {Object}   thisContext The context for the visitor.
	 */
	module.exports = function fastForEachObject (subject, fn, thisContext) {
	  var keys = Object.keys(subject),
	      length = keys.length,
	      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
	      key, i;
	  for (i = 0; i < length; i++) {
	    key = keys[i];
	    iterator(subject[key], key, subject);
	  }
	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal4 = __webpack_require__(9);

	/**
	 * # Reduce
	 *
	 * A fast object `.reduce()` implementation.
	 *
	 * @param  {Object}   subject      The object to reduce over.
	 * @param  {Function} fn           The reducer function.
	 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
	 * @param  {Object}   thisContext  The context for the reducer.
	 * @return {mixed}                 The final result.
	 */
	module.exports = function fastReduceObject (subject, fn, initialValue, thisContext) {
	  var keys = Object.keys(subject),
	      length = keys.length,
	      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
	      i, key, result;

	  if (initialValue === undefined) {
	    i = 1;
	    result = subject[keys[0]];
	  }
	  else {
	    i = 0;
	    result = initialValue;
	  }

	  for (; i < length; i++) {
	    key = keys[i];
	    result = iterator(result, subject[key], key, subject);
	  }

	  return result;
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reduceArray = __webpack_require__(59),
	    reduceObject = __webpack_require__(63);

	/**
	 * # Reduce
	 *
	 * A fast `.reduce()` implementation.
	 *
	 * @param  {Array|Object} subject      The array or object to reduce over.
	 * @param  {Function}     fn           The reducer function.
	 * @param  {mixed}        initialValue The initial value for the reducer, defaults to subject[0].
	 * @param  {Object}       thisContext  The context for the reducer.
	 * @return {Array|Object}              The array or object containing the results.
	 */
	module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
	  if (subject instanceof Array) {
	    return reduceArray(subject, fn, initialValue, thisContext);
	  }
	  else {
	    return reduceObject(subject, fn, initialValue, thisContext);
	  }
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	/** generate unique id for selector */
	var counter = Date.now() % 1e9;

	module.exports = function getUid(){
		return (Math.random() * 1e9 >>> 0) + (counter++);
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	/*global window*/

	/**
	 * Check if object is dom node.
	 *
	 * @param {Object} val
	 * @return {Boolean}
	 * @api public
	 */

	module.exports = function isNode(val){
	  if (!val || typeof val !== 'object') return false;
	  if (window && 'object' == typeof window.Node) return val instanceof window.Node;
	  return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
	}


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Supported SVG attributes
	 */

	exports.attributes = {
	  'cx': true,
	  'cy': true,
	  'd': true,
	  'dx': true,
	  'dy': true,
	  'fill': true,
	  'fillOpacity': true,
	  'fontFamily': true,
	  'fontSize': true,
	  'fx': true,
	  'fy': true,
	  'gradientTransform': true,
	  'gradientUnits': true,
	  'markerEnd': true,
	  'markerMid': true,
	  'markerStart': true,
	  'offset': true,
	  'opacity': true,
	  'patternContentUnits': true,
	  'patternUnits': true,
	  'points': true,
	  'preserveAspectRatio': true,
	  'r': true,
	  'rx': true,
	  'ry': true,
	  'spreadMethod': true,
	  'stopColor': true,
	  'stopOpacity': true,
	  'stroke': true,
	  'strokeDasharray': true,
	  'strokeLinecap': true,
	  'strokeOpacity': true,
	  'strokeWidth': true,
	  'textAnchor': true,
	  'transform': true,
	  'version': true,
	  'viewBox': true,
	  'x1': true,
	  'x2': true,
	  'x': true,
	  'y1': true,
	  'y2': true,
	  'y': true
	}

	/**
	 * Are element's attributes SVG?
	 *
	 * @param {String} attr
	 */

	module.exports = function (attr) {
	  return attr in exports.attributes
	}


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Supported SVG elements
	 *
	 * @type {Array}
	 */

	exports.elements = {
	  'animate': true,
	  'circle': true,
	  'defs': true,
	  'ellipse': true,
	  'g': true,
	  'line': true,
	  'linearGradient': true,
	  'mask': true,
	  'path': true,
	  'pattern': true,
	  'polygon': true,
	  'polyline': true,
	  'radialGradient': true,
	  'rect': true,
	  'stop': true,
	  'svg': true,
	  'text': true,
	  'tspan': true
	}

	/**
	 * Is element's namespace SVG?
	 *
	 * @param {String} name
	 */

	exports.isElement = function (name) {
	  return name in exports.elements
	}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
	  'use strict';

	  /*istanbul ignore next:cant test*/
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(this, function(){
	  'use strict';

	  var
	    toStr = Object.prototype.toString,
	    _hasOwnProperty = Object.prototype.hasOwnProperty;

	  function isEmpty(value){
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	        return true;
	    } else if (!isString(value)) {
	        for (var i in value) {
	            if (_hasOwnProperty.call(value, i)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	  }

	  function toString(type){
	    return toStr.call(type);
	  }

	  function isNumber(value){
	    return typeof value === 'number' || toString(value) === "[object Number]";
	  }

	  function isString(obj){
	    return typeof obj === 'string' || toString(obj) === "[object String]";
	  }

	  function isObject(obj){
	    return typeof obj === 'object' && toString(obj) === "[object Object]";
	  }

	  function isArray(obj){
	    return typeof obj === 'object' && typeof obj.length === 'number' && toString(obj) === '[object Array]';
	  }

	  function isBoolean(obj){
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }

	  function getKey(key){
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }

	  function set(obj, path, value, doNotReplace){
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isString(path)) {
	      return set(obj, path.split('.').map(getKey), value, doNotReplace);
	    }
	    var currentPath = path[0];

	    if (path.length === 1) {
	      var oldVal = obj[currentPath];
	      if (oldVal === void 0 || !doNotReplace) {
	        obj[currentPath] = value;
	      }
	      return oldVal;
	    }

	    if (obj[currentPath] === void 0) {
	      //check if we assume an array
	      if(isNumber(path[1])) {
	        obj[currentPath] = [];
	      } else {
	        obj[currentPath] = {};
	      }
	    }

	    return set(obj[currentPath], path.slice(1), value, doNotReplace);
	  }

	  function del(obj, path) {
	    if (isNumber(path)) {
	      path = [path];
	    }

	    if (isEmpty(obj)) {
	      return void 0;
	    }

	    if (isEmpty(path)) {
	      return obj;
	    }
	    if(isString(path)) {
	      return del(obj, path.split('.'));
	    }

	    var currentPath = getKey(path[0]);
	    var oldVal = obj[currentPath];

	    if(path.length === 1) {
	      if (oldVal !== void 0) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      }
	    } else {
	      if (obj[currentPath] !== void 0) {
	        return del(obj[currentPath], path.slice(1));
	      }
	    }

	    return obj;
	  }

	  var objectPath = function(obj) {
	    return Object.keys(objectPath).reduce(function(proxy, prop) {
	      if (typeof objectPath[prop] === 'function') {
	        proxy[prop] = objectPath[prop].bind(objectPath, obj);
	      }

	      return proxy;
	    }, {});
	  };

	  objectPath.has = function (obj, path) {
	    if (isEmpty(obj)) {
	      return false;
	    }

	    if (isNumber(path)) {
	      path = [path];
	    } else if (isString(path)) {
	      path = path.split('.');
	    }

	    if (isEmpty(path) || path.length === 0) {
	      return false;
	    }

	    for (var i = 0; i < path.length; i++) {
	      var j = path[i];
	      if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
	        obj = obj[j];
	      } else {
	        return false;
	      }
	    }

	    return true;
	  };

	  objectPath.ensureExists = function (obj, path, value){
	    return set(obj, path, value, true);
	  };

	  objectPath.set = function (obj, path, value, doNotReplace){
	    return set(obj, path, value, doNotReplace);
	  };

	  objectPath.insert = function (obj, path, value, at){
	    var arr = objectPath.get(obj, path);
	    at = ~~at;
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }
	    arr.splice(at, 0, value);
	  };

	  objectPath.empty = function(obj, path) {
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return void 0;
	    }

	    var value, i;
	    if (!(value = objectPath.get(obj, path))) {
	      return obj;
	    }

	    if (isString(value)) {
	      return objectPath.set(obj, path, '');
	    } else if (isBoolean(value)) {
	      return objectPath.set(obj, path, false);
	    } else if (isNumber(value)) {
	      return objectPath.set(obj, path, 0);
	    } else if (isArray(value)) {
	      value.length = 0;
	    } else if (isObject(value)) {
	      for (i in value) {
	        if (_hasOwnProperty.call(value, i)) {
	          delete value[i];
	        }
	      }
	    } else {
	      return objectPath.set(obj, path, null);
	    }
	  };

	  objectPath.push = function (obj, path /*, values */){
	    var arr = objectPath.get(obj, path);
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }

	    arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	  };

	  objectPath.coalesce = function (obj, paths, defaultValue) {
	    var value;

	    for (var i = 0, len = paths.length; i < len; i++) {
	      if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	        return value;
	      }
	    }

	    return defaultValue;
	  };

	  objectPath.get = function (obj, path, defaultValue){
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return defaultValue;
	    }
	    if (isString(path)) {
	      return objectPath.get(obj, path.split('.'), defaultValue);
	    }

	    var currentPath = getKey(path[0]);

	    if (path.length === 1) {
	      if (obj[currentPath] === void 0) {
	        return defaultValue;
	      }
	      return obj[currentPath];
	    }

	    return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	  };

	  objectPath.del = function(obj, path) {
	    return del(obj, path);
	  };

	  return objectPath;
	});


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reselect = __webpack_require__(17);

	var _router5TransitionPath = __webpack_require__(73);

	var _router5TransitionPath2 = _interopRequireDefault(_router5TransitionPath);

	function routeNodeSelector(routeNode) {
	    var reducerKey = arguments.length <= 1 || arguments[1] === undefined ? 'router' : arguments[1];

	    var routerStateSelector = function routerStateSelector(state) {
	        return state[reducerKey];
	    };

	    var routeIntersectionSelector = (0, _reselect.createSelector)(routerStateSelector, function (_ref) {
	        var route = _ref.route;
	        var previousRoute = _ref.previousRoute;

	        var intersection = route ? (0, _router5TransitionPath2['default'])(route, previousRoute).intersection : '';
	        return { route: route, intersection: intersection };
	    });

	    // We trick the selector to think that no change happenned if the intersection of an update
	    // is not the defined routeNode.
	    var createIntersectionSelector = (0, _reselect.createSelectorCreator)(_reselect.defaultMemoize, function (_ref2, previous) {
	        var intersection = _ref2.intersection;
	        var route = _ref2.route;
	        return previous.route === route || intersection !== routeNode;
	    });

	    return createIntersectionSelector(routeIntersectionSelector, function (_ref3) {
	        var route = _ref3.route;
	        return { route: route };
	    });
	}

	exports['default'] = routeNodeSelector;
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = replaceRoutesMiddleware;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _actionTypes = __webpack_require__(3);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var _actions = __webpack_require__(11);

	var actions = _interopRequireWildcard(_actions);

	function routerPlugin(dispatch) {
	    var plugin = {
	        name: 'REDUX_PLUGIN',
	        onTransitionStart: function onTransitionStart(toState, fromState) {
	            dispatch(actions.transitionStart(toState, fromState));
	        },
	        onTransitionSuccess: function onTransitionSuccess(toState, fromState) {
	            dispatch(actions.transitionSuccess(toState, fromState));
	        },
	        onTransitionError: function onTransitionError(toState, fromState, err) {
	            dispatch(actions.transitionError(toState, fromState, err));
	        }
	    };

	    return plugin;
	}

	function replaceRoutesMiddleware(router) {
	    return function (_ref) {
	        var dispatch = _ref.dispatch;

	        router.usePlugin(routerPlugin(dispatch));

	        return function (next) {
	            return function (action) {
	                if (action.type === _actionTypes2['default'].NAVIGATE_TO) {
	                    router.navigate(action.name, action.params, action.options);
	                } else if (action.type === _actionTypes2['default'].CANCEL_TRANSITION) {
	                    router.cancel();
	                }

	                return next(action);
	            };
	        };
	    };
	}

	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _actionTypes = __webpack_require__(3);

	var _actionTypes2 = _interopRequireDefault(_actionTypes);

	var initialState = {
	    route: null,
	    previousRoute: null,
	    transitionRoute: null,
	    transitionError: null
	};

	function router5Reducer(state, action) {
	    if (state === undefined) state = initialState;

	    switch (action.type) {
	        case _actionTypes2['default'].TRANSTION_START:
	            return _extends({}, state, {
	                transitionRoute: action.route,
	                transitionError: null
	            });

	        case _actionTypes2['default'].TRANSITION_SUCCESS:
	            return _extends({}, state, {
	                transitionRoute: null,
	                transitionError: null,
	                previousRoute: action.previousRoute,
	                route: action.route
	            });

	        case _actionTypes2['default'].TRANSITION_ERROR:
	            return _extends({}, state, {
	                transitionRoute: action.route,
	                transitionError: action.transitionError
	            });

	        case _actionTypes2['default'].CLEAR_ERRORS:
	            return _extends({}, state, {
	                transitionRoute: null,
	                transitionError: null
	            });

	        default:
	            return state;
	    }
	}

	exports['default'] = router5Reducer;
	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function transitionPath(toState, fromState) {
	    function nameToIDs(name) {
	        return name.split('.').reduce(function (ids, name) {
	            return ids.concat(ids.length ? ids[ids.length - 1] + '.' + name : name);
	        }, []);
	    }

	    var i = undefined;
	    var fromStateIds = fromState ? nameToIDs(fromState.name) : [];
	    var toStateIds = nameToIDs(toState.name);
	    var maxI = Math.min(fromStateIds.length, toStateIds.length);

	    if (fromState && fromState.name === toState.name) {
	        i = Math.max(maxI - 1, 0);
	    } else {
	        for (i = 0; i < maxI; i += 1) {
	            if (fromStateIds[i] !== toStateIds[i]) break;
	        }
	    }

	    var toDeactivate = fromStateIds.slice(i).reverse();
	    var toActivate = toStateIds.slice(i);
	    var intersection = fromState && i > 0 ? fromStateIds[i - 1] : '';

	    return {
	        intersection: intersection,
	        toDeactivate: toDeactivate,
	        toActivate: toActivate
	    };
	}

	exports['default'] = transitionPath;
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;

	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(14);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(16);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    // eslint-disable-line no-eq-null
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(12);

	var _utilsIsPlainObject = __webpack_require__(15);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsMapValues = __webpack_require__(16);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(78);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_utilsIsPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */

	function combineReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var hasChanged = false;
	    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * Dumb functions
	 */
	// istanbul ignore next
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var identity = function identity(arg) {
	    return function () {
	        return arg;
	    };
	};
	// istanbul ignore next
	var noop = function noop() {};

	/**
	 * Browser detection
	 */
	var isBrowser = typeof window !== 'undefined';

	/**
	 * Browser functions needed by router5
	 */
	var getBase = function getBase() {
	    return window.location.pathname.replace(/\/$/, '');
	};

	var pushState = function pushState(state, title, path) {
	    return window.history.pushState(state, title, path);
	};

	var replaceState = function replaceState(state, title, path) {
	    return window.history.replaceState(state, title, path);
	};

	var addPopstateListener = function addPopstateListener(fn) {
	    return window.addEventListener('popstate', fn);
	};

	var removePopstateListener = function removePopstateListener(fn) {
	    return window.removeEventListener('popstate', fn);
	};

	var getLocation = function getLocation(opts) {
	    var path = opts.useHash ? window.location.hash.replace(new RegExp('^#' + opts.hashPrefix), '') : window.location.pathname.replace(new RegExp('^' + opts.base), '');
	    return path + window.location.search;
	};

	/**
	 * Export browser object
	 */
	var browser = {};
	if (isBrowser) {
	    browser = { getBase: getBase, pushState: pushState, replaceState: replaceState, addPopstateListener: addPopstateListener, removePopstateListener: removePopstateListener, getLocation: getLocation };
	} else {
	    // istanbul ignore next
	    browser = {
	        getBase: identity(''),
	        pushState: noop,
	        replaceState: noop,
	        addPopstateListener: noop,
	        removePopstateListener: noop,
	        getLocation: identity('')
	    };
	}

	exports['default'] = browser;
	module.exports = exports['default'];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _browser = __webpack_require__(79);

	var pluginName = 'HISTORY';

	function historyPlugin() {
	    var router = undefined;

	    function updateBrowserState(state, url, replace) {
	        if (replace) (0, _browser.replaceState)(state, '', url);else (0, _browser.pushState)(state, '', url);
	    }

	    function onPopState(evt) {
	        // Do nothing if no state or if last know state is poped state (it should never happen)
	        var newState = !evt.state || !evt.state.name;
	        var state = newState ? router.matchPath((0, _browser.getLocation)(router.options)) : evt.state;
	        var _router$options = router.options;
	        var defaultRoute = _router$options.defaultRoute;
	        var defaultParams = _router$options.defaultParams;

	        if (!state) {
	            // If current state is already the default route, we will have a double entry
	            // Navigating back and forth will emit SAME_STATES error
	            router.navigate(defaultRoute, defaultParams, { reload: true, replace: true });
	            return;
	        }
	        if (router.lastKnownState && router.areStatesEqual(state, router.lastKnownState, true)) {
	            return;
	        }

	        var fromState = _extends({}, router.getState());

	        router._transition(state, fromState, function (err, toState) {
	            if (err) {
	                if (err === 'CANNOT_DEACTIVATE') {
	                    var url = router.buildUrl(router.lastKnownState.name, router.lastKnownState.params);
	                    if (!newState) {
	                        // Keep history state unchanged but use current URL
	                        updateBrowserState(state, url, true);
	                    }
	                    // else do nothing or history will be messed up
	                    // TODO: history.back()?
	                } else {
	                        // Force navigation to default state
	                        router.navigate(defaultRoute, defaultParams, { reload: true, replace: true });
	                    }
	            } else {
	                router._invokeListeners('$$success', toState, fromState, { replace: true });
	            }
	        });
	    }

	    function init(target) {
	        router = target;
	        // Monkey patch getLocation
	        router.getLocation = function () {
	            return (0, _browser.getLocation)(router.options);
	        };
	    }

	    function onStart() {
	        // Guess base
	        if (router.options.useHash && !router.options.base) {
	            router.options.base = (0, _browser.getBase)();
	        }
	        (0, _browser.addPopstateListener)(onPopState);
	    }

	    function onStop() {
	        (0, _browser.removePopstateListener)(onPopState);
	    }

	    function onTransitionSuccess(toState, fromState, opts) {
	        updateBrowserState(toState, router.buildUrl(toState.name, toState.params), opts.replace || opts.reload);
	    }

	    return { name: pluginName, init: init, onStart: onStart, onStop: onStop, onTransitionSuccess: onTransitionSuccess, onPopState: onPopState };
	}

	exports['default'] = historyPlugin;
	module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = asyncProcess;

	function asyncProcess(functions, _ref, callback) {
	    var isCancelled = _ref.isCancelled;
	    var toState = _ref.toState;
	    var fromState = _ref.fromState;
	    var context = _ref.context;
	    var additionalArgs = _ref.additionalArgs;
	    var allowBool = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

	    var remainingFunctions = Array.isArray(functions) ? functions : Object.keys(functions);

	    var initialFromState = _extends({}, fromState);
	    var isState = function isState(obj) {
	        return typeof obj === 'object' && obj.name !== undefined && obj.params !== undefined && obj.path !== undefined;
	    };
	    var hasStateChanged = function hasStateChanged(state) {
	        return state.name !== toState.name || state.params !== toState.params || state.path !== toState.path;
	    };

	    var processFn = function processFn(done) {
	        if (!remainingFunctions.length) return true;

	        var isMapped = typeof remainingFunctions[0] === 'string';
	        var errVal = isMapped ? remainingFunctions[0] : {};
	        var stepFn = isMapped ? functions[remainingFunctions[0]] : remainingFunctions[0];

	        // const len = stepFn.length;
	        var res = stepFn.apply(context || null, additionalArgs.concat([toState, fromState, done]));

	        if (allowBool && typeof res === 'boolean') {
	            done(res ? null : errVal);
	        } else if (res && typeof res.then === 'function') {
	            res.then(function (resVal) {
	                return done(null, resVal);
	            }, function () {
	                return done(errVal);
	            });
	        }
	        // else: wait for done to be called

	        return false;
	    };

	    var iterate = function iterate(err, val) {
	        if (err) callback(err);else {
	            if (val && isState(val)) {
	                if (hasStateChanged(val)) console.error('[router5][transition] State values changed during transition process and ignored.');else toState = val;
	            }
	            remainingFunctions = remainingFunctions.slice(1);
	            next();
	        }
	    };

	    var next = function next() {
	        if (isCancelled()) {
	            callback(null);
	        } else {
	            var finished = processFn(iterate);
	            if (finished) callback(null, toState);
	        }
	    };

	    next();
	}

	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _router5 = __webpack_require__(84);

	var _router52 = _interopRequireDefault(_router5);

	var _routeNode = __webpack_require__(19);

	var _routeNode2 = _interopRequireDefault(_routeNode);

	exports['default'] = { Router5: _router52['default'], RouteNode: _routeNode2['default'] };
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function loggerPlugin() {
	    var startGroup = function startGroup() {
	        return console.group('Router transition');
	    };
	    var endGroup = function endGroup() {
	        return console.groupEnd('Router transition');
	    };

	    return {
	        name: 'LOGGER',
	        onStart: function onStart() {
	            console.info('Router started');
	        },
	        onStop: function onStop() {
	            console.info('Router stopped');
	        },
	        onTransitionStart: function onTransitionStart(toState, fromState) {
	            endGroup();
	            startGroup();
	            console.log('Transition started from state');
	            console.log(fromState);
	            console.log('To state');
	            console.log(toState);
	        },
	        onTransitionCancel: function onTransitionCancel(toState, fromState) {
	            console.warn('Transition cancelled');
	        },
	        onTransitionError: function onTransitionError(toState, fromState, err) {
	            console.warn('Transition error with code ' + err.code);
	            endGroup();
	        },
	        onTransitionSuccess: function onTransitionSuccess(toState, fromState) {
	            console.log('Transition success');
	            endGroup();
	        }
	    };
	}

	exports['default'] = loggerPlugin;
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _routeNode = __webpack_require__(19);

	var _routeNode2 = _interopRequireDefault(_routeNode);

	var _router5TransitionPath = __webpack_require__(20);

	var _router5TransitionPath2 = _interopRequireDefault(_router5TransitionPath);

	var _transition2 = __webpack_require__(85);

	var _transition3 = _interopRequireDefault(_transition2);

	var _constants = __webpack_require__(18);

	var _constants2 = _interopRequireDefault(_constants);

	var _logger = __webpack_require__(83);

	var _logger2 = _interopRequireDefault(_logger);

	var makeState = function makeState(name, params, path, _meta) {
	    var state = {};
	    var setProp = function setProp(key, value) {
	        return Object.defineProperty(state, key, { value: value, enumerable: true });
	    };
	    setProp('name', name);
	    setProp('params', params);
	    setProp('path', path);
	    if (_meta) setProp('_meta', _meta);
	    return state;
	};

	/**
	 * Create a new Router5 instance
	 * @class
	 * @param {RouteNode[]|Object[]|RouteNode|Object} routes The router routes
	 * @param {Object} [opts={}] The router options: useHash, defaultRoute and defaultParams can be specified.
	 * @return {Router5} The router instance
	 */

	var Router5 = (function () {
	    function Router5(routes) {
	        // istanbul ignore next

	        var _this = this;

	        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, Router5);

	        this.started = false;
	        this.mware = null;
	        this._cbs = {};
	        this._cmps = {};
	        this._canAct = {};
	        this.lastStateAttempt = null;
	        this.lastKnownState = null;
	        this.rootNode = routes instanceof _routeNode2['default'] ? routes : new _routeNode2['default']('', '', routes);
	        this.options = {
	            useHash: false,
	            hashPrefix: '',
	            base: false,
	            trailingSlash: 0,
	            autoCleanUp: true
	        };
	        Object.keys(opts).forEach(function (opt) {
	            return _this.options[opt] = opts[opt];
	        });
	        this.registeredPlugins = {};
	        this._extraArgs = [];
	    }

	    /**
	     * Error codes
	     * @static
	     * @type {Object}
	     */

	    /**
	     * Set an option value
	     * @param  {String} opt The option to set
	     * @param  {*}      val The option value
	     * @return {Router5}    The Router5 instance
	     */

	    _createClass(Router5, [{
	        key: 'setOption',
	        value: function setOption(opt, val) {
	            this.options[opt] = val;
	            return this;
	        }

	        /**
	         * Set additional arguments used in lifecycle functions.
	         * Additional arguments are used in canActivate and canDeactivate in first positions (before `toState`).
	         * @param  {Array} args The additional arguments
	         */
	    }, {
	        key: 'setAdditionalArgs',
	        value: function setAdditionalArgs(args) {
	            this._extraArgs = Array.isArray(args) ? args : [args];
	            return this;
	        }

	        /**
	         * Return additional arguments used in lifecycle functions
	         */
	    }, {
	        key: 'getAdditionalArgs',
	        value: function getAdditionalArgs() {
	            return this._extraArgs;
	        }

	        /**
	         * Add route(s)
	         * @param  {RouteNode[]|Object[]|RouteNode|Object} routes Route(s) to add
	         * @return {Router5}  The Router5 instance
	         */
	    }, {
	        key: 'add',
	        value: function add(routes) {
	            this.rootNode.add(routes);
	            return this;
	        }

	        /**
	         * Add a route to the router.
	         * @param {String}   name          The route name
	         * @param {String}   path          The route path
	         * @param {Function} [canActivate] A function to determine if the route can be activated.
	         *                                 It will be invoked during a transition with `toState`
	         *                                 and `fromState` parameters.
	         * @return {Router5}             The Router5 instance
	         */
	    }, {
	        key: 'addNode',
	        value: function addNode(name, path, canActivate) {
	            this.rootNode.addNode(name, path);
	            if (canActivate) this._canAct[name] = canActivate;
	            return this;
	        }
	    }, {
	        key: 'usePlugin',
	        value: function usePlugin(plugin) {
	            // istanbul ignore next

	            var _this2 = this;

	            if (!plugin.name) console.warn('[router5.registerPlugin(plugin)] Missing property pluginName');

	            var pluginMethods = ['onStart', 'onStop', 'onTransitionSuccess', 'onTransitionStart', 'onTransitionError', 'onTransitionCancel'];
	            var defined = pluginMethods.concat('init').some(function (method) {
	                return plugin[method] !== undefined;
	            });

	            if (!defined) throw new Error('[router5] plugin ' + plugin.name + ' has none of the expected methods implemented');
	            this.registeredPlugins[plugin.name] = plugin;

	            if (plugin.init) plugin.init(this);

	            pluginMethods.forEach(function (method) {
	                if (plugin[method]) {
	                    _this2._addListener(method.toLowerCase().replace(/^on/, '$$').replace(/transition/, '$$'), plugin[method]);
	                }
	            });

	            return this;
	        }

	        /**
	         * Set a transition middleware function `.useMiddleware(fn1, fn2, fn3, ...)`
	         * @param {Function} fn The middleware function
	         */
	    }, {
	        key: 'useMiddleware',
	        value: function useMiddleware() {
	            this.mware = Array.prototype.slice.call(arguments);
	            return this;
	        }

	        /**
	         * Start the router
	         * @param  {String|Object} [startPathOrState] An optional start path or state
	         *                                            (use it for universal applications)
	         * @param  {Function}      [done]             An optional callback which will be called
	         *                                            when starting is done
	         * @return {Router5}  The router instance
	         */
	    }, {
	        key: 'start',
	        value: function start() {
	            // istanbul ignore next

	            var _this3 = this;

	            var args = Array.prototype.slice.call(arguments);
	            var lastArg = args.slice(-1)[0];
	            var done = lastArg instanceof Function ? lastArg : null;
	            var startPath = undefined,
	                startState = undefined;

	            if (this.started) {
	                if (done) done({ code: _constants2['default'].ROUTER_ALREADY_STARTED });
	                return this;
	            }

	            this.started = true;
	            this._invokeListeners('$start');
	            var opts = this.options;

	            if (args.length > 0) {
	                if (typeof args[0] === 'string') startPath = args[0];
	                if (typeof args[0] === 'object') startState = args[0];
	            }

	            // callback
	            var cb = function cb(err, state) {
	                var invokeErrCb = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	                if (done) done(err, state);
	                if (!err) _this3._invokeListeners('$$success', state, null, { replace: true });
	                if (err && invokeErrCb) _this3._invokeListeners('$$error', state, null, err);
	            };

	            // Get start path
	            if (startPath === undefined && startState === undefined && this.getLocation) {
	                startPath = this.getLocation();
	            }

	            if (!startState) {
	                (function () {
	                    // If no supplied start state, get start state
	                    startState = startPath === undefined ? null : _this3.matchPath(startPath);
	                    // Navigate to default function
	                    var navigateToDefault = function navigateToDefault() {
	                        return _this3.navigate(opts.defaultRoute, opts.defaultParams, { replace: true }, function (err, state) {
	                            return cb(err, state, false);
	                        });
	                    };
	                    // If matched start path
	                    if (startState) {
	                        _this3.lastStateAttempt = startState;
	                        _this3._transition(_this3.lastStateAttempt, _this3.lastKnownState, function (err, state) {
	                            if (!err) {
	                                cb(null, state);
	                            } else if (opts.defaultRoute) navigateToDefault();else cb(err, null, false);
	                        });
	                    } else if (opts.defaultRoute) {
	                        // If default, navigate to default
	                        navigateToDefault();
	                    } else {
	                        // No start match, no default => do nothing
	                        cb({ code: _constants2['default'].ROUTE_NOT_FOUND, path: startPath }, null);
	                    }
	                })();
	            } else {
	                // Initialise router with provided start state
	                this.lastKnownState = startState;
	                cb(null, startState);
	            }

	            return this;
	        }

	        /**
	         * Stop the router
	         * @return {Router5} The router instance
	         */
	    }, {
	        key: 'stop',
	        value: function stop() {
	            if (!this.started) return this;
	            this.lastKnownState = null;
	            this.lastStateAttempt = null;
	            this.started = false;
	            this._invokeListeners('$stop');

	            return this;
	        }

	        /**
	         * Return the current state object
	         * @return {Object} The current state
	         */
	    }, {
	        key: 'getState',
	        value: function getState() {
	            return this.lastKnownState;
	        }

	        /**
	         * Whether or not the given route name with specified params is active.
	         * @param  {String}   name             The route name
	         * @param  {Object}   [params={}]      The route parameters
	         * @param  {Boolean}  [strictEquality=false] If set to false (default), isActive will return true
	         *                                           if the provided route name and params are descendants
	         *                                           of the active state.
	         * @param  {Boolean}   [ignoreQueryParams=true] Whether or not to ignore URL query parameters when
	         *                                              comparing the two states together.
	         *                                              query parameters when comparing two states together.
	         * @return {Boolean}                    Whether nor not the route is active
	         */
	    }, {
	        key: 'isActive',
	        value: function isActive(name) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	            var strictEquality = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var ignoreQueryParams = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

	            var activeState = this.getState();

	            if (!activeState) return false;

	            if (strictEquality || activeState.name === name) {
	                return this.areStatesEqual(makeState(name, params), activeState, ignoreQueryParams);
	            }

	            return this.areStatesDescendants(makeState(name, params), activeState);
	        }

	        /**
	         * @private
	         */
	    }, {
	        key: 'areStatesEqual',
	        value: function areStatesEqual(state1, state2) {
	            // istanbul ignore next

	            var _this4 = this;

	            var ignoreQueryParams = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	            if (state1.name !== state2.name) return false;

	            var getUrlParams = function getUrlParams(name) {
	                return _this4.rootNode.getSegmentsByName(name).map(function (segment) {
	                    return segment.parser[ignoreQueryParams ? 'urlParams' : 'params'];
	                }).reduce(function (params, p) {
	                    return params.concat(p);
	                }, []);
	            };

	            var state1Params = getUrlParams(state1.name);
	            var state2Params = getUrlParams(state2.name);

	            return state1Params.length === state2Params.length && state1Params.every(function (p) {
	                return state1.params[p] === state2.params[p];
	            });
	        }

	        /**
	         * Whether two states are descendants
	         * @param  {Object} parentState The parent state
	         * @param  {Object} childState  The child state
	         * @return {Boolean}            Whether the two provided states are related
	         */
	    }, {
	        key: 'areStatesDescendants',
	        value: function areStatesDescendants(parentState, childState) {
	            var regex = new RegExp('^' + parentState.name + '\\.(.*)$');
	            if (!regex.test(childState.name)) return false;
	            // If child state name extends parent state name, and all parent state params
	            // are in child state params.
	            return Object.keys(parentState.params).every(function (p) {
	                return parentState.params[p] === childState.params[p];
	            });
	        }

	        /**
	         * @private
	         */
	    }, {
	        key: '_invokeListeners',
	        value: function _invokeListeners(name) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            (this._cbs[name] || []).forEach(function (cb) {
	                return cb.apply(undefined, args);
	            });
	        }

	        /**
	         * @private
	         */
	    }, {
	        key: '_addListener',
	        value: function _addListener(name, cb, replace) {
	            this._cbs[name] = (this._cbs[name] || []).concat(cb);
	            return this;
	        }

	        /**
	         * Register an active component for a specific route segment
	         * @param  {String} name      The route segment full name
	         * @param  {Object} component The component instance
	         */
	    }, {
	        key: 'registerComponent',
	        value: function registerComponent(name, component) {
	            var warn = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	            if (this._cmps[name] && warn) console.warn('A component was alread registered for route node ' + name + '.');
	            this._cmps[name] = component;
	            return this;
	        }

	        /**
	         * Shortcut to "registerComponent". It updates the "canDeactivate" status of a route segment.
	         * @param  {String}  name          The route segment full name
	         * @param  {Boolean} canDeactivate Whether the segment can be deactivated or not
	         * @return {[type]}
	         */
	    }, {
	        key: 'canDeactivate',
	        value: function canDeactivate(name, _canDeactivate) {
	            if (!this.options.autoCleanUp) throw new Error('[router.canDeactivate()] Cannot be used if "autoCleanUp" is set to false');
	            this.registerComponent(name, { canDeactivate: function canDeactivate(toState, fromState) {
	                    return _canDeactivate;
	                } }, false);
	            return this;
	        }

	        /**
	         * Deregister an active component
	         * @param  {String} name The route segment full name
	         * @return {Router5} The router instance
	         */
	    }, {
	        key: 'deregisterComponent',
	        value: function deregisterComponent(name) {
	            this._cmps[name] = undefined;
	        }

	        /**
	         * A function to determine whether or not a segment can be activated.
	         * @param  {String}   name        The route name to register the canActivate method for
	         * @param  {Function} canActivate The canActivate function. It should return `true`, `false`
	         *                                or a promise
	         * @return {Router5}  The router instance
	         */
	    }, {
	        key: 'canActivate',
	        value: function canActivate(name, _canActivate) {
	            this._canAct[name] = _canActivate;
	            return this;
	        }

	        /**
	         * Generates an URL from a route name and route params.
	         * The generated URL will be prefixed by hash if useHash is set to true
	         * @param  {String} route  The route name
	         * @param  {Object} params The route params (key-value pairs)
	         * @return {String}        The built URL
	         */
	    }, {
	        key: 'buildUrl',
	        value: function buildUrl(route, params) {
	            return this._buildUrl(this.buildPath(route, params));
	        }

	        /**
	         * @private
	         */
	    }, {
	        key: '_buildUrl',
	        value: function _buildUrl(path) {
	            return (this.options.base || '') + (this.options.useHash ? '#' + this.options.hashPrefix : '') + path;
	        }

	        /**
	         * Build a path from a route name and route params
	         * The generated URL will be prefixed by hash if useHash is set to true
	         * @param  {String} route  The route name
	         * @param  {Object} params The route params (key-value pairs)
	         * @return {String}        The built Path
	         */
	    }, {
	        key: 'buildPath',
	        value: function buildPath(route, params) {
	            return this.rootNode.buildPath(route, params);
	        }

	        /**
	         * Build a state object from a route name and route params
	         * @param  {String} route  The route name
	         * @param  {Object} params The route params (key-value pairs)
	         * @return {String}        The built Path
	         */
	    }, {
	        key: 'buildState',
	        value: function buildState(route, params) {
	            return this.rootNode.buildState(route, params);
	        }

	        /**
	         * Match a path against the route tree.
	         * @param  {String} path   The path to match
	         * @return {Object}        The matched state object (null if no match)
	         */
	    }, {
	        key: 'matchPath',
	        value: function matchPath(path) {
	            var match = this.rootNode.matchPath(path, this.options.trailingSlash);
	            return match ? makeState(match.name, match.params, path, match._meta) : null;
	        }

	        /**
	         * Parse / extract a path from an url
	         * @param  {String} url The URL
	         * @return {String}     The extracted path
	         */
	    }, {
	        key: 'urlToPath',
	        value: function urlToPath(url) {
	            var match = url.match(/^(?:http|https)\:\/\/(?:[0-9a-z_\-\.\:]+?)(?=\/)(.*)$/);
	            var path = match ? match[1] : url;

	            var pathParts = path.match(/^(.+?)(#.+?)?(\?.+)?$/);

	            if (!pathParts) throw new Error('[router5] Could not parse url ' + url);

	            var pathname = pathParts[1];
	            var hash = pathParts[2] || '';
	            var search = pathParts[3] || '';
	            var opts = this.options;

	            return (opts.useHash ? hash.replace(new RegExp('^#' + opts.hashPrefix), '') : opts.base ? pathname.replace(new RegExp('^' + opts.base), '') : pathname) + search;
	        }

	        /**
	         * Parse path from an url and match it against the route tree.
	         * @param  {String} url    The URL to match
	         * @return {Object}        The matched state object (null if no match)
	         */
	    }, {
	        key: 'matchUrl',
	        value: function matchUrl(url) {
	            return this.matchPath(this.urlToPath(url));
	        }

	        /**
	         * @private
	         */
	    }, {
	        key: '_transition',
	        value: function _transition(toState, fromState, done) {
	            // istanbul ignore next

	            var _this5 = this;

	            // Cancel current transition
	            this.cancel();
	            this._invokeListeners('$$start', toState, fromState);

	            var tr = (0, _transition3['default'])(this, toState, fromState, function (err, state) {
	                state = state || toState;
	                _this5._tr = null;

	                if (err) {
	                    if (err.code === _constants2['default'].TRANSITION_CANCELLED) _this5._invokeListeners('$$cancel', toState, fromState);else _this5._invokeListeners('$$error', toState, fromState, err);

	                    if (done) done(err);
	                    return;
	                }

	                _this5.lastKnownState = state; // toState or modified state?

	                if (done) done(null, state);
	            });

	            this._tr = tr;
	            return function () {
	                return !tr || tr();
	            };
	        }

	        /**
	         * Undocumented for now
	         * @private
	         */
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            if (this._tr) this._tr();
	        }

	        /**
	         * Navigate to a specific route
	         * @param  {String}   name        The route name
	         * @param  {Object}   [params={}] The route params
	         * @param  {Object}   [opts={}]   The route options (replace, reload)
	         * @param  {Function} done        A optional callback(err) to call when transition has been performed
	         *                                either successfully or unsuccessfully.
	         * @return {Function}             A cancellation function
	         */
	    }, {
	        key: 'navigate',
	        value: function navigate(name, params, opts, done) {
	            if (params === undefined) params = {};
	            // istanbul ignore next

	            var _this6 = this;

	            if (opts === undefined) opts = {};

	            if (!this.started) {
	                if (done) done({ code: _constants2['default'].ROUTER_NOT_STARTED });
	                return;
	            }

	            var toState = this.buildState(name, params);

	            if (!toState) {
	                var err = { code: _constants2['default'].ROUTE_NOT_FOUND };
	                if (done) done(err);
	                this._invokeListeners('$$error', null, this.lastKnownState, err);
	                return;
	            }

	            toState.path = this.buildPath(name, params);
	            this.lastStateAttempt = toState;
	            var sameStates = this.lastKnownState ? this.areStatesEqual(this.lastKnownState, this.lastStateAttempt, false) : false;

	            // Do not proceed further if states are the same and no reload
	            // (no desactivation and no callbacks)
	            if (sameStates && !opts.reload) {
	                var err = { code: _constants2['default'].SAME_STATES };
	                if (done) done(err);
	                this._invokeListeners('$$error', toState, this.lastKnownState, err);
	                return;
	            }

	            var fromState = sameStates ? null : this.lastKnownState;

	            // Transition and amend history
	            return this._transition(toState, sameStates ? null : this.lastKnownState, function (err, state) {
	                if (err) {
	                    if (done) done(err);
	                    return;
	                }

	                _this6._invokeListeners('$$success', toState, fromState, opts);
	                if (done) done(null, state);
	            });
	        }
	    }]);

	    return Router5;
	})();

	Router5.ERR = _constants2['default'];

	/**
	 * An helper function to return instructions for a transition:
	 * intersection route name, route names to deactivate, route names to activate
	 * @static
	 * @param  {Object} toState   The state to go to
	 * @param  {Object} fromState The state to go from
	 * @return {Object}           An object containing 'intersection', 'toActivate' and 'toDeactivate' keys
	 */
	Router5.transitionPath = _router5TransitionPath2['default'];

	Router5.loggerPlugin = _logger2['default'];

	exports['default'] = Router5;
	module.exports = exports['default'];

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	// istanbul ignore next

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _router5TransitionPath = __webpack_require__(20);

	var _router5TransitionPath2 = _interopRequireDefault(_router5TransitionPath);

	var _async = __webpack_require__(81);

	var _async2 = _interopRequireDefault(_async);

	var _constants = __webpack_require__(18);

	var _constants2 = _interopRequireDefault(_constants);

	exports['default'] = transition;

	var nameToIDs = function nameToIDs(name) {
	    return name.split('.').reduce(function (ids, name) {
	        return ids.concat(ids.length ? ids[ids.length - 1] + '.' + name : name);
	    }, []);
	};

	function transition(router, toState, fromState, callback) {
	    var cancelled = false;
	    var additionalArgs = router.getAdditionalArgs();
	    var isCancelled = function isCancelled() {
	        return cancelled;
	    };
	    var cancel = function cancel() {
	        return cancelled = true;
	    };
	    var done = function done(err, state) {
	        if (!err && !isCancelled() && router.options.autoCleanUp) {
	            (function () {
	                var activeSegments = nameToIDs(toState.name);
	                Object.keys(router._cmps).filter(function (name) {
	                    if (activeSegments.indexOf(name) === -1) router.deregisterComponent(name);
	                });
	            })();
	        }
	        callback(isCancelled() ? { code: _constants2['default'].TRANSITION_CANCELLED } : err, state || toState);
	    };

	    var _transitionPath = (0, _router5TransitionPath2['default'])(toState, fromState);

	    var toDeactivate = _transitionPath.toDeactivate;
	    var toActivate = _transitionPath.toActivate;

	    var asyncBase = { isCancelled: isCancelled, toState: toState, fromState: fromState, additionalArgs: [] };

	    var canDeactivate = function canDeactivate(toState, fromState, cb) {
	        var canDeactivateFunctionMap = toDeactivate.filter(function (name) {
	            return router._cmps[name] && router._cmps[name].canDeactivate;
	        }).reduce(function (fnMap, name) {
	            return _extends({}, fnMap, _defineProperty({}, name, router._cmps[name].canDeactivate));
	        }, {});

	        (0, _async2['default'])(canDeactivateFunctionMap, _extends({}, asyncBase, { additionalArgs: additionalArgs }), function (err) {
	            return cb(err ? { code: _constants2['default'].CANNOT_DEACTIVATE, segment: err } : null);
	        });
	    };

	    var canActivate = function canActivate(toState, fromState, cb) {
	        var canActivateFunctionMap = toActivate.filter(function (name) {
	            return router._canAct[name];
	        }).reduce(function (fnMap, name) {
	            return _extends({}, fnMap, _defineProperty({}, name, router._canAct[name]));
	        }, {});

	        (0, _async2['default'])(canActivateFunctionMap, _extends({}, asyncBase, { additionalArgs: additionalArgs }), function (err) {
	            return cb(err ? { code: _constants2['default'].CANNOT_ACTIVATE, segment: err } : null);
	        });
	    };

	    var middlewareFn = router.mware;
	    var middleware = function middleware(toState, fromState, cb) {
	        var mwareFunction = Array.isArray(router.mware) ? router.mware : [router.mware];

	        (0, _async2['default'])(mwareFunction, _extends({}, asyncBase, { context: { cancel: cancel, router: router } }), function (err, state) {
	            var errObj = err ? typeof err === 'object' ? err : { error: err } : null;
	            cb(err ? _extends({ code: _constants2['default'].TRANSITION_ERR }, errObj) : null, state || toState);
	        });
	    };

	    var pipeline = (fromState ? [canDeactivate] : []).concat(canActivate).concat(middlewareFn ? middleware : []);

	    (0, _async2['default'])(pipeline, asyncBase, done);

	    return cancel;
	}
	module.exports = exports['default'];

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var defaultOrConstrained = function defaultOrConstrained(match) {
	    return '(' + (match ? match.replace(/(^<|>$)/g, '') : '[a-zA-Z0-9-_.~]+') + ')';
	};

	var rules = [{
	    // An URL can contain a parameter :paramName
	    // - and _ are allowed but not in last position
	    name: 'url-parameter',
	    pattern: /^:([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(<(.+?)>)?/,
	    regex: function regex(match) {
	        return new RegExp(defaultOrConstrained(match[2]));
	    }
	}, {
	    // Url parameter (splat)
	    name: 'url-parameter-splat',
	    pattern: /^\*([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})/,
	    regex: /([^\?]*)/
	}, {
	    name: 'url-parameter-matrix',
	    pattern: /^\;([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(<(.+?)>)?/,
	    regex: function regex(match) {
	        return new RegExp(';' + match[1] + '=' + defaultOrConstrained(match[2]));
	    }
	}, {
	    // Query parameter: ?param1&param2
	    //                   ?:param1&:param2
	    name: 'query-parameter',
	    pattern: /^(?:\?|&)(?:\:)?([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})/
	}, // regex:   match => new RegExp('(?=(\?|.*&)' + match[0] + '(?=(\=|&|$)))')
	{
	    // Delimiter /
	    name: 'delimiter',
	    pattern: /^(\/|\?)/,
	    regex: function regex(match) {
	        return new RegExp('\\' + match[0]);
	    }
	}, {
	    // Sub delimiters
	    name: 'sub-delimiter',
	    pattern: /^(\!|\&|\-|_|\.|;)/,
	    regex: function regex(match) {
	        return new RegExp(match[0]);
	    }
	}, {
	    // Unmatched fragment (until delimiter is found)
	    name: 'fragment',
	    pattern: /^([0-9a-zA-Z]+?)/,
	    regex: function regex(match) {
	        return new RegExp(match[0]);
	    }
	}];

	var tokenise = function tokenise(str) {
	    var tokens = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	    // Look for a matching rule
	    var matched = rules.some(function (rule) {
	        var match = str.match(rule.pattern);
	        if (!match) return false;

	        tokens.push({
	            type: rule.name,
	            match: match[0],
	            val: match.slice(1, 2),
	            otherVal: match.slice(2),
	            regex: rule.regex instanceof Function ? rule.regex(match) : rule.regex
	        });

	        if (match[0].length < str.length) tokens = tokenise(str.substr(match[0].length), tokens);
	        return true;
	    });
	    // If no rules matched, throw an error (possible malformed path)
	    if (!matched) {
	        throw new Error('Could not parse path.');
	    }
	    // Return tokens
	    return tokens;
	};

	var optTrailingSlash = function optTrailingSlash(source, trailingSlash) {
	    if (!trailingSlash) return source;
	    return source.replace(/\\\/$/, '') + '(?:\\/)?';
	};

	var appendQueryParam = function appendQueryParam(params, param) {
	    var val = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	    var existingVal = params[param];

	    if (existingVal === undefined) params[param] = val;else params[param] = Array.isArray(existingVal) ? existingVal.concat(val) : [existingVal, val];

	    return params;
	};

	var parseQueryParams = function parseQueryParams(path) {
	    var searchPart = path.split('?')[1];
	    if (!searchPart) return {};
	    return searchPart.split('&').map(function (_) {
	        return _.split('=');
	    }).reduce(function (obj, m) {
	        return appendQueryParam(obj, m[0], m[1] ? decodeURIComponent(m[1]) : m[1]);
	    }, {});
	};

	var toSerialisable = function toSerialisable(val) {
	    return val !== undefined && val !== null && val !== '' ? '=' + encodeURIComponent(val) : '';
	};

	var _serialise = function _serialise(key, val) {
	    return Array.isArray(val) ? val.map(function (v) {
	        return _serialise(key, v);
	    }).join('&') : key + toSerialisable(val);
	};

	var Path = (function () {
	    _createClass(Path, null, [{
	        key: 'createPath',
	        value: function createPath(path) {
	            return new Path(path);
	        }
	    }, {
	        key: 'serialise',
	        value: function serialise(key, val) {
	            return _serialise(key, val);
	        }
	    }]);

	    function Path(path) {
	        _classCallCheck(this, Path);

	        if (!path) throw new Error('Please supply a path');
	        this.path = path;
	        this.tokens = tokenise(path);

	        this.hasUrlParams = this.tokens.filter(function (t) {
	            return (/^url-parameter/.test(t.type)
	            );
	        }).length > 0;
	        this.hasSpatParam = this.tokens.filter(function (t) {
	            return (/splat$/.test(t.type)
	            );
	        }).length > 0;
	        this.hasMatrixParams = this.tokens.filter(function (t) {
	            return (/matrix$/.test(t.type)
	            );
	        }).length > 0;
	        this.hasQueryParams = this.tokens.filter(function (t) {
	            return t.type === 'query-parameter';
	        }).length > 0;
	        // Extract named parameters from tokens
	        this.urlParams = !this.hasUrlParams ? [] : this.tokens.filter(function (t) {
	            return (/^url-parameter/.test(t.type)
	            );
	        }).map(function (t) {
	            return t.val.slice(0, 1);
	        })
	        // Flatten
	        .reduce(function (r, v) {
	            return r.concat(v);
	        });
	        // Query params
	        this.queryParams = !this.hasQueryParams ? [] : this.tokens.filter(function (t) {
	            return t.type === 'query-parameter';
	        }).map(function (t) {
	            return t.val;
	        })
	        // Flatten
	        .reduce(function (r, v) {
	            return r.concat(v);
	        });
	        this.params = this.urlParams.concat(this.queryParams);
	        // Check if hasQueryParams
	        // Regular expressions for url part only (full and partial match)
	        this.source = this.tokens.filter(function (t) {
	            return t.regex !== undefined;
	        }).map(function (r) {
	            return r.regex.source;
	        }).join('');
	    }

	    _createClass(Path, [{
	        key: '_urlMatch',
	        value: function _urlMatch(path, regex) {
	            var _this = this;

	            var match = path.match(regex);
	            if (!match) return null;else if (!this.urlParams.length) return {};
	            // Reduce named params to key-value pairs
	            return match.slice(1, this.urlParams.length + 1).reduce(function (params, m, i) {
	                params[_this.urlParams[i]] = m;
	                return params;
	            }, {});
	        }
	    }, {
	        key: 'match',
	        value: function match(path) {
	            var _this2 = this;

	            var trailingSlash = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            // trailingSlash: falsy => non optional, truthy => optional
	            var source = optTrailingSlash(this.source, trailingSlash);
	            // Check if exact match
	            var match = this._urlMatch(path, new RegExp('^' + source + (this.hasQueryParams ? '\\?.*$' : '$')));
	            // If no match, or no query params, no need to go further
	            if (!match || !this.hasQueryParams) return match;
	            // Extract query params
	            var queryParams = parseQueryParams(path);
	            var unexpectedQueryParams = Object.keys(queryParams).filter(function (p) {
	                return _this2.queryParams.indexOf(p) === -1;
	            });

	            if (unexpectedQueryParams.length === 0) {
	                // Extend url match
	                Object.keys(queryParams).forEach(function (p) {
	                    return match[p] = queryParams[p];
	                });

	                return match;
	            }

	            return null;
	        }
	    }, {
	        key: 'partialMatch',
	        value: function partialMatch(path) {
	            var _this3 = this;

	            var trailingSlash = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            // Check if partial match (start of given path matches regex)
	            // trailingSlash: falsy => non optional, truthy => optional
	            var source = optTrailingSlash(this.source, trailingSlash);
	            var match = this._urlMatch(path, new RegExp('^' + source));

	            if (!match) return match;

	            if (!this.hasQueryParams) return match;

	            var queryParams = parseQueryParams(path);

	            Object.keys(queryParams).filter(function (p) {
	                return _this3.queryParams.indexOf(p) >= 0;
	            }).forEach(function (p) {
	                return appendQueryParam(match, p, queryParams[p]);
	            });

	            return match;
	        }
	    }, {
	        key: 'build',
	        value: function build() {
	            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var opts = arguments.length <= 1 || arguments[1] === undefined ? { ignoreConstraints: false, ignoreSearch: false } : arguments[1];

	            // Check all params are provided (not search parameters which are optional)
	            if (this.urlParams.some(function (p) {
	                return params[p] === undefined;
	            })) throw new Error('Missing parameters');

	            // Check constraints
	            if (!opts.ignoreConstraints) {
	                var constraintsPassed = this.tokens.filter(function (t) {
	                    return (/^url-parameter/.test(t.type) && !/-splat$/.test(t.type)
	                    );
	                }).every(function (t) {
	                    return new RegExp('^' + defaultOrConstrained(t.otherVal[0]) + '$').test(params[t.val]);
	                });

	                if (!constraintsPassed) throw new Error('Some parameters are of invalid format');
	            }

	            var base = this.tokens.filter(function (t) {
	                return t.type !== 'query-parameter';
	            }).map(function (t) {
	                if (t.type === 'url-parameter-matrix') return ';' + t.val[0] + '=' + params[t.val[0]];
	                return (/^url-parameter/.test(t.type) ? params[t.val[0]] : t.match
	                );
	            }).join('');

	            if (opts.ignoreSearch) return base;

	            var searchPart = this.queryParams.filter(function (p) {
	                return Object.keys(params).indexOf(p) !== -1;
	            }).map(function (p) {
	                return _serialise(p, params[p]);
	            }).join('&');

	            return base + (searchPart ? '?' + searchPart : '');
	        }
	    }]);

	    return Path;
	})();

	exports['default'] = Path;
	module.exports = exports['default'];

/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict'

	/**
	 * Expose `arrayFlatten`.
	 */
	module.exports = arrayFlatten

	/**
	 * Recursive flatten function with depth.
	 *
	 * @param  {Array}  array
	 * @param  {Array}  result
	 * @param  {Number} depth
	 * @return {Array}
	 */
	function flattenWithDepth (array, result, depth) {
	  for (var i = 0; i < array.length; i++) {
	    var value = array[i]

	    if (depth > 0 && Array.isArray(value)) {
	      flattenWithDepth(value, result, depth - 1)
	    } else {
	      result.push(value)
	    }
	  }

	  return result
	}

	/**
	 * Recursive flatten function. Omitting depth is slightly faster.
	 *
	 * @param  {Array} array
	 * @param  {Array} result
	 * @return {Array}
	 */
	function flattenForever (array, result) {
	  for (var i = 0; i < array.length; i++) {
	    var value = array[i]

	    if (Array.isArray(value)) {
	      flattenForever(value, result)
	    } else {
	      result.push(value)
	    }
	  }

	  return result
	}

	/**
	 * Flatten an array, with the ability to define a depth.
	 *
	 * @param  {Array}  array
	 * @param  {Number} depth
	 * @return {Array}
	 */
	function arrayFlatten (array, depth) {
	  if (depth == null) {
	    return flattenForever(array, [])
	  }

	  return flattenWithDepth(array, [], depth)
	}


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(89);


/***/ },
/* 89 */
/***/ function(module, exports) {

	
	/**
	 * An Array.prototype.slice.call(arguments) alternative
	 *
	 * @param {Object} args something with a length
	 * @param {Number} slice
	 * @param {Number} sliceEnd
	 * @api public
	 */

	module.exports = function (args, slice, sliceEnd) {
	  var ret = [];
	  var len = args.length;

	  if (0 === len) return ret;

	  var start = slice < 0
	    ? Math.max(0, slice + len)
	    : slice || 0;

	  if (sliceEnd !== undefined) {
	    len = sliceEnd < 0
	      ? sliceEnd + len
	      : sliceEnd
	  }

	  while (len-- > start) {
	    ret[len - start] = args[len];
	  }

	  return ret;
	}



/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 91 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 92 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ }
/******/ ]);