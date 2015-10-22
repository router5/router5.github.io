# Options

When constructing your router instance, you can pass several options to the constructor.

```javascript
var router = new Router5([], {
    useHash: true,
    hashPrefix: '!',
    defaultRoute: 'home',
    defaultParams: {},
    base: '',
    trailingSlash: false,
    autoCleanUp: true
});
```

## Use of hash part of URL

Set `useHash` to `true` if you want the paths of your routes to be prefixed with a hash. You can also choose a `hashPrefix` which will be inserted between the path of a route and the hash. Those options will mostly be used by plugins such as `router5-history`.


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


## Automatic clean up

When you register a component with the router (using `.registerComponent(routeName, component)`) and if `autoCleanUp` is set to true, the router will automatically deregister that
component if `routeName` is no longer active. It saves you having to call `.deregisterComponent`.

The same logic is applied with node listeners (and not route or global listeners) in router5 listeners plugin.
