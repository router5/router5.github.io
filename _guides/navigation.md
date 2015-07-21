# Navigation

After configuring your routes, you need to _enable navigation_.

## Starting your router

```javascript
var myRouter = Router5()
    .addNode('home', '/home')
    .addNode('about', '/about')
    .addNode('contact', '/contact')
    .start();
```

Invoking the `.start()` function will:

- Navigate to the default route if the current URL does not match an existing route
- Start listening to _popstate_ events (triggered by back and forward buttons, and a manual change in the URL bar)
- Enable navigation


## Defining a default route

A default route can be set in Router5 constructor options. The following example will cause your application to navigate
to `/about`:

```javascript
var myRouter = Router5([
        new RouteNode('home', '/home'),
        new RouteNode('section', '/:section'),
    ], {
        defaultRoute: 'section'
        defaultParams: {section: 'about'}
    })
    .start(function (err) {
        /* ... */
    });
```

A callback can be passed to start and will be invoked once the router has transitioned to the default route.


## Navigating to a specific route

Router5 exposes the following method: `navigate(routeName, routeParams, opts)`.

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
myRouter.navigate('section', {section: 'concact'}, {replace: true});
```

## Knowing when a transition has been successful or not

Like for `.start()`, `.navigate()` accepts a callback You can pass a callback as its last argument:

```javascript
myRouter.navigate('route', {}, {}, function (err) {
    /* ... */
})
```

## Stoping your router

At any time you can stop (pause) a router and it will prevent any navigation. To resume, simply invoke `.start()` again.

```javascript
myRouter.stop();
```
