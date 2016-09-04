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

__createRouter(routes, options)__

```javascript
const router = createRouter(routes, options);
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
var router = createRouter()
    .addNode('users',      '/users')
    .addNode('users.view', '/view/:id')
    .addNode('users.list', '/list');
```

## Configuring the root node path

At the top of your tree of routes, there is an unamed node called the root node. Its path is empty and can be configured using `router.setRootPath(path)`. It can be used for example to list a number of allowed query parameters for all routes in strict query parameters mode (ter.setRootPath('?param1&param2')`).
