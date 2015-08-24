# Configuring routes

There are a few ways to add routes to your router.

You can specifying your routes when creating a router instance and / or use chainable `add` and `addNode` functions to add routes.


## Router5 constructor

__new Router5(routes, opts)__:

List of __options__ supported:

- `useHash`: `true` or `false`. If `true`, a hash will be prepended to the route path.
- `hashPrefix`: a prefix to add to paths with hash. Set it to `!` for hashbang URLs.
- `defaultRoute`: the default route, see [navigation guide](/docs/navigation.html).
- `defaultParams`: the default route params.
- `base`: specify the base path of your application.
- `trailingSlash`: set to a truthy value for allowing optional trailing slashes

__Routes__ can be:

- An array of RouteNode objects and plain objects.
- A RouteNode Object or plain object: in that case.

If passing a RouteNode object (or a plain object), that node will become your router's root node. All routes added later will
then extend its path. If you pass to Router5 an array, it will automatically create a rootNode with an empty name and empty path
(`new RouteNode('', '')`), which is the recommended way.

When configuring routes, RouteNode and POJOs can be mixed. The two compulsory information needed to create a route are name and path.
When nesting routes, they inherit from their parent. For example, a route named `b` with path `/b` added as a children of route named
'a' (path `/a`) will be named `a.b` (its path will be `/a/b`).

__Using RouteNode__


```javascript
var myRouter = new Router5([
    new RouteNode('home', '/home'),

    new RouteNode('users', path: '/users', [
        new RouteNode('view', '/view/:id'),
        new RouteNode('list', 'list'),
    ]}
]);
```

__Using POJOs__

```javascript
var myRouter = new Router5([
    new RouteNode('home', '/home'),

    {name: 'users', path: '/users', children: [
        {name: 'view', path: '/view/:id'},
        {name: 'list', path: '/list'},
    ]}
]);
```

## Adding routes

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

__addNode(name, path)__


```javascript
var rootNode = new RouteNode()
    .addNode('home',       '/home')
    .addNode('users',      '/users')
    .addNode('users.view', '/view/:id')
    .addNode('users.list', '/list');
```

