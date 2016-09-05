# Navigation

> After configuring your routes, you need to _enable navigation_ by starting your router instance.

## Starting your router

```javascript
const myRouter = Router5([
    { name: 'home', path: '/home' },
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' }
]);

myRouter.start('/home');
```

> When using `.start()`, you should supply a starting path or state except if you use the browser plugin (the current URL will automatically be used).

Invoking the `.start(startPathOrState[, done])` function will:

- Attempt to navigate to `startPathOrState`
- Attempt to match the current URL if no `startPathOrState` was provided, or navigation failed
- Attempt to navigate to the default route if it could not match the provided start path or if `startPathOrState` was not provided / failed

And will:

- Enable navigation

Providing a starting state is designed to be used for universal JavaScript applications: see [universal applications](/docs/universal-applications.html).


## Defining a default route

A default route can be set in Router5 constructor options. The following example will cause your application to navigate
to `/about`:

```javascript
var myRouter = Router5([
        { name: 'home', path: '/home' },
        { name: 'section', path: '/:section' }
    ], {
        defaultRoute: 'section'
        defaultParams: {section: 'about'}
    })
    .start(function (err, state) {
        /* ... */
    });
```

A callback can be passed to start and will be invoked once the router has transitioned to the default route.


## Navigating to a specific route

Router5 exposes the following method: `navigate(routeName, routeParams, opts)`. This method has to be
called for navigating to a different route: __clicks on links won't be intercepted by the router__.

```javascript
myRouter.navigate('section', {section: 'contact'});
// Will navigate to '/contact'
```

__Forcing a reload__

When trying to navigate to the current route nothing will happen unless `reload` is set to `true`.

```javascript
myRouter.navigate('section', {section: 'contact'}, {reload: true});
```

__Replacing current state__

Set `replace` to true for replacing the current state in history when navigating to a new route. Default
behaviour is to add an entry in history.

```javascript
myRouter.navigate('section', {section: 'contact'}, {replace: true});
```

## Knowing when a transition has been successful or not

Like for `.start()`, `.navigate()` accepts a callback (last argument):

```javascript
myRouter.navigate('route', function (err, state) {
    /* ... */
})
```

## Stopping your router

At any time you can stop (pause) a router and it will prevent any navigation. To resume, simply invoke `.start()` again.

```javascript
myRouter.stop();
```
