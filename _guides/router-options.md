# Options

When constructing your router instance, you can pass several options to the constructor.

```javascript
var router = new Router5([], {
    useHash: true,
    hashPrefix: '!',
    defaultRoute: 'home',
    defaultParams: {},
    base: '',
    trailingSlash: false
});
```

## Use of hash part of URL

Router5 only support HTML5 browsers with the history API. It means the router will use `history.pushState` and `history.replaceState` to modify the history of a page, and
will listen to `popstate` events caused by a manual edit of the URL or a click on back and forward buttons. The router won't listen to `hashchange` events, but that doesn't
mean you cannot use `#` in your URL.

> The decision to whether or not use a `#` is a question of server configuration and not a decision based on browser support.

Set `useHash` to `true` if you want the paths of your routes to be prefixed with a hash. You can also choose a `hashPrefix` which will be inserted between the path of a route
and the hash.


## Default route

When your router instance starts, it will navigate to a default route if such route is defined and if it cannot match the URL against a known route:

- `defaultRoute`: the default route.
- `defaultParams`: the default route params (default to `{}`)

See [navigation guide](/docs/navigation.html) for more information.


## Base path

You can specify what the base path of your application is. By default `base` is set to an empty string, meaning your route paths won't be prefixed by any
path.


## Optional trailing slashes

By default, the router is in "strict match" mode. If you want trailing slashes to be optional, you can set `trailingSlash` to a truthy value.
