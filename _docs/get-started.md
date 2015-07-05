# Get started

_router5_ is available in all major formats: __ES6__, __AMD__, __CommonJS__ and __globals__.

It can be installed using __npm__ or __bower__. Alternatively, you can download a specific version
from [github](https://github.com/router5/router5/releases). Whether you install _router5_ from npm, bower or github,
you will have access to the same files.


## Installation

__Bower__

```sh
bower install router5
```

__npm__

```sh
npm install router5
```

## Include _router5_ in your application

__Node.js (CommonJS)__

Files are available in `/dist/commonjs/`.

```javascript
var r5 = require('router5');

var Router5   = r5.Router5;
var RouteNode = r5.RouteNode;
```

__Browser (globals)__

`router5.js` and `router5.min.js` are available in `/dist/browser/`. All _router5_ dependencies (_route-node_ and _path-parser_)
are packaged together, and `Router5` and `Router5Node` are made globally available.

<!-- __ES6__

_router5_ and its dependencies are written in ES6 and transpiled to ES5. If you wish to include ES6 sources directly
in your application, files are located in `/modules`. It is planned to release ES6 sources by default through __jspm__.

For now, ES6 sources can be accessed using `npm`.

```javascript
import {Router5, RouteNode} from 'router5/dist/es6'
```

__Univeral Module Loader__

The UMD format (accessible in `/dist/umd`) covers AMD, CommonJS and Globals.
 -->
