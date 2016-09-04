# Get started

> _router5_ is available in all major formats: __ES6__, __AMD__, __CommonJS__, __globals__ and __UMD__.

It can be installed using __npm__ or __bower__. Alternatively, you can download a specific version
from [github](https://github.com/router5/router5/releases). Whether you install _router5_ from npm, bower or github,
you will have access to the same files.


## Installation

```sh
# bower
bower install router5
# npm
npm install router5
```

## Include _router5_ in your application

__CommonJS__

Files are available in `/dist/commonjs/`.

```javascript
// ES2015+
import Router5, { RouteNode, errorCodes, transitionPath, loggerPlugin } from 'router5';

// ES5
var router5 = require('router5');

var createRouter = router5.default;
var RouteNode = router5.RouteNode;
var errorCodes = router5.errorCodes;
var transitionPath = router5.transitionPath;
var loggerPlugin = router5.loggerPlugin;
```

__Browser (globals)__

`router5.js` and `router5.min.js` are available in `/dist/browser/`. All _router5_ dependencies (_route-node_ and _path-parser_)
are packaged together. A `router5` object is registered globally. See above for what it contains.

__AMD__

`router5.js` and `router5.min.js` are available in `/dist/amd/`, it includes all router5 dependencies bundled
together. `router5` returns an object, same as CommonJS.

__UMD__

UMD files are available in `/dist/umd`.


## Plugins

> `router5-plugin-listeners` and `router5-plugin-browser` are both available through npm and bower too.

```sh
# Listeners plugin
npm install router5-plugin-listeners
bower install router5-plugin-listeners

# History plugin
npm install router5-plugin-browser
bower install router5-plugin-browser

# Persistent params plugin
npm install router5-plugin-persistent-params
bower install router5-plugin-persistent-params
```

[router5-plugin-browser](https://github.com/router5/router5-plugin-browser) global bundle adds `router5BrowserPlugin` to the global scope. The AMD
bundle is named `router5BrowserPlugin`.

[router5-plugin-listeners](https://github.com/router5/router5-plugin-listeners) global bundle adds `router5ListenersPlugin` to the global scope. The AMD
bundle is named `router5ListenersPlugin`.

[router5-plugin-persistent-params](https://github.com/router5/router5-plugin-persistent-params) global bundle adds `router5PersistentParamsPlugin` to the global scope. The AMD bundle is named `router5PersistentParamsPlugin`.
