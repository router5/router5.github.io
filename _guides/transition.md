# Transition

As seen in [Preventing navigation](/docs/listeners), `canDeactivate`
and `canActivate` are part of the transition phase.

It is also possible to register an __asynchronous "middleware" functions__: it can return a boolean for synchronous results, a promise or call
a done callback for asynchronous operations.

```javascript
let mware1 = function (toState, fromState, done) {
    // Let's fetch data and call done
    done(null);
};

let mware2 = function (toState, fromState, done) {
    // Let's fetch data and call done
    done(null);
};

router.useMiddleware(mware1, mware2);
```

This type of function is ideal to remove data loading logic from components, and is a good fit
for applications aiming at having a centralised state object.

## Flow chart

Sometimes a simple flow chart is way better than many confusing paragraphs.

![Going from 'users.view' to 'orders.view'](/img/flow-graph.png)

![Transition flow chart](/img/flow-transition.png)


## Transition hooks

You can listen to specific transition events, mostly for debugging purposes.

- __Start:__ `.onTransitionStart(cb)`, `.offTransitionStart(cb)`
- __Cancel:__ `.onTransitionCancel(cb)`, `.offTransitionCancel(cb)`
- __Error:__ `.onTransitionError(cb)`, `.offTransitionError(cb)`

Listeners are of the following form: `function (toState, fromState) { }`. Transition error listeners are called with
an extra `err` argument.
