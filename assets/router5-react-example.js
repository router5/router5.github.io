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

/////////////////////
// Inbox component //
/////////////////////
var Inbox = React.createClass({
    getInitialState: function () {
        return {
            emails: [
                {
                    key: 1,
                    mailFrom: 'Me',
                    mailTitle: 'Hello',
                    mailMessage: 'Have you checked the docs?'
                }
            ]
        }
    },

    render: function () {
        var emails = this.state.emails;
        return React.createElement('ul', null, emails.map(function (mail) {
            return React.createElement('InboxItem', mail);
        }));
    }
});

///////////////
// Main view //
///////////////
var Main = React.createClass({
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

        return React.createElement('main', null, routeName);
    }
});

///////////////////
// App component //
///////////////////
var App = React.createClass({
    render: function () {
        return React.createElement('div', {className: 'mail-client'},
            React.createElement('aside', null, React.createElement(Nav)),
            React.createElement(Main, null)
        );
    }
});

////////////////
// Render App //
////////////////
React.render(React.createElement(App), document.getElementById('reactExample'));
