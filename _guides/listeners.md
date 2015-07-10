# Listeners

To be able to react to route changes, you will need to listen to them! With _router5_, you can
add three types of listeners.

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

Listeners added with `addRouteListener(name, fn)` can be removed with `removeRouteListener(name, fn)`

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


## Listen to a node change

`addNodeListener(name, fn)` will register a listener which will be invoked when the specified route node name
is the apex node of a route change, i.e. the lowest node in a tree remaining activated on a route change.

For example, when navigating from route name `A.1.a` to `A.1.b`, node `a.1` is the _apex node_. When navigating
from `A.1.a` to `A.2`, `A` is the _apex_.

This type of listener is useful for __component trees__ to know from which component a re-render
needs to happen. For removing a previously added listner, use `removeNodeListener(name, fn)`.

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

myRouter.addNodeListener('A.1', function (toState, fromState) {
    console.log('re-render from A.1');
});

myRouter.navigate('A.1.a');
myRouter.navigate('A.1.b'); // => logs 're-render from A.1'
myRouter.navigate('A.2');   // => logs 're-render from A'
```
