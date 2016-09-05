# Loading async data

> Loading async data is always an important task of a web application. Very often, data and routes are tied to your application business logic. Therefore, loading data on a route change is very common.

The way data loading can work with routing depends on what you might call your "routing strategy":
- Do you want a route transition to wait for data to be loaded?
- Do you want a route transition to fail if data cannot be loaded?
- How do you bind your view to data?

There are many ways to handle data coming from a router and from an API:
- your components can receive them both at the same time
- your components can receive a route update first and then a data update later
- your components can receive a route update first and decide to load data
- etc...

Router5 doesn't provide an opinionated way of handling async data, instead this article demonstrates the tools router5 can provide to help you loading data. You shouldn't view those examples as _the_ way to load data, their purpose is purely illustrative and they don't cover every case (error handling, server-side data loading, etc...). Instead you should aim to do things and organise your code the way you think is best for you and your application.

## Using a middleware

> You can use your router state objects as a container for route-specific data.

You can use a middleware if you want your router to wait for data updates and/or prevent a route transition to happen if data loading fails.
When doing so, you can use `toState` state object as a container for your route-specific data: the listeners plugin will pass it to your view (with the data you attached to it). You shouldn't mutate `toState` if you don't explicitly ask the router to wait by either calling a `done` callback or by returning a promise.

First, we need to define what data need to be loaded for which route segment:

```javascript
import { get } from 'xr';

const routes = [
    {
        name: 'home',
        path: '/home'
    },
    {
        name: 'users',
        path: '/users',
        onActivate: (params) => get('/users').then(data => ({ users: data.users }))
    },
    {
        name: 'users.user',
        path: '/:id',
        onActivate: (params) => get(`/users/${params.id}`).then(data => ({ user: data.user }))
    }
]
```

Then we create a middleware function which will invoke data for the activated segments on a route change. In this example, data are loaded in parallel using `Promise.all`. You can proceed differently by loading data in series, or by implementing dependencies between your `onActivate` handlers.

```javascript
import transitionPath from 'router5.transition-path';

const dataMiddlewareFactory = (routes) => (router) => (toState, fromState) => {
    const { toActivate } = transitionPath(toState, fromState);
    const onActivateHandlers =
        toActivate
            .map(segment => routes.find(r => r.name === segment))
            .filter(segment => segment.onActivate !== undefined)
            .map(segment => segment.onActivate);

    return Promise
        .all(onActivateHandlers)
        .then(data => {
            const routeData = data.reduce((accData, rData) => Object.assign(accData, rData), {});
            return { ...toState, data: routeData };
        });
};
```

And when configuring your router:

```javascript
import { routes } from './routes';

const router = createRouter(routes);
/* ... configure your router */

/* data middleware */
router.useMiddleware(dataMiddlewareFactory(routes));
```

In the case you don't want a route transition to wait for data to be loaded, you cannot use the router state object as a data container. Instead, you should load data from your components or use a state container like [redux](http://rackt.org/redux/index.html).


## Using a state container (redux)

> Using a state container like redux gives you a lot more flexibility with your routing strategy.

Using a state container like redux gives you a lot more flexibility with your routing strategy. Because all data ends up in the same bucket that your components can listen to, data loading doesn't need to happen within components or to be synced with route transitions. As a result, your view can represent with greater details the state of your application: for example your UI can be a lot more explicit about displaying loading feedback.

The following example uses a redux store with a `redux-thunk` middleware.

```javascript
import { get } from 'xr';
import { loadUsers, loadUser } from './actionCreators';

const routes = [
    {
        name: 'home',
        path: '/home'
    },
    {
        name: 'users',
        path: '/users',
        onActivate: (params) => (dispatch) =>
            get('/users').then(data => dispatch(loadUsers(data.users)))
    },
    {
        name: 'users.user',
        path: '/:id',
        onActivate: (params) => (dispatch) =>
            get(`/users/${params.id}`).then(data => dispatch(loadUser(data.user)))
    }
]
```

You need to create your store and router, and pass your store to your router instance (with `.inject()`):

```javascript
router.setDependency('store', store);
```

Then we create a router5 middleware for data which will load data on a transition success.

```javascript
import { actionTypes } from 'redux-router5';
import transitionPath from 'router5.transition-path';

const onRouteActivateMiddleware = routes => (router, { store }) => (toState) => {
    const { toActivate } = transitionPath(action.payload.route, action.payload.previousRoute);

    toActivate.forEach(segment => {
        const routeSegment = routes.find(r => r.name === segment);
        if (routeSegment && routeSegment.onActivate) {
            store.dispatch(routeSegment.onActivate(action.payload.route.params));
        }
    });
};
```

Finally, just create your store and include `onRouteActivateMiddleware(routes)` middleware.

## Async data loading and universal applications

The two examples above show two different techniques of loading data with a router5 middleware. One is blocking, one is non-blocking. But what about universal applications?

The answer is very simple: block on the server-side, and choose to block or not on the client-side! For the redux example, we need to return a promise of all dispatched promises and we are done.
