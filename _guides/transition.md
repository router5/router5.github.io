# Transition

> As seen in [Preventing navigation](/docs/listeners), `canDeactivate` and `canActivate` are part of the transition phase. Additionally you can register multiple middleware in order to perform asynchronous operations as part of the transition process.

![Going from 'users.view' to 'orders.view'](/img/flow-graph.png)

![Transition flow chart](/img/flow-transition.png)


## Registering middleware functions

A middleware function can return a boolean for synchronous results, a promise or call
a done callback for asynchronous operations. If it returns false, a rejected promise or a callback with an error, it will fail the transition.

This type of function is ideal to remove data loading logic from components, and is a good fit
for applications aiming at having a centralised state object.

```javascript
let mware1 = function (toState, fromState, done) {
    // Let's fetch data and call done
    done();
};

let mware2 = function (toState, fromState, done) {
    // Let's fetch data and call done
    done();
};

router.useMiddleware(mware1, mware2);
```
