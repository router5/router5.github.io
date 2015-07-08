////////////
// Router //
////////////
var router = new Router5()
    .setOption('useHash', true)
    .setOption('defaultRoute', 'inbox')
    // Routes
    .addNode('inbox',            '/inbox')
    .addNode('inbox.message',    '/inbox/message/:id')
    .addNode('sent',             '/sent')
    .addNode('contacts',         '/contacts')
    .addNode('contacts.details', '/contacts/details/:id')
    .start();

var Link = linkFactory(router);
var SegmentMixin = segmentMixinFactory(router);

var element = React.createElement;

///////////////////
// Nav component //
///////////////////
var Nav = React.createClass({
    render: function () {
        return element('nav', {},
            element(Link, {routeName: 'inbox'},    'Inbox'),
            element(Link, {routeName: 'sent'},     'Sent'),
            element(Link, {routeName: 'contacts'}, 'Contacts')
        );
    }
});

/////////////////////////
// Mail Item component //
/////////////////////////
var InboxItem = React.createClass({
    clickHandler: function () {
        router.navigate('inbox.message', {id: this.props.id})
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return nextProps.mailTitle !== this.props.mailTitle;
    },

    render: function () {
        var props = this.props;

        return element(
            'li', {onClick: this.clickHandler},
            element('h4', null, props.mailTitle),
            element('p', null, props.mailMessage)
        );
    }
});

/////////////////////////
// Mail List component //
/////////////////////////
var InboxList = React.createClass({
    render: function () {
        var emails = this.props.emails;
        return element('ul', {className: 'mail-list'}, emails.map(function (mail) {
            mail.key = mail.id;
            return element(InboxItem, mail);
        }));
    }
});

////////////////////
// Mail Component //
////////////////////
var Message = React.createClass({
    mixins: [SegmentMixin('inbox.message', function (toState, fromState) {
        this.setState({routeState: toState});
    })],

    getInitialState: function () {
        return {
            routeState: router.getState()
        };
    },

    render: function () {
        var id = this.state.routeState.params.id;
        return element('section', {className: 'mail'}, id);
    }
});

/////////////////////
// Inbox component //
/////////////////////
var Inbox = React.createClass({
    mixins: [SegmentMixin('inbox', function (toState, fromState) {
        this.setState({routeState: toState});
    })],

    getInitialState: function () {
        return {
            routeState: router.getState(),
            emails: [
                {
                    id: 1,
                    mailFrom: 'Me',
                    mailTitle: 'Hello',
                    mailMessage: 'Have you checked the docs? Have you checked the docs? Have you checked the docs? Have you checked the docs? Have you checked the docs? Have you checked the docs? Have you checked the docs? Have you checked the docs?'
                },
                {
                    id: 2,
                    mailFrom: 'Me',
                    mailTitle: 'Hello2',
                    mailMessage: 'Have you checked the docs2?'
                }
            ]
        };
    },

    render: function () {
        var emails = this.state.emails;
        var routeState = this.state.routeState;

        return element('div', {className: 'inbox'},
            element(InboxList, {emails: emails}),
            routeState.name === 'inbox.message' ? element(Message) : null
        );
    }
});

///////////////
// Not found //
///////////////
var NotFound = React.createClass({
    render: function () {
        return element('div', null, 'Not found.');
    }
});

///////////////////
// Main viewport //
///////////////////
var Main = React.createClass({
    mixins: [SegmentMixin('', function (toState, fromState) {
        this.setState({routeState: toState});
    })],

    getInitialState: function () {
        return {
            routeState: router.getState()
        }
    },

    getComponent: function (routeState) {
        var components = {
            'inbox': Inbox
            // 'contacts': Inbox
        };
        return routeState ? components[routeState.name.split('.')[0]] : undefined;
    },

    render: function () {
        var routeState = this.state.routeState;
        var Component = this.getComponent(routeState);

        return element(Component || NotFound);
    }
});

///////////////////
// App component //
///////////////////
var App = React.createClass({
    render: function () {
        return element('div', {className: 'mail-client'},
            element('aside', null, element(Nav)),
            element('main', null, element(Main))
        );
    }
});

////////////////
// Render App //
////////////////
React.render(element(App), document.getElementById('reactExample'));
