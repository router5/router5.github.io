# Injectables

> When using lifecycle methods (`canActivate`, `canDeactivate`), middleware or plugins, you might need to access specific objects from your application: a store, a specific API, etc... You can pass their reference to router5 and they will be passed alongside your router instance.

You can only register all injectables at once, and you should before you start your router.

```js
router.setDependencies({ store, api });
// or
router.setDependency('store', store);
router.setDependency('api', api);
```

You can retrieve your current dependencies references using `getDependencies()`.

Lifecycle methods (`canActivate`, `canDeactivate`), middleware or plugins will be called with them:

```js
const plugin = (router, dependencies) => ({
    /*
        onStart() {},
        onStop() {},
        onTransitionStart() {},
        ...
    */
});
```

```js
const canActivate = (router, dependencies) =>
    (toState, fromState, done) {
        /* ... */
    }
```


```js
const middleware = (router, dependencies) =>
    (toState, fromState, done) {
        /* ... */
    }
```
