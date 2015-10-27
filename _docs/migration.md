# Migrating from 0.x to 1.x

> __router5@1.0.0__ now uses plugins for managing browser history and handling listeners. Installling and using `router5-listeners` and `router5-history` will result in an almost identical behaviour.


## New features

* New `autoCleanUp` option for automatically deregistering components when their associated route is no longer active (also applies to route node listeners)
* New `canDeactivate` method as a shortcut for `registerComponent`
* Plugins and built-in logger plugin
* Support for multiple middleware functions


## Breaking change

* Transition errors are now objects with a code property, and not strings
* `onTransition()` is now deprecated in favour of `useMiddleware()`
* history is now managed by a plugin (`router5-history`)
* listeners is now managed by a plugin (`router5-history`), API remains the same


## Code example

```javascript
import { Router5 } from 'router5';
import historyPlugin from 'router5-history';
import listenersPlugin from 'router5-listeners';

const router = new Router()
    .addNode('home', '/home')
    .usePlugin(historyPlugin())
    .usePlugin(listenersPlugin())
    // Development helper
    .usePlugin(Router5.loggerPlugin())
    .start();
```

```javascript
router.canDeactivate('home', true);
// is the equivalent of
router.registerComponent('home', {
    canDeactivate: function () {
        return true;
    }
});
```
