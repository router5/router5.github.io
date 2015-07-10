# Why router5?

I imagine a lot of developers who will see for the first time [router5](http://router5.github.io) will ask themselves the following question:
is it yet another router? is it any good? Why oh why do people keep writing new routers all the time?

It is not always easy to see the potential of something straight away, or understand the motivations behind. I therefore decided
to try to tell you more about router5, why I decided to develop an entire new routing solution, and what problems it tries to solve.


## The raise of reactive programming

Observable patterns are becoming increasingly popular, with both ES6 and FRP (Functional Reactive Programming)
getting more traction everyday. If you have never heard about FRP, or if you are unfamiliar with it,
I recommend reading [the introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754).

Like an increasing number of developers I see a future for non-monolithic front-end development solutions, made of loosely coupled building blocks glued together by FRP. I started to use React. Before React, I have heavily used Angular. I still do, and I'll probably continue to do so with Angular2. Coming from Angular, I started to look for a routing solution in React and used the most popular one: [react-router](https://github.com/rackt/react-router).
React-router is a great tool, and it is easy to use: like in [ui-router](https://github.com/angular-ui/ui-router) or ngRoute, I can simply tell it what component / view to render for each route.

With FRP and Flux-like architectures, I became increasingly keen on using more observables and observers in my application.
Very soon, I found my application disjointed: using nice observable patterns for data with sideways data loading, but giving away control on routing.

Looking at [react-mini-router](https://github.com/larrymyers/react-mini-router) or [tiny-react-router](https://github.com/asbjornenge/tiny-react-router),
I realised that in order to treat route changes like data changes, I would need a framework-agnostic router which would favour __convention over
configuration__.


## Existing routers are black boxes

The most popular routers those days are tied to frameworks (or libraries) and are fairly large pieces of software, tightly coupled together.
Angular2 and Aurelia, for example, include their own routing solution with exciting new functionalities: activation / deactivation, use
of pipelines, etc...

Routers in Angular1, Angular2, Aurelia, Ember, React... have all something in common: they implement everything from path recognition
to navigation and history management. They all share similar concepts or technical hurdles, but share very little code or conventions.


## Making the same mistake?

Let's go back to observables and component-based applications. Thanks to [DailyJS](http://dailyjs.com/),
I came across [routington](https://github.com/pillarjs/routington). It is a trie-based URL router: it organises URLs in a tree. The concept is
great, and I thought it could be enhanced by organising named routes in a tree rather than URL segments. That way, every branch of a named
routes tree is a valid route. From an application point of view, it also means it is more maintainable: you reference routes by name rather
than URL.

Using a tree makes building and matching paths easy. It also goes hand in hand with a component tree. If one can do sideways data loading,
why not do sideways route loading, or compose the two?

From routington came [route-node](https://github.com/troch/router5). I then needed to use a URL parsing library. I looked at
[route-parser](https://github.com/rcs/route-parser), [url-pattern](https://github.com/snd/url-pattern) and
[path-to-regexp](https://github.com/pillarjs/path-to-regexp). Having routes in a tree, I needed a library which could match
URLs fully or partially (going down the tree until a match is found), I also needed to build URLs by passing parameters.

None of the libraries mentioned could do all of that, so came [path-parser](https://github.com/troch/path-parser).

![Standards](https://imgs.xkcd.com/comics/standards.png)

## router5

Once route-node and path-parser were written, router5 could be designed. It delegates route management and route matching / building
and focus on navigation, history and triggering listeners.

By only supporting IE10, it means only browsers with HTML5 history are supported. It makes the library lighter by not having to add
polyfills or fallbacks.
