# Why router5?

I imagine a lot of developers who will see for the first time [router5](http://router5.github.io) will ask themselves the following question:
is it yet another router? is it any good? Why oh why do people keep writing new routers all the time?

It is not always easy to see the potential of something straight away, or understand the motivations behind. I therefore decided
to try to tell you more about router5, why I decided to develop an entire new routing solution, and what problems it tries to solve.


## The rise of reactive applications

Functional programming is becoming increasingly popular, as well as having reactive applications. With functional programming comes architectures
based around components, where components are organised in a tree. Those components can apparent themselves to functions and vocabulary around them
is identical to functional programming: components are predictable, free of side-effects, they are composable, you can use higher order components...

Simultaneously, observable patterns are gaining more and more traction. Flux-like libraries are in full bloom and all share some core concepts:
whatever your implementation. a component shouldn't hold state but instead should be passed _something_ it can get data from over time and therefore
react to changes. You have a nice tree of components that you render initially and then you perform sideways data loading for
updating specific branches and leafs of your tree.

Some time ago, I started to use React. Before React, I have heavily used Angular. I still do, and I'll probably continue to do so with Angular2.
Coming from Angular, I started to look for a routing solution in React and used the most popular one: [react-router](https://github.com/rackt/react-router).
React-router is a great tool, and I felt right at home with it. Like in [ui-router](https://github.com/angular-ui/ui-router) or ngRoute, you can simply tell
it what component / view to render for each route. React-router uses the concept of higher order components to wrap your components and build a tree for you.

Playing around with different patterns, I found my playground application disjointed: I felt I had full control over data within a route but I was
giving away control on routing and my component tree mutations. Ideally a router would never update a view, but would provide the tools to do so
efficiently: a reactive application, reacting to data changes _including_ route changes.

> After all, why treat route changes any different than data changes?


## Existing routers are monolithic

The most popular routers those days are tied to frameworks (or libraries) and are fairly large pieces of software, tightly coupled together.
Angular2 and Aurelia, for example, include their own routing solution with exciting new functionalities: activation / deactivation, use
of pipelines, etc...

Routers in Angular, Angular 2, Aurelia, Ember, React... all implement everything from path recognition
to navigation and history management. They all share similar concepts or technical hurdles, but share very little code or conventions.


## Making the same mistake?

I came across [routington](https://github.com/pillarjs/routington) which is
a trie-based URL router: it organises URLs in a tree. The concept is great, and I thought it could be enhanced by organising named routes
in a tree rather than URL segments. That way, every branch of a named routes tree is a valid route. From an application point of view,
it also means it is more maintainable: you reference routes by name rather than URL. Using a tree makes building and matching paths easy,
it also goes hand in hand with a component tree and makes it easy to reason about route changes. From routington came
[route-node](https://github.com/troch/route-node).

I then needed to use a URL matching / building library. I looked at [route-parser](https://github.com/rcs/route-parser),
[url-pattern](https://github.com/snd/url-pattern) and [path-to-regexp](https://github.com/pillarjs/path-to-regexp).
Having routes in a tree, I needed a library which could match URLs fully or partially (going down the tree until a match is found).
None of the libraries mentioned could do it, so came [path-parser](https://github.com/troch/path-parser).

![Standards](https://imgs.xkcd.com/comics/standards.png)

## router5

Once route-node and path-parser were written, router5 could be designed. It delegates route management and route matching / building
and focus on navigation, taking instructions and updating its state. Plugins can be added to extend its features (browser history, listeners, etc...).
