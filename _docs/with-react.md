# Router5 with React

## Example

View the source [on GitHub](https://github.com/router5/router5.github.io/blob/master/assets/router5-react-example.js)

<div id="reactExample"></div>

## router5-react

Installation:

```sh
// Bower
bower install router5-react --save
// npm
npm install router5-react --save-dev
```

- A link factory to create a `Link` function
- A mixin factory to create a `SegmentMixin` mixin (add a node listener for the specified route)

The use of factories is to avoid using contexts. One way to use them is:

```javascript
import React from 'react'
import {Router5} from 'router5'
import {linkFactory, segmentMixinFactory} from 'router5-react'

var router = new Router5()
    .setOption('useHash', true)
    .setOption('defaultRoute', 'inbox')
    // Routes
    .addNode('inbox',            '/inbox')
    .addNode('inbox.message',    '/message/:id')
    .addNode('compose',          '/compose')
    .addNode('contacts',         '/contacts')
    .start()

var Link = linkFactory(router)
var SegmentMixin = segmentMixinFactory(router)

export {router, Link, SegmentMixin}
```

### Segment mixin

The most relevant [listener](/docs/listeners.html) for React is `addNodeListener(route, fn)`
because you are most likely on a route change to want to target the component you'll need to
e-render from.

`SegmentMixin(routeName[, listener])` does the following:

- Register component with the router (navigation can be prevented if a `canDeactivate` function returns false)
- If a listener is supplied, it will be added as a _node listener_ to the router. See [guide on listeners](/docs/listeners.html) for more information.

```javascript
var Main = React.createClass({
    mixins: [SegmentMixin('', function (toState) {
        this.setState({routeState: toState});
    })],

    getInitialState: function () {
        return {
            routeState: router.getState()
        }
    },

    getComponent: function (routeState) {
        var components = {
            'inbox':   Inbox,
            'compose': Compose
        };
        return routeState ? components[routeState.name.split('.')[0]] : undefined;
    },

    render: function () {
        var routeState = this.state.routeState;
        var Component = this.getComponent(routeState);
        var data = this.state.data;

        return element(Component || NotFound);
    }
});
```


### Link component

Link components automatically register a listener with the router and apply an active class
if there is a route match. Properties supported:

- `routeName`: the route name the link navigates to
- `routeParams`: the route params
- `routeOptions`: reload, replace
- `activeClassName`: the class name to use when active
- `activeStrict`: default to false, whether the link is active if the router current route
is exaclty the link route, or if it is one of its descendant.
-

```javascript
import React from 'react'
import {Link} from './router'

var Nav = React.createClass({
    render: function () {
        return (
            <nav>
                <Link routeName="inbox" routeOptions={reload: true}>Inbox</Link>
                <Link routeName="compose">Compose</Link>
                <Link routeName="contacts">Contacts</Link>
            </nav>
        );
    }
});

export Nav
```
