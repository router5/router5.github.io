# Universal applications

_Also called "isomorphic" applications._

You can use _router5_ in Node or the browser. You might want to initialise (render) your application
on the server side before sending it to the browser. It is perfectly feasible with _router5_ and
you essentially need to do two things:

- On the server, pass to the router the current URL as it won't be able to guess it: `start(url, done)`.
The `done` callback will return the initial state: you need to send it to the client (see below).
- On the client side, pass to the router the initial state so the router doesn't try to transition
to the matched page URL or the default route.

## Create your router (client & server)

You can use the same code for configuring your router on both client and server sides.

```javascript
let router = new Router5()
    .addNode('home', '/home')
    .addNode('about', '/about')
    .addNode('contact', '/contact');
```

## On the server

```javascript
// With express, you would pass req.originalUrl
router.start(serverUrl, function (err, state) {
    // Serialise state and send it in a "<script></script>" tag
    // so it can be retrieved on the client side
    let script =  `<script>window.initialState = ${JSON.stringify(state)}</script>`
});
```

## In the browser

Tell the router the app was already initialised:

```javascript
// Read starting state
let startState = window.initialState;
// Tell the router the application is already initialised with startState so
// it won't try to transition to the current URL or default route.
router.start(startState, function (err, state) {
    // ...
});
```
