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
const myPlugin = () =>
    router => ({
        name: 'MY_CUSTOM_PLUGIN',
        onTransitionSuccess: (toState, fromState) => {
            console.log('Yippee, navigation to ' + toState.name + ' was successful!');
        }
    });

const router = new Router5()
    .usePlugin(myPlugin());
```


## Plugin examples

- [router5-listeners](https://github.com/router5/router5-listeners)
- [router5-history](https://github.com/router5/router5-history)
- [router5-persistent-params](https://github.com/router5/router5-persistent-params)
- [Logger](https://github.com/router5/router5/blob/master/modules/logger.js)

Router5 includes a logging plugin that you can use to help development

```javascript
const router = new Router()
    .usePlugin(Router5.loggerPlugin());
```
