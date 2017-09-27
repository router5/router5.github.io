# Universal/Isomorphic Apps

> JavaScript applications which run both client-side and server-side, typically sharing all or most of the same codebase.

_Router5_ is just as capable on the server versus in the browser. This enables you to reuse the same routes for both your client-side navigating and your server-side pre-render.

This is essentially done via two steps:

 1. **Server-side** - Pass to your router the current URL (since there's no `location` object on the server).
 2. **Client-side** - Pass to your router a starting state (via the `done` callback of _Step 1_) so that your router doesn't try to transition to the already activated page.

#### Below is a more in-depth tutorial

## Create your router (client & server)

You can use the same code for configuring your router on both client and server sides. The history plugin, for example, can be safely used on Node.js and in browsers.

```js
const createRouter = require( 'router5' ).default;
const listenersPlugin = require( 'router5/plugins/listeners' );
const browserPlugin = require( 'router5/plugins/browser' );

function createRouter() {
    return createRouter([
            { name: 'home', path: '/home' },
            { name: 'about', path: '/about' },
            { name: 'contact', path: '/contact' },
            { name: '404', path: '/404' }
        ], {
            trailingSlash: true,
            defaultRoute: '404'
        })
        .usePlugin(browserPlugin({
            useHash: false
        }))
        .usePlugin(listenersPlugin())
}

export default createRouter
```

## Server-side Routing
> This example is an [Express](http://expressjs.com/) with [Swig](http://paularmstrong.github.io/swig/) application. Make changes were needed to suit your preferred frameworks.

For universal applications, you need to:
- Create a new router instance for each request, using the request URL
- Send the state to the client and start your router with this initial state

**`server.js`**
```javascript
import express from 'express';
import createRouter from 'router5';
import swig from 'swig';

const app = express();

// Swig is used for templating in this example
// Use what you are comfortable with
app.engine( 'html', swig.renderFile );
app.set( 'view engine', 'html' );
app.set( 'views', './views' );

app.get( '*', ( req, res ) => {
	// Create a new router for each request
	const router = createRouter();

    router.start( req.originalUrl, function done( error, state ) {
        if ( error ) {
            res.status( 500 ).send( error );
        } else {
            res.send(/* Use your router state, send some HTML! */ );
        }
    });

} );

app.listen( 8080, function logServerStart() {
    console.log( 'Server is listening on port 8080...' );
} );
```
**`base.html`**
```html
<!doctype html>
<html lang="en-US">
    <head>
        <title>Example Server-side Routing</title>
    </head>

    <body>
        <script src="/js/router.js"></script>
        <script type="text/javascript">
            /**
             * Load the App's inital state from the server
             * @type {JSON}
             */
            var initialState = JSON.parse('{{ initialState | safe }}');


            /**
             * Start our Router
             * @param  {Error} error  Router start error
             * @param  {Object} state State Object
             * @return {undefined}
             */
            app.router.start(initialState, function(error, state) {
                if (error) console.error('router error', error);
            });
        </script>
    </body>

</html>

```

From here forth, you can continue to use router5 as if it was a regular Single-Page Application.


### Performance

A new router should be created on each request. There is no evidence of performance issues, however router5 includes a cloning mechanism to reduce the time it takes to create a router. Create a base router, and clone it for each request.

```js
const baseRouter = createRouter(/* ... */);

const router = baseRouter.clone(dependencies);
```

### Important to Remember - Pass in an Object

It is important to remember that `router.start()` **does NOT** parse your starting state for you. If you pass in a `String` instead of an `Object` your router will attempt to navigate to the path of that string.
