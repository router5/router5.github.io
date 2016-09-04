# Listeners plugin

> To be able to react to route changes, you might need to add listeners. `router5-plugin-listeners` plugin provides different ways to listen to router state changes.

```javascript
import listenersPlugin from 'router5-plugin-listeners';

const router = createRouter()
    .usePlugin(listenersPlugin());
```


## Three types of listeners

![Navigation from 'users.view' to 'orders.completed'](/img/deactivation-activation-path.png)

When navigation from _users.view_ to _orders.completed_:

- &#x2713; `.addListener(fn)` will be called
- &#x2713; `.addNodeListener('', fn)` will be called
- &#x2713; `.addRouteListener('orders.completed', fn)` will be called


![Navigation from 'orders.completed' to 'orders.pending'](/img/deactivation-activation-path-2.png)

When navigation from _orders.pending_ to _orders.pending_:

- &#x2713; `.addListener(fn)` will be called
- &#x2713; `.addNodeListener('orders', fn)` will be called
- &#x2713; `.addRouteListener('orders.pending', fn)` will be called


### Listener Arguments

Listeners will be called with `toState` and `fromState` arguments.
State objects contain the following properties: `name`, `params` and `path`.


## Listen to a node change

`addNodeListener(name, fn)` will register a listener which will be invoked when the specified route node
is the __transition node__ of a route change, i.e. the intersection between deactivated and activated segments.

For example, when navigating from route name `A.1.a` to `A.1.b`, node `a.1` is the _apex_ node. When navigating
from `A.1.a` to `A.2`, `A` is the _apex_.

Node listeners are limited to __one listener per node__, and are the most useful listener for __component trees__:
they allow to use wrapping components and to re-render a view efficiently at a specific node. Using `addNodeListener('', fn)`
will add a listener for the router's unamed root node.

> If `autoCleanUp` option is set to true, node listeners are automatically removed when their associated node no longer exists.

```javascript
myRouter.addNodeListener('A', function (toState, fromState) {
    console.log('re-render from A');
});

myRouter.addNodeListener('A.1', function (toState, fromState) {
    console.log('re-render from A.1');
});

myRouter.navigate('A.1.a');
myRouter.navigate('A.1.b'); // => logs 're-render from A.1'
myRouter.navigate('A.2');   // => logs 're-render from A'
```

## Listen to any route change

Listeners registered with `addListener(fn)` will be triggered on any route change, including route reloads (_toState_
will be equal to _fromState_). You can remove a previously added listener by using `removeListener(fn)`.

```javascript
function callback(toState, fromState) {
    renderComponent(toState.name);
}

myRouter.addListener(callback);

myRouter.removeListener(callback);
```

## Listen to a specific route

`addRouteListener(name, fn)` will register a listener which will be triggered when the router is navigating to
the supplied route name.

Listeners registered with `addRouteListener(name, fn)` can be removed later with `removeRouteListener(name, fn)`

```javascript
var myRouter = Router5()
    .addNode('home', '/home')
    .addNode('about', '/about')
    .start();

myRouter.addRouteListener('home', function (toState, fromState) {
    alert('You have navigated to home');
});

myRouter.addRouteListener('about', function () {
    alert('You have navigated to about');
});

myRouter.navigate('home');  // => alerts 'You have navigated to home'
myRouter.navigate('about'); // => alerts 'You have navigated to about'
```
