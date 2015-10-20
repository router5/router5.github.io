# Using plugins

Router5 is extensible with the use of plugins. Plugins can decorate a route instance and do things
on specific router and transition events.


## Plugin requirements

A plugin is simply an object with a name and at least one of the following methods:

- __init(router)__: invoked when a plugin is registered with a router instance. The router instance is passed to it so it can be decorated or more...
- __onStart()__: invoked when `router.start()` is called
- __onStop()__: invoked when `router.stop()` is called
- __onTransitionStart(toState, fromState)__
- __onTransitionCancelled(toState, fromState)__
- __onTransitionError(toState, fromState, err)__
- __onTransitionSuccess(toState, fromState, opts)__ (options contains `replace` and `reload` boolean flags)


## Registering a plugin

```javascript
const myPlugin = function () {
    return {
        name: 'MY_CUSTOM_PLUGIN',
        onTransitionSuccess: (toState, fromState) => {
            console.log('Yippee, navigation to ' + toState.name + ' was successful!');
        }
    };
}

const router = new Router5()
    .usePlugin(myPlugin);
```


## Plugin examples

- [router5-listeners](/router5/router5-listeners)
- [router5-history](/router5/router5-history)
- [Logger](./modules/plugins/logger.js)
