'use strict';
////////////
// Router //
////////////
var router = new Router5()
    .setOption('useHash', true)
    .setOption('defaultRoute', 'inbox')
    // Routes
    .addNode('inbox',         '/inbox')
    .addNode('inbox.message', '/message/:id')
    .addNode('compose',       '/compose')
    .addNode('contacts',      '/contacts')
    .start();

var tree = deku.tree;
var render = deku.render;
var element = deku.element;

var dekuExampleApp = tree()

var Link = linkFactory(router)
var SegmentDecorator = segmentDecoratorFactory(router, dekuExampleApp)

///////////////////
// Nav component //
///////////////////
var Nav = {
    render: function () {
        return element('nav', {},
            element(Link, {routeName: 'inbox', routeOptions: {reload: true}}, 'Inbox'),
            element(Link, {routeName: 'compose'},  'Compose'),
            element(Link, {routeName: 'contacts'}, 'Contacts')
        );
    }
};


////////////////////
// Main component //
////////////////////
var Main = {
    initialState: function (props) {
        return {
            currentRoute: router.getState()
        };
    },

    render: function (component) {
        var currentRoute = component.state.currentRoute;
        console.log(currentRoute);
        return element('main', {}, 'Current route is: ' + (currentRoute ? currentRoute.name : 'unkown'));
    }
};
Main = SegmentDecorator(Main, '', function (component, setState, toRoute, fromRoute) {
    setState({currentRoute: toRoute})
});

///////////////////
// App component //
///////////////////
var App = {
    render: function () {
        return element('div', {'class': 'mail-client'},
            element('aside', null, element(Nav)),
            element('main', null, element(Main))
        );
    }
};

// var dekuExampleApp = tree(element(App));

router.addListener(function (toState) {
    dekuExampleApp.set('currentRoute', toState);
});

dekuExampleApp
    .set('currentRoute', router.getState())
    .mount(element(App))

render(dekuExampleApp, document.getElementById('dekuExample'));
