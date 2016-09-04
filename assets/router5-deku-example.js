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

	module.exports = __webpack_require__(28);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var slice = __webpack_require__(51)
	var flatten = __webpack_require__(50)

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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var errorCodes = exports.errorCodes = {
	    ROUTER_NOT_STARTED: 'NOT_STARTED',
	    NO_START_PATH_OR_STATE: 'NO_START_PATH_OR_STATE',
	    ROUTER_ALREADY_STARTED: 'ALREADY_STARTED',
	    ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
	    SAME_STATES: 'SAME_STATES',
	    CANNOT_DEACTIVATE: 'CANNOT_DEACTIVATE',
	    CANNOT_ACTIVATE: 'CANNOT_ACTIVATE',
	    TRANSITION_ERR: 'TRANSITION_ERR',
	    TRANSITION_CANCELLED: 'CANCELLED'
	};

	var constants = {
	    UNKNOWN_ROUTE: '@@router5/UNKNOWN_ROUTE',
	    ROUTER_START: '$start',
	    ROUTER_STOP: '$stop',
	    TRANSITION_START: '$$start',
	    TRANSITION_CANCEL: '$$cancel',
	    TRANSITION_SUCCESS: '$$success',
	    TRANSITION_ERROR: '$$error'
	};

	exports.default = constants;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.routerPlugin = exports.routeNode = exports.Link = undefined;

	var _Link = __webpack_require__(15);

	var _Link2 = _interopRequireDefault(_Link);

	var _routeNode = __webpack_require__(16);

	var _routeNode2 = _interopRequireDefault(_routeNode);

	var _routerPlugin = __webpack_require__(17);

	var _routerPlugin2 = _interopRequireDefault(_routerPlugin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Link = _Link2.default;
	exports.routeNode = _routeNode2.default;
	exports.routerPlugin = _routerPlugin2.default;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.nameToIDs = nameToIDs;

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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

	        var _loop = function _loop() {
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
	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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

	exports.default = transitionPath;

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11).Buffer))

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

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(53)
	var ieee754 = __webpack_require__(54)
	var isArray = __webpack_require__(55)

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

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

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
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
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
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11).Buffer, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _pathParser = __webpack_require__(64);

	var _pathParser2 = _interopRequireDefault(_pathParser);

	var _searchParams = __webpack_require__(65);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var noop = function noop() {};

	var RouteNode = function () {
	    function RouteNode() {
	        var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	        var path = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	        var childRoutes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	        var cb = arguments[3];

	        _classCallCheck(this, RouteNode);

	        this.name = name;
	        this.path = path;
	        this.parser = path ? new _pathParser2.default(path) : null;
	        this.children = [];

	        this.add(childRoutes, cb);

	        return this;
	    }

	    _createClass(RouteNode, [{
	        key: 'setPath',
	        value: function setPath() {
	            var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	            this.path = path;
	            this.parser = path ? new _pathParser2.default(path) : null;
	        }
	    }, {
	        key: 'add',
	        value: function add(route) {
	            var _this = this;

	            var cb = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];

	            var originalRoute = void 0;
	            if (route === undefined || route === null) return;

	            if (route instanceof Array) {
	                route.forEach(function (r) {
	                    return _this.add(r, cb);
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
	                originalRoute = route;
	                route = new RouteNode(route.name, route.path, route.children, cb);
	            }

	            var names = route.name.split('.');

	            if (names.length === 1) {
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

	                this.children.push(route);
	                // Push greedy spats to the bottom of the pile
	                this.children.sort(function (left, right) {
	                    var leftPath = left.path.split('?')[0].replace(/(.+)\/$/, '$1');
	                    var rightPath = right.path.split('?')[0].replace(/(.+)\/$/, '$1');
	                    // '/' last
	                    if (leftPath === '/') return 1;
	                    if (rightPath === '/') return -1;
	                    // Spat params last
	                    if (left.parser.hasSpatParam) return 1;
	                    if (right.parser.hasSpatParam) return -1;
	                    // No spat, number of segments (less segments last)
	                    var leftSegments = (leftPath.match(/\//g) || []).length;
	                    var rightSegments = (rightPath.match(/\//g) || []).length;
	                    if (leftSegments < rightSegments) return 1;
	                    if (leftSegments > rightSegments) return -1;
	                    // Same number of segments, number of URL params ascending
	                    var leftParamsCount = left.parser.urlParams.length;
	                    var rightParamsCount = right.parser.urlParams.length;
	                    if (leftParamsCount < rightParamsCount) return -1;
	                    if (leftParamsCount > rightParamsCount) return 1;
	                    // Same number of segments and params, last segment length descending
	                    var leftParamLength = (leftPath.split('/').slice(-1)[0] || '').length;
	                    var rightParamLength = (rightPath.split('/').slice(-1)[0] || '').length;
	                    if (leftParamLength < rightParamLength) return 1;
	                    if (leftParamLength > rightParamLength) return -1;
	                    // Same last segment length, preserve definition order
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

	            if (originalRoute) cb(originalRoute);

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
	            var routes = this.parser ? [this] : this.children;
	            var names = (this.parser ? [''] : []).concat(routeName.split('.'));

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
	        value: function getSegmentsMatchingPath(path, options) {
	            var trailingSlash = options.trailingSlash;
	            var strictQueryParams = options.strictQueryParams;

	            var matchChildren = function matchChildren(nodes, pathSegment, segments) {
	                var _loop = function _loop(i) {
	                    var child = nodes[i];
	                    // Partially match path
	                    var match = child.parser.partialMatch(pathSegment);
	                    var remainingPath = void 0;

	                    if (!match && trailingSlash) {
	                        // Try with optional trailing slash
	                        match = child.parser.match(pathSegment, true);
	                        remainingPath = '';
	                    } else if (match) {
	                        // Remove consumed segment from path
	                        var consumedPath = child.parser.build(match, { ignoreSearch: true });
	                        remainingPath = pathSegment.replace(consumedPath, '');
	                        var search = (0, _searchParams.omit)((0, _searchParams.getSearch)(pathSegment.replace(consumedPath, '')), child.parser.queryParams.concat(child.parser.queryParamsBr));
	                        remainingPath = (0, _searchParams.getPath)(remainingPath) + (search ? '?' + search : '');

	                        if (trailingSlash && remainingPath === '/' && !/\/$/.test(consumedPath)) {
	                            remainingPath = '';
	                        }
	                    }

	                    if (match) {
	                        segments.push(child);
	                        Object.keys(match).forEach(function (param) {
	                            return segments.params[param] = match[param];
	                        });

	                        if (!remainingPath.length || // fully matched
	                        !strictQueryParams && remainingPath.indexOf('?') === 0 // unmatched queryParams in non strict mode
	                        ) {
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

	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                }
	                return null;
	            };

	            var startingNodes = this.parser ? [this] : this.children;
	            var segments = [];
	            segments.params = {};

	            var matched = matchChildren(startingNodes, path, segments);
	            if (matched && matched.length === 1 && matched[0].name === '') return null;
	            return matched;
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
	            }).reduce(function (params, s) {
	                return params.concat(s.parser.queryParams).concat(s.parser.queryParamsBr.map(function (p) {
	                    return p + '[]';
	                }));
	            }, []);

	            var searchPart = !searchParams.length ? null : searchParams.filter(function (p) {
	                return Object.keys(params).indexOf((0, _searchParams.withoutBrackets)(p)) !== -1;
	            }).map(function (p) {
	                var val = params[(0, _searchParams.withoutBrackets)(p)];
	                var encodedVal = Array.isArray(val) ? val.map(encodeURIComponent) : encodeURIComponent(val);

	                return _pathParser2.default.serialise(p, encodedVal);
	            }).join('&');

	            return segments.map(function (segment) {
	                return segment.parser.build(params, { ignoreSearch: true });
	            }).join('') + (searchPart ? '?' + searchPart : '');
	        }
	    }, {
	        key: 'getMetaFromSegments',
	        value: function getMetaFromSegments(segments) {
	            var accName = '';

	            return segments.reduce(function (meta, segment) {
	                var urlParams = segment.parser.urlParams.reduce(function (params, p) {
	                    params[p] = 'url';
	                    return params;
	                }, {});

	                var allParams = segment.parser.queryParams.reduce(function (params, p) {
	                    params[p] = 'query';
	                    return params;
	                }, urlParams);

	                if (segment.name !== undefined) {
	                    accName = accName ? accName + '.' + segment.name : segment.name;
	                    meta[accName] = allParams;
	                }
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
	            }).filter(function (name) {
	                return name;
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
	        value: function matchPath(path, options) {
	            var defaultOptions = { trailingSlash: false, strictQueryParams: true };
	            options = _extends({}, defaultOptions, options);
	            return this.buildStateFromSegments(this.getSegmentsMatchingPath(path, options));
	        }
	    }]);

	    return RouteNode;
	}();

	exports.default = RouteNode;
	module.exports = exports['default'];


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* istanbul ignore next */
	function loggerPlugin() {
	    var startGroup = function startGroup() {
	        return console.group('Router transition');
	    };
	    var endGroup = function endGroup() {
	        return console.groupEnd('Router transition');
	    };

	    console.info('Router started');

	    return {
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
	        onTransitionCancel: function onTransitionCancel() {
	            console.warn('Transition cancelled');
	        },
	        onTransitionError: function onTransitionError(toState, fromState, err) {
	            console.warn('Transition error with code ' + err.code);
	            endGroup();
	        },
	        onTransitionSuccess: function onTransitionSuccess() {
	            console.log('Transition success');
	            endGroup();
	        }
	    };
	};

	exports.default = loggerPlugin;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var noop = exports.noop = function noop() {};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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

	        var className = (props.class ? props.class.split(' ') : []).concat(active ? [activeClass] : []).join(' ');

	        var onClick = props.onClick || clickHandler;

	        if (button) {
	            return element('button', { type: 'button', 'class': className, onClick: onClick }, children);
	        }

	        return { type: 'a', children: children, attributes: { href: href, 'class': className, onClick: onClick } };
	    }
	};

	exports.default = Link;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

	                return { type: RouteSegment, children: [], attributes: _extends({}, props, { route: route, previousRoute: previousRoute }) };
	            }
	        };

	        return RouteNode;
	    };
	}

	exports.default = routeNode;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
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

	exports.default = routerPlugin;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = configureRouter;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _router5 = __webpack_require__(63);

	var _router52 = _interopRequireDefault(_router5);

	var _router5PluginsLogger = __webpack_require__(13);

	var _router5PluginsLogger2 = _interopRequireDefault(_router5PluginsLogger);

	var _router5PluginsListeners = __webpack_require__(69);

	var _router5PluginsListeners2 = _interopRequireDefault(_router5PluginsListeners);

	var _router5PluginsBrowser = __webpack_require__(67);

	var _router5PluginsBrowser2 = _interopRequireDefault(_router5PluginsBrowser);

	var _routes = __webpack_require__(29);

	var _routes2 = _interopRequireDefault(_routes);

	function configureRouter() {
	    var useListenersPlugin = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	    var router = (0, _router52['default'])(_routes2['default'], {
	        defaultRoute: 'inbox'
	    })
	    // Plugins
	    .usePlugin(_router5PluginsLogger2['default']).usePlugin((0, _router5PluginsBrowser2['default'])({
	        useHash: true
	    }));

	    if (useListenersPlugin) {
	        router.usePlugin((0, _router5PluginsListeners2['default'])());
	    }

	    return router;
	}

	exports['default'] = configureRouter;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _Nav = __webpack_require__(26);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _Main = __webpack_require__(24);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _dekuRouter5 = __webpack_require__(3);

	var Compose = {
	    intitalState: function intitalState(props) {
	        return { title: '', message: '' };
	    },

	    render: function render(_ref, setState) {
	        var state = _ref.state;
	        var title = state.title;
	        var message = state.message;

	        var updateState = function updateState(prop) {
	            return function (evt) {
	                return setState(prop, evt.target.value);
	            };
	        };

	        return (0, _virtualElement2['default'])('div', { 'class': 'compose' }, [(0, _virtualElement2['default'])('h4', {}, 'Compose a new message'), (0, _virtualElement2['default'])('input', { name: 'title', value: title, onChange: updateState('title') }), (0, _virtualElement2['default'])('textarea', { name: 'message', value: message, onChange: updateState('message') })]);
	        // { warning ? <p>Clear inputs before continuing</p> : null }
	    }
	};

	exports['default'] = (0, _dekuRouter5.routeNode)('compose')(Compose);
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _InboxList = __webpack_require__(23);

	var _InboxList2 = _interopRequireDefault(_InboxList);

	var _Message = __webpack_require__(25);

	var _Message2 = _interopRequireDefault(_Message);

	var _dekuRouter5 = __webpack_require__(3);

	var _api = __webpack_require__(5);

	var Inbox = {
	    displayName: 'Inbox',
	    render: function render(_ref) {
	        var props = _ref.props;
	        var route = props.route;

	        return (0, _virtualElement2['default'])('div', { 'class': 'inbox' }, [(0, _virtualElement2['default'])(_InboxList2['default'], { emails: (0, _api.getEmails)() }), route && route.name === 'inbox.message' ? (0, _virtualElement2['default'])(_Message2['default'], { messageId: route.params.id, key: route.params.id }) : null]);
	    }
	};

	exports['default'] = (0, _dekuRouter5.routeNode)('inbox')(Inbox);
	module.exports = exports['default'];

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _InboxItem = __webpack_require__(22);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _dekuRouter5 = __webpack_require__(3);

	var _Inbox = __webpack_require__(21);

	var _Inbox2 = _interopRequireDefault(_Inbox);

	var _Compose = __webpack_require__(20);

	var _Compose2 = _interopRequireDefault(_Compose);

	var _NotFound = __webpack_require__(27);

	var _NotFound2 = _interopRequireDefault(_NotFound);

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

	exports['default'] = (0, _dekuRouter5.routeNode)('')(Main);
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _dekuRouter5 = __webpack_require__(3);

	var Nav = {
	    render: function render(_ref) {
	        var props = _ref.props;

	        return (0, _virtualElement2['default'])('nav', {}, [(0, _virtualElement2['default'])(_dekuRouter5.Link, { routeName: 'inbox', routeOptions: { reload: true } }, 'Inbox'), (0, _virtualElement2['default'])(_dekuRouter5.Link, { routeName: 'compose' }, 'Compose'), (0, _virtualElement2['default'])(_dekuRouter5.Link, { routeName: 'contacts' }, 'Contacts')]);
	    }
	};

	exports['default'] = Nav;
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

	var NotFound = {
	    render: function render() {
	        return (0, _virtualElement2['default'])('div', { 'class': 'not-found' }, 'Purposely not found (not a bug)');
	    }
	};

	exports['default'] = NotFound;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _deku = __webpack_require__(32);

	var _virtualElement = __webpack_require__(1);

	var _virtualElement2 = _interopRequireDefault(_virtualElement);

	var _dekuRouter5 = __webpack_require__(3);

	var _componentsApp = __webpack_require__(19);

	var _componentsApp2 = _interopRequireDefault(_componentsApp);

	var _createRouter = __webpack_require__(18);

	var _createRouter2 = _interopRequireDefault(_createRouter);

	var router = (0, _createRouter2['default'])(true);

	var app = (0, _deku.tree)().use((0, _dekuRouter5.routerPlugin)(router)).mount((0, _virtualElement2['default'])(_componentsApp2['default']));

	router.start(function (err, state) {
	    (0, _deku.render)(app, document.getElementById('app'));
	});

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = [{ name: 'inbox', path: '/inbox' }, { name: 'inbox.message', path: '/message/:id' }, { name: 'compose', path: '/compose' }, { name: 'contacts', path: '/contacts' }];
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(36)

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
/* 31 */
/***/ function(module, exports) {

	/**
	 * All of the events can bind to
	 */

	module.exports = {
	  onAbort: 'abort',
	  onBlur: 'blur',
	  onCanPlay: 'canplay',
	  onCanPlayThrough: 'canplaythrough',
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
	  onDurationChange: 'durationchange',
	  onEmptied: 'emptied',
	  onEncrypted: 'encrypted',
	  onEnded: 'ended',
	  onError: 'error',
	  onFocus: 'focus',
	  onInput: 'input',
	  onInvalid: 'invalid',
	  onKeyDown: 'keydown',
	  onKeyPress: 'keypress',
	  onKeyUp: 'keyup',
	  onLoad: 'load',
	  onLoadedData: 'loadeddata',
	  onLoadedMetadata: 'loadedmetadata',
	  onLoadStart: 'loadstart',
	  onPause: 'pause',
	  onPlay: 'play',
	  onPlaying: 'playing',
	  onProgress: 'progress',
	  onMouseDown: 'mousedown',
	  onMouseEnter: 'mouseenter',
	  onMouseLeave: 'mouseleave',
	  onMouseMove: 'mousemove',
	  onMouseOut: 'mouseout',
	  onMouseOver: 'mouseover',
	  onMouseUp: 'mouseup',
	  onPaste: 'paste',
	  onRateChange: 'ratechange',
	  onReset: 'reset',
	  onScroll: 'scroll',
	  onSeeked: 'seeked',
	  onSeeking: 'seeking',
	  onSubmit: 'submit',
	  onStalled: 'stalled',
	  onSuspend: 'suspend',
	  onTimeUpdate: 'timeupdate',
	  onTouchCancel: 'touchcancel',
	  onTouchEnd: 'touchend',
	  onTouchMove: 'touchmove',
	  onTouchStart: 'touchstart',
	  onVolumeChange: 'volumechange',
	  onWaiting: 'waiting',
	  onWheel: 'wheel'
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Create the application.
	 */

	exports.tree =
	exports.scene =
	exports.deku = __webpack_require__(30)

	/**
	 * Render scenes to the DOM.
	 */

	if (typeof document !== 'undefined') {
	  exports.render = __webpack_require__(33)
	}

	/**
	 * Render scenes to a string
	 */

	exports.renderString = __webpack_require__(34)


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Dependencies.
	 */

	var raf = __webpack_require__(37)
	var isDom = __webpack_require__(46)
	var uid = __webpack_require__(45)
	var keypath = __webpack_require__(49)
	var events = __webpack_require__(31)
	var svg = __webpack_require__(35)
	var defaults = __webpack_require__(10)
	var forEach = __webpack_require__(40)
	var assign = __webpack_require__(41)
	var reduce = __webpack_require__(44)
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
	    if (!connections[name]) return
	    connections[name].forEach(function (update) {
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
	    var componentEntities = components[entityId].entities
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
	    if (!value && typeof value !== 'number') {
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
	        /* falls through */
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

	  function registerEntity (entity) {
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

	  function registerSources (entity) {
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
	        return fn(e, entity.context, setState(entity))
	      } else {
	        return fn(e)
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
	  return el.tagName === 'INPUT' && ['text', 'search', 'password', 'tel', 'url'].indexOf(el.type) > -1
	}


/***/ },
/* 34 */
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
	    props.children = children

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
	      return true

	    case 'boolean':
	      return value

	    default:
	      return false
	  }
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  isElement: __webpack_require__(48).isElement,
	  isAttribute: __webpack_require__(47),
	  namespace: 'http://www.w3.org/2000/svg'
	}


/***/ },
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var forEachArray = __webpack_require__(38),
	    forEachObject = __webpack_require__(42);

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
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reduceArray = __webpack_require__(39),
	    reduceObject = __webpack_require__(43);

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
/* 45 */
/***/ function(module, exports) {

	/** generate unique id for selector */
	var counter = Date.now() % 1e9;

	module.exports = function getUid(){
		return (Math.random() * 1e9 >>> 0) + (counter++);
	};

/***/ },
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(52);


/***/ },
/* 52 */
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
/* 53 */
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
/* 54 */
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
/* 55 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = withMiddleware;
	function withMiddleware(router) {
	    var middlewareFactories = [];
	    var middlewareFunctions = [];

	    router.useMiddleware = useMiddleware;
	    router.getMiddlewareFunctions = getMiddlewareFunctions;
	    router.clearMiddleware = clearMiddleware;

	    function useMiddleware() {
	        for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	            middlewares[_key] = arguments[_key];
	        }

	        middlewares.forEach(addMiddleware);

	        return router;
	    }

	    function clearMiddleware() {
	        middlewareFactories = [];
	        middlewareFunctions = [];
	    }

	    function getMiddlewareFunctions() {
	        return middlewareFunctions;
	    }

	    function addMiddleware(middleware) {
	        middlewareFactories.push(middleware);
	        startMiddleware(middleware);
	    }

	    function startMiddleware(middleware) {
	        middlewareFunctions.push(router.executeFactory(middleware));
	    }
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = withNavigation;

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _transition = __webpack_require__(70);

	var _transition2 = _interopRequireDefault(_transition);

	var _utils = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function withNavigation(router) {
	    var cancelCurrentTransition = void 0;

	    router.navigate = navigate;
	    router.navigateToDefault = navigateToDefault;
	    router.transitionToState = transitionToState;
	    router.cancel = cancel;

	    function cancel() {
	        if (cancelCurrentTransition) {
	            cancelCurrentTransition('navigate');
	            cancelCurrentTransition = null;
	        }

	        return router;
	    }

	    function navigate() {
	        var name = arguments.length <= 0 ? undefined : arguments[0];
	        var lastArg = arguments.length <= arguments.length - 1 + 0 ? undefined : arguments[arguments.length - 1 + 0];
	        var done = typeof lastArg === 'function' ? lastArg : _utils.noop;
	        var params = _typeof(arguments.length <= 1 ? undefined : arguments[1]) === 'object' ? arguments.length <= 1 ? undefined : arguments[1] : {};
	        var opts = _typeof(arguments.length <= 2 ? undefined : arguments[2]) === 'object' ? arguments.length <= 2 ? undefined : arguments[2] : {};

	        if (!router.isStarted()) {
	            done({ code: _constants.errorCodes.ROUTER_NOT_STARTED });
	            return;
	        }

	        var toState = router.buildState(name, params);

	        if (!toState) {
	            var err = { code: _constants.errorCodes.ROUTE_NOT_FOUND };
	            done(err);
	            router.invokeEventListeners(_constants2.default.TRANSITION_ERROR, null, router.getState(), err);
	            return;
	        }

	        toState.path = router.buildPath(name, params);
	        var sameStates = router.getState() ? router.areStatesEqual(router.getState(), toState, false) : false;

	        // Do not proceed further if states are the same and no reload
	        // (no desactivation and no callbacks)
	        if (sameStates && !opts.reload) {
	            var _err = { code: _constants.errorCodes.SAME_STATES };
	            done(_err);
	            router.invokeEventListeners(_constants2.default.TRANSITION_ERROR, toState, router.getState(), _err);
	            return;
	        }

	        var fromState = sameStates ? null : router.getState();

	        // Transitio
	        return transitionToState(toState, fromState, opts, function (err, state) {
	            if (err) {
	                if (err.redirect) {
	                    var _err$redirect = err.redirect;
	                    var _name = _err$redirect.name;
	                    var _params = _err$redirect.params;


	                    navigate(_name, _params, _extends({}, opts, { reload: true }), done);
	                } else {
	                    done(err);
	                }
	            } else {
	                router.invokeEventListeners(_constants2.default.TRANSITION_SUCCESS, state, fromState, opts);
	                done(null, state);
	            }
	        });
	    }

	    function navigateToDefault() {
	        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	        var done = arguments.length <= 1 || arguments[1] === undefined ? _utils.noop : arguments[1];

	        var options = router.getOptions();

	        return navigate(options.defaultRoute, options.defaultParams, opts, done);
	    }

	    function transitionToState(toState, fromState) {
	        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	        var done = arguments.length <= 3 || arguments[3] === undefined ? _utils.noop : arguments[3];

	        cancel();
	        router.invokeEventListeners(_constants2.default.TRANSITION_START, toState, fromState);

	        cancelCurrentTransition = (0, _transition2.default)(router, toState, fromState, options, function (err, state) {
	            cancelCurrentTransition = null;
	            state = state || toState;

	            if (err) {
	                if (err.code === _constants.errorCodes.TRANSITION_CANCELLED) {
	                    router.invokeEventListeners(_constants2.default.TRANSITION_CANCELLED, toState, fromState);
	                } else {
	                    router.invokeEventListeners(_constants2.default.TRANSITION_ERROR, toState, fromState, err);
	                }
	                done(err);
	            } else {
	                router.setState(state);
	                done(null, state);
	            }
	        });

	        return cancelCurrentTransition;
	    }
	}

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = withPlugins;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var pluginMethods = ['onStart', 'onStop', 'onTransitionSuccess', 'onTransitionStart', 'onTransitionError', 'onTransitionCancel'];

	function withPlugins(router) {
	    var plugins = [];
	    var removePluginListeners = [];

	    router.usePlugin = usePlugin;
	    router.hasPlugin = hasPlugin;

	    function usePlugin() {
	        for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
	            plugins[_key] = arguments[_key];
	        }

	        plugins.forEach(addPlugin);
	        return router;
	    }

	    function addPlugin(plugin) {
	        if (!hasPlugin(plugin)) {
	            plugins.push(plugin);
	            startPlugin(plugin);
	        }
	    }

	    function hasPlugin(pluginName) {
	        return plugins.filter(function (p) {
	            return p.name === pluginName;
	        }).length > 0;
	    }

	    function startPlugin(plugin) {
	        var appliedPlugin = router.executeFactory(plugin);

	        var removeEventListeners = pluginMethods.map(function (methodName) {
	            if (appliedPlugin[methodName]) {
	                return router.addEventListener(methodName.toLowerCase().replace(/^on/, '$$').replace(/transition/, '$$'), appliedPlugin[methodName]);
	            }
	        }).filter(Boolean);

	        removePluginListeners.push.apply(removePluginListeners, _toConsumableArray(removeEventListeners));
	    }
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = withRouteLifecycle;

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var toFunction = function toFunction(val) {
	    return typeof val === 'function' ? val : function () {
	        return function () {
	            return val;
	        };
	    };
	};

	function withRouteLifecycle(router) {
	    var canActivateFactories = {};
	    var canActivateFunctions = {};
	    var canDeactivateFactories = {};
	    var canDeactivateFunctions = {};

	    router.canDeactivate = canDeactivate;
	    router.canActivate = canActivate;
	    router.getLifecycleFunctions = getLifecycleFunctions;
	    router.clearCanDeactivate = clearCanDeactivate;

	    function getLifecycleFunctions() {
	        return [canDeactivateFunctions, canActivateFunctions];
	    }

	    function canDeactivate(name, canDeactivateHandler) {
	        var factory = toFunction(canDeactivateHandler);

	        canDeactivateFactories[name] = factory;

	        if (router.isStarted()) {
	            canDeactivateFunctions[name] = router.executeFactory(factory);
	        }

	        return router;
	    }

	    function clearCanDeactivate(name) {
	        canDeactivateFactories[name] = undefined;
	        canDeactivateFunctions[name] = undefined;
	    }

	    function canActivate(name, canActivateHandler) {
	        var factory = toFunction(canActivateHandler);
	        canActivateFactories[name] = factory;

	        if (router.isStarted()) {
	            canActivateFunctions[name] = router.executeFactory(factory);
	        }

	        return router;
	    }

	    function executeFactories() {
	        var reduceFactories = function reduceFactories(factories) {
	            return Object.keys(factories).reduce(function (functionsMap, key) {
	                if (factories[key]) {
	                    functionsMap[key] = router.executeFactory(factories[key]);
	                }
	                return functionsMap;
	            }, {});
	        };

	        canActivateFunctions = reduceFactories(canActivateFactories);
	        canDeactivateFunctions = reduceFactories(canDeactivateFactories);
	    }

	    router.addEventListener(_constants2.default.ROUTER_START, executeFactories);
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = withRouterLifecycle;

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _utils = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function withRouterLifecycle(router) {
	    var started = false;
	    var options = router.getOptions();

	    router.isStarted = isStarted;
	    router.start = start;
	    router.stop = stop;

	    function isStarted() {
	        return started;
	    }

	    function start() {
	        var lastArg = arguments.length <= arguments.length - 1 + 0 ? undefined : arguments[arguments.length - 1 + 0];
	        var done = typeof lastArg === 'function' ? lastArg : _utils.noop;
	        var startPathOrState = typeof (arguments.length <= 0 ? undefined : arguments[0]) !== 'function' ? arguments.length <= 0 ? undefined : arguments[0] : undefined;

	        if (started) {
	            done({ code: _constants.errorCodes.ROUTER_ALREADY_STARTED });
	            return router;
	        }

	        var startPath = void 0,
	            startState = void 0;

	        started = true;
	        router.invokeEventListeners(_constants2.default.ROUTER_START);

	        // callback
	        var cb = function cb(err, state) {
	            var invokeErrCb = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	            if (!err) router.invokeEventListeners(_constants2.default.TRANSITION_SUCCESS, state, null, { replace: true });
	            if (err && invokeErrCb) router.invokeEventListeners(_constants2.default.TRANSITION_ERROR, state, null, err);
	            done(err, state);
	        };

	        if (startPathOrState === undefined && !options.defaultRoute) {
	            return cb({ code: _constants.errorCodes.NO_START_PATH_OR_STATE });
	        }if (typeof startPathOrState === 'string') {
	            startPath = startPathOrState;
	        } else if ((typeof startPathOrState === 'undefined' ? 'undefined' : _typeof(startPathOrState)) === 'object') {
	            startState = startPathOrState;
	        }

	        if (!startState) {
	            (function () {
	                // If no supplied start state, get start state
	                startState = startPath === undefined ? null : router.matchPath(startPath);
	                // Navigate to default function
	                var navigateToDefault = function navigateToDefault() {
	                    return router.navigateToDefault({ replace: true }, done);
	                };
	                var redirect = function redirect(route) {
	                    return router.navigate(route.name, route.params, { replace: true, reload: true }, done);
	                };
	                // If matched start path
	                if (startState) {
	                    router.transitionToState(startState, router.getState(), {}, function (err, state) {
	                        if (!err) cb(null, state);else if (err.redirect) redirect(err.redirect);else if (options.defaultRoute) navigateToDefault();else cb(err, null, false);
	                    });
	                } else if (options.defaultRoute) {
	                    // If default, navigate to default
	                    navigateToDefault();
	                } else if (options.allowNotFound) {
	                    cb(null, router.makeNotFoundState(startPath));
	                } else {
	                    // No start match, no default => do nothing
	                    cb({ code: _constants.errorCodes.ROUTE_NOT_FOUND, path: startPath }, null);
	                }
	            })();
	        } else {
	            // Initialise router with provided start state
	            router.setState(startState);
	            done(null, startState);
	        }

	        return router;
	    }

	    function stop() {
	        if (started) {
	            router.setState(null);
	            started = false;
	            router.invokeEventListeners(_constants2.default.ROUTER_STOP);
	        }

	        return router;
	    }
	}

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = withUtils;
	function withUtils(router) {
	    var options = router.getOptions();

	    router.isActive = isActive;
	    router.areStatesEqual = areStatesEqual;
	    router.areStatesDescendants = areStatesDescendants;
	    router.buildPath = buildPath;
	    router.buildState = buildState;
	    router.matchPath = matchPath;
	    router.setRootPath = setRootPath;

	    function isActive(name) {
	        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        var strictEquality = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	        var ignoreQueryParams = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

	        var activeState = router.getState();

	        if (!activeState) return false;

	        if (strictEquality || activeState.name === name) {
	            return areStatesEqual(router.makeState(name, params), activeState, ignoreQueryParams);
	        }

	        return areStatesDescendants(router.makeState(name, params), activeState);
	    }

	    function areStatesEqual(state1, state2) {
	        var ignoreQueryParams = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	        if (state1.name !== state2.name) return false;

	        var getUrlParams = function getUrlParams(name) {
	            return router.rootNode.getSegmentsByName(name).map(function (segment) {
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

	    function areStatesDescendants(parentState, childState) {
	        var regex = new RegExp('^' + parentState.name + '\\.(.*)$');
	        if (!regex.test(childState.name)) return false;
	        // If child state name extends parent state name, and all parent state params
	        // are in child state params.
	        return Object.keys(parentState.params).every(function (p) {
	            return parentState.params[p] === childState.params[p];
	        });
	    }

	    function buildPath(route, params) {
	        return router.rootNode.buildPath(route, params);
	    }

	    function buildState(route, params) {
	        return router.rootNode.buildState(route, params);
	    }

	    function matchPath(path, source) {
	        var trailingSlash = options.trailingSlash;
	        var strictQueryParams = options.strictQueryParams;

	        var match = router.rootNode.matchPath(path, { trailingSlash: trailingSlash, strictQueryParams: strictQueryParams });
	        return match ? router.makeState(match.name, match.params, path, match._meta, source) : null;
	    }

	    function setRootPath(rootPath) {
	        router.rootNode.setPath(rootPath);
	    }
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _routeNode = __webpack_require__(12);

	var _routeNode2 = _interopRequireDefault(_routeNode);

	var _utils = __webpack_require__(61);

	var _utils2 = _interopRequireDefault(_utils);

	var _routerLifecycle = __webpack_require__(60);

	var _routerLifecycle2 = _interopRequireDefault(_routerLifecycle);

	var _navigation = __webpack_require__(57);

	var _navigation2 = _interopRequireDefault(_navigation);

	var _middleware = __webpack_require__(56);

	var _middleware2 = _interopRequireDefault(_middleware);

	var _plugins = __webpack_require__(58);

	var _plugins2 = _interopRequireDefault(_plugins);

	var _routeLifecycle = __webpack_require__(59);

	var _routeLifecycle2 = _interopRequireDefault(_routeLifecycle);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var defaultOptions = {
	    trailingSlash: 0,
	    autoCleanUp: true,
	    strictQueryParams: true,
	    allowNotFound: false
	};

	function createRouter(routes, opts) {
	    var routerState = null;
	    var callbacks = {};
	    var dependencies = {};
	    var options = _extends({}, defaultOptions, opts);

	    var router = {
	        rootNode: rootNode,
	        getOptions: getOptions,
	        setOption: setOption,
	        getState: getState,
	        setState: setState,
	        makeState: makeState,
	        makeNotFoundState: makeNotFoundState,
	        setDependency: setDependency,
	        setDependencies: setDependencies,
	        getDependencies: getDependencies,
	        add: add,
	        addNode: addNode,
	        executeFactory: executeFactory,
	        addEventListener: addEventListener,
	        removeEventListener: removeEventListener,
	        invokeEventListeners: invokeEventListeners
	    };

	    function invokeEventListeners(eventName) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        (callbacks[eventName] || []).forEach(function (cb) {
	            return cb.apply(undefined, args);
	        });
	    }

	    function removeEventListener(eventName, cb) {
	        callbacks[eventName] = callbacks[eventName].filter(function (_cb) {
	            return _cb !== cb;
	        });
	    }

	    function addEventListener(eventName, cb) {
	        callbacks[eventName] = (callbacks[eventName] || []).concat(cb);

	        return function () {
	            return removeEventListener(eventName, cb);
	        };
	    }

	    (0, _utils2.default)(router);
	    (0, _plugins2.default)(router);
	    (0, _middleware2.default)(router);
	    (0, _routeLifecycle2.default)(router);
	    (0, _routerLifecycle2.default)(router);
	    (0, _navigation2.default)(router);

	    var rootNode = routes instanceof _routeNode2.default ? routes : new _routeNode2.default('', '', routes, addCanActivate);

	    router.rootNode = rootNode;

	    return router;

	    function addCanActivate(route) {
	        if (route.canActivate) router.canActivate(route.name, route.canActivate);
	    }

	    function makeState(name, params, path, metaParams, source) {
	        var state = {};
	        var setProp = function setProp(key, value) {
	            return Object.defineProperty(state, key, { value: value, enumerable: true });
	        };
	        setProp('name', name);
	        setProp('params', params);
	        setProp('path', path);
	        if (metaParams || source) {
	            var meta = { params: metaParams };

	            if (source) meta.source = source;

	            setProp('meta', meta);
	        }
	        return state;
	    }

	    function makeNotFoundState(path) {
	        return makeState(_constants2.default.UNKNOWN_ROUTE, { path: path }, path, {});
	    }

	    function getState() {
	        return routerState;
	    }

	    function setState(state) {
	        routerState = state;
	    }

	    function getOptions() {
	        return options;
	    }

	    function setOption(option, value) {
	        options[option] = value;
	        return router;
	    }

	    function setDependency(dependencyName, dependency) {
	        dependencies[dependencyName] = dependency;
	        return router;
	    }

	    function setDependencies(deps) {
	        Object.keys(deps).forEach(function (depName) {
	            dependencies[depName] = deps[depName];
	        });
	    }

	    function getDependencies() {
	        return dependencies;
	    }

	    function getInjectables() {
	        return [router, dependencies];
	    }

	    function executeFactory(factoryFunction) {
	        return factoryFunction.apply(undefined, _toConsumableArray(getInjectables()));
	    }

	    function add(routes) {
	        rootNode.add(routes, addCanActivate);
	        return router;
	    }

	    function addNode(name, path, canActivateHandler) {
	        rootNode.addNode(name, path);
	        if (canActivateHandler) router.canActivate(name, canActivateHandler);
	        return router;
	    }
	}

	exports.default = createRouter;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.constants = exports.transitionPath = exports.errorCodes = exports.loggerPlugin = exports.RouteNode = exports.createRouter = undefined;

	var _createRouter = __webpack_require__(62);

	var _createRouter2 = _interopRequireDefault(_createRouter);

	var _routeNode = __webpack_require__(12);

	var _routeNode2 = _interopRequireDefault(_routeNode);

	var _logger = __webpack_require__(13);

	var _logger2 = _interopRequireDefault(_logger);

	var _router = __webpack_require__(4);

	var _router2 = _interopRequireDefault(_router);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _createRouter2.default;
	exports.createRouter = _createRouter2.default;
	exports.RouteNode = _routeNode2.default;
	exports.loggerPlugin = _logger2.default;
	exports.errorCodes = _constants.errorCodes;
	exports.transitionPath = _router2.default;
	exports.constants = _constants2.default;

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultOrConstrained = function defaultOrConstrained(match) {
	    return '(' + (match ? match.replace(/(^<|>$)/g, '') : '[a-zA-Z0-9-_.~%]+') + ')';
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
	    name: 'query-parameter-bracket',
	    pattern: /^(?:\?|&)(?:\:)?([a-zA-Z0-9-_]*[a-zA-Z0-9]{1})(?:\[\])/
	}, // regex:   match => new RegExp('(?=(\?|.*&)' + match[0] + '(?=(\=|&|$)))')
	{
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
	    pattern: /^([0-9a-zA-Z]+)/,
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

	var withoutBrackets = function withoutBrackets(param) {
	    return param.replace(/\[\]$/, '');
	};

	var appendQueryParam = function appendQueryParam(params, param) {
	    var val = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	    if (/\[\]$/.test(param)) {
	        param = withoutBrackets(param);
	        val = [val];
	    }
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
	    return val !== undefined && val !== null && val !== '' ? '=' + val : '';
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
	            return (/^query-parameter/.test(t.type)
	            );
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
	        }).reduce(function (r, v) {
	            return r.concat(v);
	        }, []);

	        this.queryParamsBr = !this.hasQueryParams ? [] : this.tokens.filter(function (t) {
	            return (/-bracket$/.test(t.type)
	            );
	        }).map(function (t) {
	            return t.val;
	        }).reduce(function (r, v) {
	            return r.concat(v);
	        }, []);

	        this.params = this.urlParams.concat(this.queryParams).concat(this.queryParamsBr);
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
	                params[_this.urlParams[i]] = decodeURIComponent(m);
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
	            var matched = this._urlMatch(path, new RegExp('^' + source + (this.hasQueryParams ? '(\\?.*$|$)' : '$')));
	            // If no match, or no query params, no need to go further
	            if (!matched || !this.hasQueryParams) return matched;
	            // Extract query params
	            var queryParams = parseQueryParams(path);
	            var unexpectedQueryParams = Object.keys(queryParams).filter(function (p) {
	                return _this2.queryParams.concat(_this2.queryParamsBr).indexOf(p) === -1;
	            });

	            if (unexpectedQueryParams.length === 0) {
	                // Extend url match
	                Object.keys(queryParams).forEach(function (p) {
	                    return matched[p] = queryParams[p];
	                });

	                return matched;
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
	                return _this3.queryParams.concat(_this3.queryParamsBr).indexOf(p) >= 0;
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

	            var encodedParams = Object.keys(params).reduce(function (acc, key) {
	                // Use encodeURI in case of spats
	                if (params[key] === undefined) {
	                    acc[key] = undefined;
	                } else {
	                    acc[key] = Array.isArray(params[key]) ? params[key].map(encodeURI) : encodeURI(params[key]);
	                }
	                return acc;
	            }, {});
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
	                    return new RegExp('^' + defaultOrConstrained(t.otherVal[0]) + '$').test(encodedParams[t.val]);
	                });

	                if (!constraintsPassed) throw new Error('Some parameters are of invalid format');
	            }

	            var base = this.tokens.filter(function (t) {
	                return (/^query-parameter/.test(t.type) === false
	                );
	            }).map(function (t) {
	                if (t.type === 'url-parameter-matrix') return ';' + t.val + '=' + encodedParams[t.val[0]];
	                return (/^url-parameter/.test(t.type) ? encodedParams[t.val[0]] : t.match
	                );
	            }).join('');

	            if (opts.ignoreSearch) return base;

	            var queryParams = this.queryParams.concat(this.queryParamsBr.map(function (p) {
	                return p + '[]';
	            }));

	            var searchPart = queryParams.filter(function (p) {
	                return Object.keys(encodedParams).indexOf(withoutBrackets(p)) !== -1;
	            }).map(function (p) {
	                return _serialise(p, encodedParams[withoutBrackets(p)]);
	            }).join('&');

	            return base + (searchPart ? '?' + searchPart : '');
	        }
	    }]);

	    return Path;
	})();

	exports.default = Path;
	module.exports = exports['default'];


/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// Split path
	var getPath = exports.getPath = function getPath(path) {
	    return path.split('?')[0];
	};
	var getSearch = exports.getSearch = function getSearch(path) {
	    return path.split('?')[1];
	};

	// Search param value
	var isSerialisable = function isSerialisable(val) {
	    return val !== undefined && val !== null && val !== '';
	};

	// Search param name
	var bracketTest = /\[\]$/;
	var hasBrackets = exports.hasBrackets = function hasBrackets(paramName) {
	    return bracketTest.test(paramName);
	};
	var withoutBrackets = exports.withoutBrackets = function withoutBrackets(paramName) {
	    return paramName.replace(bracketTest, '');
	};

	/**
	 * Parse a querystring and return a list of params (Objects with name and value properties)
	 * @param  {String} querystring The querystring to parse
	 * @return {Array[Object]}      The list of params
	 */
	var parse = exports.parse = function parse(querystring) {
	    return querystring.split('&').reduce(function (params, param) {
	        var split = param.split('=');
	        var name = split[0];
	        var value = split[1];
	        return params.concat({ name: name, value: decodeURIComponent(value) });
	    }, []);
	};

	/**
	 * Reduce a list of parameters (returned by `.parse()``) to an object (key-value pairs)
	 * @param  {Array} paramList The list of parameters returned by `.parse()`
	 * @return {Object}          The object of parameters (key-value pairs)
	 */
	var toObject = exports.toObject = function toObject(paramList) {
	    return paramList.reduce(function (params, _ref) {
	        var name = _ref.name;
	        var value = _ref.value;

	        var isArray = hasBrackets(name);
	        var currentValue = params[withoutBrackets(name)];

	        if (currentValue === undefined) {
	            params[withoutBrackets(name)] = isArray ? [value] : value;
	        } else {
	            params[withoutBrackets(name)] = [].concat(currentValue, value);
	        }

	        return params;
	    }, {});
	};

	/**
	 * Build a querystring from a list of parameters
	 * @param  {Array} paramList The list of parameters (see `.parse()`)
	 * @return {String}          The querystring
	 */
	var build = exports.build = function build(paramList) {
	    return paramList.map(function (_ref2) {
	        var name = _ref2.name;
	        var value = _ref2.value;
	        return [name].concat(isSerialisable(value) ? encodeURIComponent(value) : []);
	    }).map(function (param) {
	        return param.join('=');
	    }).join('&');
	};

	/**
	 * Remove a list of parameters from a querystring
	 * @param  {String} querystring  The original querystring
	 * @param  {Array}  paramsToOmit The parameters to omit
	 * @return {String}              The querystring
	 */
	var omit = exports.omit = function omit(querystring, paramsToOmit) {
	    if (!querystring) return '';

	    var remainingQueryParams = parse(querystring).filter(function (_ref3) {
	        var name = _ref3.name;
	        return paramsToOmit.indexOf(withoutBrackets(name)) === -1;
	    });
	    var remainingQueryString = build(remainingQueryParams);

	    return remainingQueryString || '';
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Dumb functions
	 */
	// istanbul ignore next
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
	var isBrowser = typeof window !== 'undefined' && window.history;

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
	    return (path || '/') + window.location.search;
	};

	var getState = function getState() {
	    return window.history.state;
	};

	/**
	 * Export browser object
	 */
	var browser = {};
	if (isBrowser) {
	    browser = { getBase: getBase, pushState: pushState, replaceState: replaceState, addPopstateListener: addPopstateListener, removePopstateListener: removePopstateListener, getLocation: getLocation, getState: getState };
	} else {
	    // istanbul ignore next
	    browser = {
	        getBase: identity(''),
	        pushState: noop,
	        replaceState: noop,
	        addPopstateListener: noop,
	        removePopstateListener: noop,
	        getLocation: identity(''),
	        getState: identity(null)
	    };
	}

	exports.default = browser;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _browser = __webpack_require__(66);

	var _browser2 = _interopRequireDefault(_browser);

	var _utils = __webpack_require__(68);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultOptions = {
	    forceDeactivate: true,
	    useHash: false,
	    hashPrefix: '',
	    base: false
	};

	var source = 'popstate';

	function browserPluginFactory() {
	    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var browser = arguments.length <= 1 || arguments[1] === undefined ? _browser2.default : arguments[1];

	    var options = _extends({}, defaultOptions, opts);
	    var transitionOptions = { forceDeactivate: options.forceDeactivate, source: source };

	    return function browserPlugin(router) {
	        var routerOptions = router.getOptions();
	        var routerStart = router.start;

	        (0, _utils2.default)(router, options);

	        router.start = function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            if (args.length === 0 || typeof args[0] === 'function') {
	                routerStart.apply(undefined, [browser.getLocation(options)].concat(args));
	            } else {
	                routerStart.apply(undefined, args);
	            }
	        };

	        router.replaceHistoryState = function (name) {
	            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            var state = router.buildState(name, params);
	            var url = router.buildUrl(name, params);
	            router.lastKnownState = state;
	            browser.replaceState(state, '', url);
	        };

	        function updateBrowserState(state, url, replace) {
	            if (replace) browser.replaceState(state, '', url);else browser.pushState(state, '', url);
	        }

	        function onPopState(evt) {
	            var routerState = router.getState();
	            // Do nothing if no state or if last know state is poped state (it should never happen)
	            var newState = !evt.state || !evt.state.name;
	            var state = newState ? router.matchPath(browser.getLocation(router.routerOptions), source) : evt.state;
	            var defaultRoute = routerOptions.defaultRoute;
	            var defaultParams = routerOptions.defaultParams;


	            if (!state) {
	                // If current state is already the default route, we will have a double entry
	                // Navigating back and forth will emit SAME_STATES error
	                defaultRoute && router.navigateToDefault(_extends({}, transitionOptions, { reload: true, replace: true }));
	                return;
	            }
	            if (routerState && router.areStatesEqual(state, routerState, false)) {
	                return;
	            }

	            router.transitionToState(state, routerState, transitionOptions, function (err, toState) {
	                if (err) {
	                    if (err.redirect) {
	                        var _err$redirect = err.redirect;
	                        var name = _err$redirect.name;
	                        var params = _err$redirect.params;


	                        router.navigate(name, params, _extends({}, transitionOptions, { replace: true }));
	                    } else if (err === _constants.errorCodes.CANNOT_DEACTIVATE) {
	                        var url = router.buildUrl(routerState.name, routerState.params);
	                        if (!newState) {
	                            // Keep history state unchanged but use current URL
	                            updateBrowserState(state, url, true);
	                        }
	                        // else do nothing or history will be messed up
	                        // TODO: history.back()?
	                    } else {
	                        // Force navigation to default state
	                        defaultRoute && router.navigate(defaultRoute, defaultParams, _extends({}, transitionOptions, { reload: true, replace: true }));
	                    }
	                } else {
	                    router.invokeEventListeners(_constants2.default.TRANSITION_SUCCESS, toState, routerState, { replace: true });
	                }
	            });
	        }

	        function onStart() {
	            if (options.useHash && !options.base) {
	                // Guess base
	                options.base = browser.getBase();
	            }

	            browser.addPopstateListener(onPopState);
	        }

	        function onStop() {
	            browser.removePopstateListener(onPopState);
	        }

	        function onTransitionSuccess(toState, fromState, opts) {
	            var historyState = browser.getState();
	            var replace = opts.replace || fromState && router.areStatesEqual(toState, fromState, false) || opts.reload && historyState && router.areStatesEqual(toState, historyState, false);
	            updateBrowserState(toState, router.buildUrl(toState.name, toState.params), replace);
	        }

	        return { onStart: onStart, onStop: onStop, onTransitionSuccess: onTransitionSuccess, onPopState: onPopState };
	    };
	}

	exports.default = browserPluginFactory;

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = withUtils;
	function withUtils(router, options) {
	    router.urlToPath = urlToPath;
	    router.buildUrl = buildUrl;
	    router.matchUrl = matchUrl;

	    function buildUrl(route, params) {
	        return (options.base || '') + (options.useHash ? '#' + options.hashPrefix : '') + router.buildPath(route, params);
	    }

	    function urlToPath(url) {
	        var match = url.match(/^(?:http|https)\:\/\/(?:[0-9a-z_\-\.\:]+?)(?=\/)(.*)$/);
	        var path = match ? match[1] : url;

	        var pathParts = path.match(/^(.+?)(#.+?)?(\?.+)?$/);

	        if (!pathParts) throw new Error('[router5] Could not parse url ' + url);

	        var pathname = pathParts[1];
	        var hash = pathParts[2] || '';
	        var search = pathParts[3] || '';

	        return (options.useHash ? hash.replace(new RegExp('^#' + options.hashPrefix), '') : options.base ? pathname.replace(new RegExp('^' + options.base), '') : pathname) + search;
	    }

	    function matchUrl(url) {
	        return router.matchPath(urlToPath(url));
	    }
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _router = __webpack_require__(4);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultOptions = {
	    autoCleanUp: true
	};

	function listenersPluginFactory() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

	    return function listenersPlugin(router) {
	        var listeners = {};

	        function removeListener(name, cb) {
	            if (cb) {
	                if (listeners[name]) listeners[name] = listeners[name].filter(function (callback) {
	                    return callback !== cb;
	                });
	            } else {
	                listeners[name] = [];
	            }
	            return router;
	        };

	        function addListener(name, cb, replace) {
	            var normalizedName = name.replace(/^(\*|\^|=)/, '');

	            if (normalizedName && !/^\$/.test(name)) {
	                var segments = router.rootNode.getSegmentsByName(normalizedName);
	                if (!segments) console.warn('No route found for ' + normalizedName + ', listener might never be called!');
	            }

	            if (!listeners[name]) listeners[name] = [];
	            listeners[name] = (replace ? [] : listeners[name]).concat(cb);

	            return router;
	        };

	        router.getListeners = function () {
	            return listeners;
	        };

	        router.addListener = function (cb) {
	            return addListener('*', cb);
	        };
	        router.removeListener = function (cb) {
	            return removeListener('*', cb);
	        };

	        router.addNodeListener = function (name, cb) {
	            return addListener('^' + name, cb, true);
	        };
	        router.removeNodeListener = function (name, cb) {
	            return removeListener('^' + name, cb);
	        };

	        router.addRouteListener = function (name, cb) {
	            return addListener('=' + name, cb);
	        };
	        router.removeRouteListener = function (name, cb) {
	            return removeListener('=' + name, cb);
	        };

	        function invokeListeners(name, toState, fromState) {
	            (listeners[name] || []).forEach(function (cb) {
	                return cb(toState, fromState);
	            });
	        }

	        function onTransitionSuccess(toState, fromState, opts) {
	            var _transitionPath = (0, _router2.default)(toState, fromState);

	            var intersection = _transitionPath.intersection;
	            var toDeactivate = _transitionPath.toDeactivate;

	            var intersectionNode = opts.reload ? '' : intersection;
	            var name = toState.name;


	            if (options.autoCleanUp) {
	                toDeactivate.forEach(function (name) {
	                    return removeListener('^' + name);
	                });
	            }

	            invokeListeners('^' + intersectionNode, toState, fromState);
	            invokeListeners('=' + name, toState, fromState);
	            invokeListeners('*', toState, fromState);
	        }

	        return { onTransitionSuccess: onTransitionSuccess };
	    };
	}

	exports.default = listenersPluginFactory;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _router = __webpack_require__(4);

	var _router2 = _interopRequireDefault(_router);

	var _resolve = __webpack_require__(71);

	var _resolve2 = _interopRequireDefault(_resolve);

	var _constants = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	exports.default = transition;


	function transition(router, toState, fromState, opts, callback) {
	    var cancelled = false;
	    var completed = false;
	    var options = router.getOptions();

	    var _router$getLifecycleF = router.getLifecycleFunctions();

	    var _router$getLifecycleF2 = _slicedToArray(_router$getLifecycleF, 2);

	    var canDeactivateFunctions = _router$getLifecycleF2[0];
	    var canActivateFunctions = _router$getLifecycleF2[1];

	    var middlewareFunctions = router.getMiddlewareFunctions();
	    var isCancelled = function isCancelled() {
	        return cancelled;
	    };
	    var cancel = function cancel() {
	        if (!cancelled && !completed) {
	            cancelled = true;
	            callback({ code: _constants.errorCodes.TRANSITION_CANCELLED }, null);
	        }
	    };
	    var done = function done(err, state) {
	        completed = true;

	        if (isCancelled()) {
	            return;
	        }

	        if (!err && options.autoCleanUp) {
	            (function () {
	                var activeSegments = (0, _router.nameToIDs)(toState.name);
	                Object.keys(canDeactivateFunctions).forEach(function (name) {
	                    if (activeSegments.indexOf(name) === -1) router.clearCanDeactivate(name);
	                });
	            })();
	        }

	        callback(err, state || toState);
	    };
	    var makeError = function makeError(base, err) {
	        return _extends({}, base, err instanceof Object ? err : { error: err });
	    };

	    var _transitionPath = (0, _router2.default)(toState, fromState);

	    var toDeactivate = _transitionPath.toDeactivate;
	    var toActivate = _transitionPath.toActivate;

	    var asyncBase = { isCancelled: isCancelled, toState: toState, fromState: fromState };

	    var canDeactivate = function canDeactivate(toState, fromState, cb) {
	        var canDeactivateFunctionMap = toDeactivate.filter(function (name) {
	            return canDeactivateFunctions[name];
	        }).reduce(function (fnMap, name) {
	            return _extends({}, fnMap, _defineProperty({}, name, canDeactivateFunctions[name]));
	        }, {});

	        (0, _resolve2.default)(canDeactivateFunctionMap, _extends({}, asyncBase, { errorKey: 'segment' }), function (err) {
	            return cb(err ? makeError({ code: _constants.errorCodes.CANNOT_DEACTIVATE }, err) : null);
	        });
	    };

	    var canActivate = function canActivate(toState, fromState, cb) {
	        var canActivateFunctionMap = toActivate.filter(function (name) {
	            return canActivateFunctions[name];
	        }).reduce(function (fnMap, name) {
	            return _extends({}, fnMap, _defineProperty({}, name, canActivateFunctions[name]));
	        }, {});

	        (0, _resolve2.default)(canActivateFunctionMap, _extends({}, asyncBase, { errorKey: 'segment' }), function (err) {
	            return cb(err ? makeError({ code: _constants.errorCodes.CANNOT_ACTIVATE }, err) : null);
	        });
	    };

	    var middleware = !middlewareFunctions.length ? [] : function (toState, fromState, cb) {
	        return (0, _resolve2.default)(middlewareFunctions, _extends({}, asyncBase), function (err, state) {
	            return cb(err ? makeError({ code: _constants.errorCodes.TRANSITION_ERR }, err) : null, state || toState);
	        });
	    };

	    var pipeline = (fromState && !opts.forceDeactivate ? [canDeactivate] : []).concat(canActivate).concat(middleware);

	    (0, _resolve2.default)(pipeline, asyncBase, done);

	    return cancel;
	}

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = resolve;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function resolve(functions, _ref, callback) {
	    var isCancelled = _ref.isCancelled;
	    var toState = _ref.toState;
	    var fromState = _ref.fromState;
	    var errorKey = _ref.errorKey;

	    var remainingFunctions = Array.isArray(functions) ? functions : Object.keys(functions);

	    var isState = function isState(obj) {
	        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.name !== undefined && obj.params !== undefined && obj.path !== undefined;
	    };
	    var hasStateChanged = function hasStateChanged(state) {
	        return state.name !== toState.name || state.params !== toState.params || state.path !== toState.path;
	    };

	    var processFn = function processFn(done) {
	        if (!remainingFunctions.length) return true;

	        var isMapped = typeof remainingFunctions[0] === 'string';
	        var errBase = errorKey && isMapped ? _defineProperty({}, errorKey, remainingFunctions[0]) : {};
	        var stepFn = isMapped ? functions[remainingFunctions[0]] : remainingFunctions[0];

	        // const len = stepFn.length;
	        var res = stepFn.call(null, toState, fromState, done);
	        if (isCancelled()) {
	            done(null);
	        } else if (typeof res === 'boolean') {
	            done(res ? null : errBase);
	        } else if (res && typeof res.then === 'function') {
	            res.then(function (resVal) {
	                if (resVal instanceof Error) done({ error: resVal }, null);else done(null, resVal);
	            }, function (err) {
	                if (err instanceof Error) {
	                    console.error(err.stack || err);
	                    done(_extends({}, errBase, { promiseError: err }), null);
	                } else {
	                    done((typeof err === 'undefined' ? 'undefined' : _typeof(err)) === 'object' ? _extends({}, errBase, err) : errBase, null);
	                }
	            });
	        }
	        // else: wait for done to be called

	        return false;
	    };

	    var iterate = function iterate(err, val) {
	        if (isCancelled()) {
	            callback();
	        } else if (err) {
	            callback(err);
	        } else {
	            if (val && isState(val)) {
	                if (hasStateChanged(val)) console.error('[router5][transition] Warning: state values changed during transition process.');
	                toState = val;
	            }
	            remainingFunctions = remainingFunctions.slice(1);
	            next();
	        }
	    };

	    var next = function next() {
	        if (isCancelled()) {
	            callback();
	        } else {
	            var finished = processFn(iterate);
	            if (finished) callback(null, toState);
	        }
	    };

	    next();
	}

/***/ }
/******/ ]);