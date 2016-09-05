# Using plugins

> Router5 is extensible with the use of plugins. Plugins can decorate a route instance and do things on specific router and transition events.


## Plugin requirements

A plugin is a function taking a router instance and returning an object with a name and at least one of the following methods:

- __onStart()__: invoked when `router.start()` is called
- __onStop()__: invoked when `router.stop()` is called
- __onTransitionStart(toState, fromState)__
- __onTransitionCancel(toState, fromState)__
- __onTransitionError(toState, fromState, err)__
- __onTransitionSuccess(toState, fromState, opts)__ (options contains `replace` and `reload` boolean flags)


## Registering a plugin

```javascript
function myPlugin(router, dependencies) {
    return {
        onTransitionSuccess: (toState, fromState) => {
            console.log('Yippee, navigation to ' + toState.name + ' was successful!');
        }
    };

myPlugin.pluginName = 'MY_PLUGIN';

const router = createRouter()
    .usePlugin(myPlugin);

router.hasPlugin('MY_PLUGIN'); // => true
```


## Plugin examples

- [Listeners plugin](https://github.com/router5/blob/master/modules/plugins/listeners/index.js)
- [Browser plugin](https://github.com/router5/blob/master/modules/plugins/browser/index.js)
- [Persistent params plugin](https://github.com/router5/blob/master/modules/plugins/persistentParams/index.js)
- [Logger](https://github.com/router5/router5/blob/master/modules/plugins/logger/index.js)

Router5 includes a logging plugin that you can use to help development

```javascript
import { loggerPlugin } from 'router5';

const router = new Router()
    .usePlugin(loggerPlugin);
```
