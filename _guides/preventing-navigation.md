# Preventing navigation

It is a common case to want to allow / prevent navigation away from a view or component: if a User
is in the middle of completing a form and data has not been saved, you might want to warn them
about data being lost or prevent them to leave the current view until data has been saved.


## Can I deactivate?

Like Angular 2 and Aurelia routers, _router5_ will ask active components which would be
deactivated by a route change if they can be deactivated.

_router5_ exposes two methods: `registerComponent(name)` and `deregisterComponent(name)` for registering
active components. If a registered component has a `canDeactivate(toState, fromState)` method, it will
be invoked when trying to transition to a new route. Only one component per route segment can be registered
at a time.

`canDeactivate` methods are invoked from bottom to top. If a User is navigating from route `A.1.a` to route `B`,
_router5_ will query registered components for segment `A.1.a`, then `A.1`, then `A`.

A `canDeactivate` method can return `true` or `false` for synchronous results, can
return a thenable (`promise`) or can invoke a `done` callback. A resolved promise is equivalent
to returning true, and a rejected promise will prevent a segment deactivation.

_router5_ doesn't create any promise and therefore if you do not wish to use promises, you are not forced
to support ES6 promises or use a polyfill.

```javascript
let MyComponent = {
    canDeactivate(toRoute, fromRoute) {
        return new Promise((resolve, reject) => {
            // If can deactivate
            resolve();
            // Or if cannot deactivate
            reject();
        })
    }
}
```

A callback takes two arguments: an error and a result. To allow or prevent a segment
deactivation, simply invoke with the first argument (error) to a falsy or truthy value.

```javascript
let MyComponent = {
    canDeactivate(toRoute, fromRoute, done) {
        // If can deactivate
        done(null, true);
        // Or if cannot deactivate
        done(true, null);
    }
}
```

A shortcut method is available and can be used if `options.autoCleanUp` is set to true.

```
const isDirty = true;
router.canDeactivate('routeName', !isDirty);
```

## Can I activate?

You can register a `canActivate(toRoute, fromRoute[, done])` function per node to allow or prevent access
to a specific route and its descendents.

`canActivate` functions are called from top to bottom on newly activated segments. They behave the same
than `canDeactivate` methods: you can return a boolean value, return a promise or invoke a done callback.

There are two ways to register `canActivate` functions: using `addNode` or `canActivate` methods:

```javascript
let isAdmin = true

function canAccessAdmin(toRoute, fromRoute, done) {
    return isAdmin
}

myRouter.addNode('admin', '/admin', canAccessAdmin)

myRouter
    .add({name: 'admin', path: '/admin'})
    .canActivate('admin', canAccessAdmin)
```

> __Note:__ if a can activate or can deactivate function doesn't return a boolean, a promise or doesn't call back,
  the transition will not proceed

## What about popstate?

Popstate events cannot be prevented or reversed. In the event current route activation or deactivation is not allowed,
the previously known state will be pushed to the page history.
