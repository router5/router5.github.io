# Options

> You can configure your router instance by passing options to the constructor or by using `.setOption(optName, optValue)`.

```javascript
var router = createRouter([], {
        defaultRoute: 'home',
        defaultParams: {},
        trailingSlash: false,
        useTrailingSlash: undefined,
        autoCleanUp: true,
        strictQueryParams: true,
        allowNotFound: false
    })
    .setOption('strictQueryParams', false)
```


## Default route

When your router instance starts, it will navigate to a default route if such route is defined and if it cannot match the URL against a known route:

- `defaultRoute`: the default route.
- `defaultParams`: the default route params (defaults to `{}`)

See [navigation guide](/docs/navigation.html) for more information.


## Optional trailing slashes

By default, the router is in "strict match" mode. If you want trailing slashes to be optional, you can set `trailingSlash` to a truthy value.

## Building with or without trailing slashes

By default, the router will build your routes according to your route definitions. You can force or not the use of trailing slashes by setting `useTrailingSlash` to `true` or `false` (default to `undefined`); When setting this option, `trailingSlash` will be set to true (non strict matching).


## Automatic clean up

If `autoCleanUp` is set to true, the router will automatically clear `canDeactivate` functions / booleans when their associated segment becomes inactive.


## Strict query parameters

Query parameters are optional, meaning a route can still be matched if a query parameter defined in its path is not present. However, if extra query parameters are present in the path which is being matched, matching will fail.

If you want the router to still match routes if extra query parameters are present, set `strictQueryParams` to `false`.


## Allow not found

There are two ways to deal with not found routes: the first one is to configure a `defaultRoute` (and `defaultParams`), the second one is to allow those not found routes to create a new routing state. Set `allowNotFound` to true and the router will allow unknown URLs to create new state objects looking like the following (with `/route-not-found` being the not matched path):

```js
import { constants } from 'router5';

{
    name: constants.UNKNOWN_ROUTE
    params: { path: '/route-not-found' },
    path: '/route-not-found'
}
```
