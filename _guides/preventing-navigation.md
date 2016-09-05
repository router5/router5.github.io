# Preventing navigation

> It is a common case to want to allow / prevent navigation away from a view or component: if a User is in the middle of completing a form and data has not been saved, you might want to warn them about data being lost or prevent them to leave the current view until data has been saved.

## Lifecycle functions

Router5 supports `canActivate` and `canDeactivate` functions for segments:
- `canActivate` functions are called on segments which will become active as a result of a route change
- `canDeactivate` functions are called on segments which will become inactive as a result of a route change

Both functions have the same signature than middleware functions. Their result can be synchronous (returning a boolean) or asynchronous (returning a promise or calling `done(err, result)`).

> __Note:__ if a canActivate or canDeactivate function doesn't return a boolean, a promise or doesn't call back,
  the transition will not proceed.

> _router5_ doesn't create any promise and therefore if you do not wish to use promises, you are not forced
to use a polyfill or promise implementation in your app.

```javascript
const canActivate = (router) => (toState, fromState) => {
    return true;
}

router.canActivate('admin', canActivate);
```

```javascript
const canActivate = (router) => (toState, fromState) => {
    return true;
}

router.canActivate('admin', canActivate);
```

### Order of invocation


`canActivate` and `canDeactivate` functions are thunks: they expose another function to receive navigation updates, allowing you to use closures if you need to.

Those handlers will be invoked when your router is started with your router instance and injectables. Then their exposed function will be called to query if a segment can be activated or deactivated.

`canActivate` functions are called from top to bottom on newly activated segments. They behave the same
than `canDeactivate` methods: you can return a boolean value, return a promise or invoke a done callback.

`canDeactivate` methods are invoked from bottom to top. If a User is navigating from route `A.1.a` to route `B`,
_router5_ will query registered components for segment `A.1.a`, then `A.1`, then `A`.

> When option `autoCleanUp` is set to true, canDeactivate methods are removed when their associated segment is no longer active.
