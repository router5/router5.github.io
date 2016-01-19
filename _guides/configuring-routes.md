# Configuring routes

> There are a few ways to add routes to your router. You can specify your routes when creating a router instance and / or use chainable `add` and `addNode` methods to add routes.

## Defining your routes as POJOs

You can define your routes as a flat array or nested array of routes
- When using a flat array of routes, nested route names need to have their full name specified.
- For each route, as well as `path` and `name`, you can specify a `canActivate` method which will be automatically registered.

__Flat array of routes__

```javascript
const routes = [
    { name: 'users',      path: '/users'},
    { name: 'users.view', path: '/list'},
    { name: 'users.list', path: '/view'}
];
```

__Nested arrays of routes__


```javascript
const routes = [
    { name: 'users', path: '/users', children: [
        { name: 'view', path: '/list'},
        { name: 'list', path: '/view'}
    ]}
];
```

## Adding routes to your router

You can add all your routes at once using Router5 constructor or `router.add`.

__new Router5(routes, options)__

```javascript
const router = new Router5(routes, options);
```

__add(routes)__

`.add()` accepts single nodes, flat or nested arrays.

```javascript
myRouter.add({ name: 'about', path: '/about' });
// Or
myRouter.add([
    {name: 'about',   path: '/about'},
    {name: 'contact', path: '/contact'},
]);
```

__addNode(name, path[, canActivate])__

You can add routes node by node, specifying a node name and its segment path.

```javascript
var router = new Router5()
    .addNode('users',      '/users')
    .addNode('users.view', '/view/:id')
    .addNode('users.list', '/list');
```
