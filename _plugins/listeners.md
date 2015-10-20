# Listeners plugin

To be able to react to route changes, you will need to listen to them! _router5-listeners_ plugin offers a
way to update a component tree with the use of three types of listeners.

```javascript
import listenersPlugin from 'router5-listeners';

const router = new Router5()
    .usePlugin(listenersPlugin());
```

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


## Arguments

Listeners are invoked with two arguments:

- `toState`: the state object the router is navigating to
- `fromState`: the state object the router is navigating from

State objects contain the following properties: `name`, `params` and `path`.

Additionally, a callback can be passed to node listeners (see below).

## Listen to a node change

`addNodeListener(name, fn)` will register a listener which will be invoked when the specified route node
is the _apex_ node of a route change, i.e. the lowest node in a tree remaining activated on a route change (the lowest
common node).

For example, when navigating from route name `A.1.a` to `A.1.b`, node `a.1` is the _apex_ node. When navigating
from `A.1.a` to `A.2`, `A` is the _apex_.

Node listeners are limited to __one listener per node__, and are the most useful listener for __component trees__:
they allow to use high-order components and to re-render a view efficiently. __Only one node listener will
be invoked on a route change__.

Node listeners can be part of the transition phase: when using a node listener, you can return a promise,
a boolean or invoke a done callback like for `canActivate` and `canDeactivate` methods. In that case:

- The router will wait before updating the page URL and invoke other listeners (see below)
- The router will fail the transition if a listener return a negative result (false, rejected
promise or invoke callback with an error): __you are fully in control__, and you can decide
for example if you want to share an error with the router and abort a route change.

You can also choose to return nothing and in this case the router will consider the transition successful and
won't wait for updating the page URL and invoke other listeners. Make sure your function doesn't take a callback as its
last argument (`function nodeListener(toState, fromState)`: this will cause the router to wait for that callback
to be invoked and the transition will never be completed.

`addNodeListener('', fn)` will add a listener for the router's unamed root node.

```javascript
var node1 = new RouteNode('1', '/1', [
    new RouteNode('a', '/a')
    new RouteNode('a', '/a')
]);

var nodeA = new RouteNode('A', '/A', [
    node1,
    new RouteNode('2', '/2')
]);

var myRouter = Router5([nodeA])
    .start();

myRouter.addNodeListener('A', function (toState, fromState) {
    console.log('re-render from A');
});

myRouter.addNodeListener('A.1', function (toState, fromState, done) {
    console.log('re-render from A.1');
    // Perform some async operation
    xhr.getData(function (err, res) {
        // use data
        // ...
        // Notify router
        done(err)
    })
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
