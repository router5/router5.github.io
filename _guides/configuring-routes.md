# Configuring routes

> There are a few ways to add routes to your router. You can specify your routes when creating a router instance and / or use chainable `add` and `addNode` functions to add routes.


## With addNode

You can add routes node by node, specifying a node name and its segment path. With the following example, `users.view` full path will be `/users/view/:id`.

```javascript
var router = new Router5()
    .addNode('home',       '/home')
    .addNode('users',      '/users')
    .addNode('users.view', '/view/:id')
    .addNode('users.list', '/list');
```


## Alternative ways

When using Router5 contstructor `new Router5(routes, opts)`, __routes__ can be:

- An array of RouteNode objects and plain objects.
- A RouteNode Object or plain object (not recommended)

If passing a RouteNode object (or a plain object), that node will become your router's root node. All routes added later will
then extend its path. This is __not recommended__ mostly because it is untested. Instead, passing to Router5 an array (of plain
objects or RouteNode objects) will automatically create a rootNode with an empty name and empty path (`new RouteNode('', '')`).

When configuring routes, RouteNode and POJOs can be mixed. The two compulsory information needed to create a route are a name and a path.
When nesting routes, they inherit from their parent. For example, a route named `b` with path `/b` added as a children of route named
'a' (path `/a`) will be named `a.b` (its path will be `/a/b`).

__Using RouteNode__


```javascript
var myRouter = new Router5([
    new RouteNode('home', '/home'),

    new RouteNode('users', '/users', [
        new RouteNode('view', '/view/:id'),
        new RouteNode('list', 'list'),
    ]),
]);
```

__Using POJOs__

```javascript
var myRouter = new Router5([
    {name: 'home', path: '/home'},

    {name: 'users', path: '/users', children: [
        {name: 'view', path: '/view/:id'},
        {name: 'list', path: '/list'},
    ]}
]);
```

__add(routes)__

Like in Router5 constructor, routes can be a single node (RouteNode or plain object), or a list of nodes.

```javascript
myRouter.add(new RouteNode('about', '/about'));
// Or
myRouter.add({name: 'about', path: '/about'});
// Or
myRouter.add([
    new RouteNode('about',   '/about'),
    new RouteNode('contact', '/contact'),
]);
// Or
myRouter.add([
    {name: 'about',   path: '/about'},
    {name: 'contact', path: '/contact'},
]);
```
