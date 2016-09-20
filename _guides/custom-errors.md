# Custom errors and redirections

> When failing a transition function (canActivate, canDeactivate, middleware) custom errors can be returned. Custom errors can be a string or an object and will be added to the error object and passed to `start` and `navigate` callbacks).


## Custom errors

### A string

```js
router.canActivate('profile', (router) => (toState, fromState, done) => {
    done('my custom error');
});

router.navigate('profile', (err, state) => {
    /* Error:
    {
        code: 'CANNOT_ACTIVATE',
        segment: 'profile',
        error: 'my custom error'
    }
    /*
})
```

### An object

```js
router.canActivate('profile', (router) => (toState, fromState, done) => {
    done({
        why: 'because'
    });
});

router.navigate('profile', (err, state) => {
    /* Error:
    {
        code: 'CANNOT_ACTIVATE',
        segment: 'profile',
        why: 'because'
    }
    */
})
```

### Promises

With promises, make sure you return a rejected promise.

```js
router.canActivate('profile', (router) => (toState, fromState, done) => {
    return isUserLoggedIn()
        .catch(() => Promise.reject({ why: 'because'}));
});
```

## Redirecting after an error

A custom error can return an object with a `redirect` property (object defining a route by `name` and `params`).

```js
router.canActivate('profile', (router) => (toState, fromState, done) => {
    return isUserLoggedIn()
        .catch(() => Promise.reject({ redirect: { name: 'login' }}));
});

router.navigate('profile', (err, state) => {
    // err is null
    state.name === 'login';
});
```
