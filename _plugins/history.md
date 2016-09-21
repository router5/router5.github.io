# Browser plugin


The browser plugin will automatically update your browser URL and state on route changes. It will also listen to popstate events (triggered
by back and forward buttons and manual URL changes).

This plugin uses HTML5 history API and therefore is not compatible with browsers which don't support it. Refer to [caniuse.com](http://caniuse.com/#search=history) for browser compatibility.

It adds a bunch of functions to work with full URLs: `router.buildUrl(routeName, routeParams)` and `router.matchUrl(url)`. It also decorates the start function so you don't have to supply any start path (it extracts it from the current URL).


```javascript
import browserPlugin from 'router5/plugins/browser';

const router = createRouter()
    .usePlugin(browserPlugin({
        useHash: true
    }))
    .start();
```

For more information on how to install, look at [Get started](/docs/get-started.html).

### Options

- `useHash`
- `hashPrefix`
- `base`: the base of your application (the part to add / preserve between your domain and your route paths).
