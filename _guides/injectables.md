# Injectables

> When using lifecycle methods (`canActivate`, `canDeactivate`), middleware or plugins, you might need to access specific objects from your application: a store, a specific API, etc... You can pass their reference to router5 and they will be passed alongside your router instance.

You can only register all injectables at once, and you should before you start your router.

```javscript
router.inject(store, api);
```

You can retrieve your currently injected references using `getInjectables()`.

Lifecycle methods (`canActivate`, `canDeactivate`), middleware or plugins will be called with them:

```js
const plugin = (router, ...injectables) => ({
    /*
        onStart() {},
        onStop() {},
        onTransitionStart() {},
        ...
    */
});
```

```js
const canActivate = (router, ...injectables) =>
    (toState, fromState, done) {
        /* ... */
    }
```


```js
const middleware = (router, ...injectables) =>
    (toState, fromState, done) {
        /* ... */
    }
```
