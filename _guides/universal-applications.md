# Universal/Isomorphic Apps

> JavaScript applications which run both client-side and server-side, typically sharing all or most of the same codebase.

_Router5_ is just as capable on the server versus in the browser. This enables you to reuse the same routes for both your client-side navigating and your server-side pre-render.

This is essentially done via two steps:

 1. **Server-side** - Pass _Router5_ the current URL (since there's no `location` object on the server).
 2. **Client-side** - Pass _Router5_ a starting state (via the `done` callback of _Step 1_) so that _Router5_ doesn't try to transition to the already activated page.

#### Below is a more in-depth tutorial

## Create your router (client & server)

You can use the same code for configuring your router on both client and server sides.

```js
const Router5 = require( 'router5' ).Router5;
const listenersPlugin = require( 'router5-listeners' );
const historyPlugin = require( 'router5-history' );

const router = new Router5()
	.setOption( 'useHash', false )
	.setOption( 'trailingSlash', true )
	.setOption( 'defaultRoute', '404' )
	.usePlugin( historyPlugin() )
	.usePlugin( listenersPlugin() )
	.addNode( 'home', '/home' )
	.addNode( 'about', '/about' )
	.addNode( 'contact', '/contact' )
	.addNode( '404', '/404' );
```

## Server-side Routing
> This example is an [Express](http://expressjs.com/) with [Swig](http://paularmstrong.github.io/swig/) application. Make changes were needed to suit your preferred frameworks.

**`server.js`**
```javascript
'use strict';

/**
 * Add our Imports
 */
const express = require( 'express' );
const swig = require( 'swig' );
const router = require( './js/router.js' );

/**
 * Init an app
 */
const app = express();

/**
 * Set Swig as the HTML engine
 */
app.engine( 'html', swig.renderFile );

/**
 * Use Swig on our HTML
 */
app.set( 'view engine', 'html' );
app.set( 'views', './views' );

/**
 * Listen to any and all URLs
 */
app.get( '*', function loadSite( req, res ) {

	// Start Router5 and send it the original URL from Express
	router.start( req.originalUrl, function done( state ) {

		// Send our JSON-encoded state to Swig
		res.render( 'base', {
			initialState: JSON.stringify( state )
		} );

		// Stop the router when we're done
		router.stop();

	});

} );

/**
 * Start the App
 */
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

From here forth, you can continue to use Router5 as if it was a regular Single-Page Application.

### Important to Remember - Pass in an Object
It is important to remember that `Router5.start()` **does NOT** parse your starting state for you. If you pass in a `String` instead of an `Object` _Router5_ will attempt to navigate to the path of that string.
