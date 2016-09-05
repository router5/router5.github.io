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
var constants = router5.constants;
var transitionPath = router5.transitionPath;
var loggerPlugin = router5.loggerPlugin;

var browserPlugin = require('router5/plugins/browser');
var listenersPlugin = require('router5/plugins/listeners');
var persistentParamsPlugin = require('router5/plugins/persistentParams');
```

__UMD__

A UMD bundle is available in `/dist/umd`, and it should be used for AMD or globals. The bundle contains all _router5_ dependencies (_route-node_ and _path-parser_), but doesn't contain plugins.

Plugins are packaged separately and available in `/dist/umd`:
- `browserPlugin` UMD module is named `router5BrowserPlugin`
- `listenersPlugin` UMD module is named `router5ListenersPlugin`
- `persistentParamsPlugin` UMD module is named `router5PersistentParamsPlugin`
bundle is named `router5ListenersPlugin`.
