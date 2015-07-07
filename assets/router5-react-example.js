////////////
// Router //
////////////

var router = new Router5()
    .setOption('useHash', true)
    .setOption('defaultRoute', 'inbox')
    // Routes
    .addNode('inbox',            '/inbox')
    .addNode('inbox.message',    '/inbox/message/:id')
    .addNode('contacts',         '/contacts')
    .addNode('contacts.details', '/contacts/details/:id')
    .start();

var Link = linkFactory(router);
var SegmentMixin = segmentMixinFactory(router);


///////////////////
// Nav component //
///////////////////
var Nav = React.createClass({
    render: function () {
        return React.createElement('nav', {},
            React.createElement(Link, {routeName: 'inbox'}, 'Inbox'),
            React.createElement(Link, {routeName: 'contacts'}, 'Contacts')
        );
    }
});

///////////////////
// App component //
///////////////////

var App = React.createClass({
    mixins: [SegmentMixin('', function (toState, fromState) {
        this.setState({routeState: toState});
    })],

    getInitialState: function () {
        return {
            routeState: router.getState()
        }
    },

    render: function () {
        var routeState = this.state.routeState;
        var routeName = routeState ? routeState.name : 'unknown';
        return React.createElement('div', {className: 'mail-client'},
            React.createElement('aside', {}, React.createElement(Nav)),
            React.createElement('main', {}, routeName)
        );
    }
});

////////////////
// Render App //
////////////////

React.render(React.createElement(App), document.getElementById('reactExample'));
