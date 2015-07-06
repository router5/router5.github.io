# Preventing navigation

It is a common case to want to allow / prevent navigation away from a view or component: if a User
is in the middle of completing a form and data has not been saved, you might want to warn them
about data being lost or prevent them to leave the current view until data has been saved.


## Can you deactivate?

Like Angular 2 and Aurelia routers, _router5_ will ask active components which are about to be
deactivated by a route change if they can be deactivated. If one of them returns a falsy value,
transition will be prevented.

_router5_ exposes two methods: `registerComponent(name)` and `deregisterComponent(name)` for registering
active components. If a registered component has a `canDeactivate(toState, fromState)` method, it will
be invoked when trying to transition to a new route. Only one component per route segment can be registered
at a time.

`canDeactivate` methods are invoked from bottom to top. If a User is navigating from route `A.1.a` to route `B`,
_router5_ will query registered components for segment `A.1.a`, then `A.1`, then `A`.


## What about popstate?

Popstate events cannot be prevented or reversed. In the event current route deactivation is blocked by
a component, the non-deactivated state will be pushed again to the page history.


## Asynchronous deactivation

Currently, only `canDeactivate` functions returning synchronously a truthy or falsy result are supported.
Support for promises will be added later, and better solutions regarding _popstate_ events will
be explored.
