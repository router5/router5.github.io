# Transition

It is possible to register a "middleware" function: it can return a boolean, a promise or call
a done callback.

```javascript
let onTransition = function (toState, fromState, done) {
    // Let's fetch data and call done
    done(null);
};

router.onTransition(onTransition)
```

This type of function is ideal to remove data loading logic from components, and is a good fit
for applications aiming at having a centralised state object.

Sometimes a simple flow chart is way better than many confusing paragraphs.

![Going from 'users.view' to 'orders.view'](/img/flow-graph.png)

![Transition flow chart](/img/flow-transition.png)
