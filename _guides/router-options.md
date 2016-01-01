# Options

> You can configure your router instance by passing options to the constructor or by using `.setOption(optName, optValue)`.

```javascript
var router = new Router5([], {
        useHash: true,
        hashPrefix: '!',
        defaultRoute: 'home',
        defaultParams: {},
        base: '',
        trailingSlash: false,
        autoCleanUp: true,
        strictQueryParams: true
    })
    .setOption('useHash', false)
    .setOption('hashPrefix', '');
```

## Use of hash part of URL

Set `useHash` to `true` if you want the paths of your routes to be prefixed with a hash. You can also choose a `hashPrefix` which will be inserted between the path of a route and the hash. Those options will mostly be used by plugins such as `router5-history`.


## Default route

When your router instance starts, it will navigate to a default route if such route is defined and if it cannot match the URL against a known route:

- `defaultRoute`: the default route.
- `defaultParams`: the default route params (defaults to `{}`)

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

## Strict query parameters

Query parameters are optional, meaning a route can still be matched if a query parameter defined in its path is not present. However, if extra query parameters are present in the path which is being matched, matching will fail.

If you want the router to still match routes if extra query parameters are present, set `strictQueryParams` to `false`.
