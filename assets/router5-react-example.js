////////////
// Router //
////////////
var router = new Router5()
    .setOption('useHash', true)
    // .setOption('hashPrefix', '!')
    .setOption('defaultRoute', 'inbox')
    // Routes
    .addNode('inbox',         '/inbox')
    .addNode('inbox.message', '/message/:id')
    .addNode('compose',       '/compose')
    .addNode('contacts',      '/contacts')
    // Plugins
    .usePlugin(Router5.loggerPlugin())
    .usePlugin(router5ListenersPlugin())
    .usePlugin(router5HistoryPlugin())
    .start();

var element = React.createElement;

var routeNode = reactRouter5.routeNode;
var Link      = reactRouter5.Link;
var Router    = reactRouter5.Router;

///////////////////
// Nav component //
///////////////////
var Nav = React.createClass({
    render: function () {
        return element('nav', {},
            element(Link, {routeName: 'inbox', routeOptions: {reload: true}}, 'Inbox'),
            element(Link, {routeName: 'compose'},  'Compose'),
            element(Link, {routeName: 'contacts'}, 'Contacts')
        );
    }
});

//////////
// Data //
//////////
function getEmails() {
    return [
        {
            "id": "1",
            "mailTitle": "Why router5?",
            "mailMessage": "I imagine a lot of developers who will first see router5 will ask themselves the question: is it yet another router? is it any good? Why oh why do people keep writing new routers all the time? It is not always easy to see the potential of something straight away, or understand the motivations behind. I therefore decided to try to tell you more about router5, why I decided to develop an entire new routing solution, and what problems it tries to solve."
        },
        {
            "id": "2",
            "mailTitle": "Use with React",
            "mailMessage": "I have just started playing with it. It does make sense to use a flux-like implementation, to provide a layer between the router and view updates."
        },
        {
            "id": "3",
            "mailTitle": "Compose a new message",
            "mailMessage": "Click on compose, start to fill title and message fields and then try to navigate away by clicking on app links, or by using the back button."
        }
    ];
}

function getEmail(id) {
    var emails = getEmails();
    var index;

    if (emails) {
        for (index in emails) {
            if (emails[index].id === id) return emails[index];
        }
    }
    return null;
}

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
        var emails = getEmails();
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
    render: function () {
        var email = getEmail(this.props.messageId);
        return element('section', {className: 'mail'},
            element('h4', null, email.mailTitle),
            element('p', null, email.mailMessage)
        );
    }
});

/////////////////////
// Inbox component //
/////////////////////
var Inbox = routeNode('inbox')(React.createClass({
    render: function () {
        var emails = getEmails();
        var route = this.props.route;

        return element('div', {className: 'inbox'},
            element(InboxList, {emails: emails}),
            route.name === 'inbox.message' ? element(Message, {messageId: route.params.id, key: route.params.id}) : null
        );
    }
}));

/////////////
// Compose //
/////////////
var Compose = React.createClass({
    getInitialState: function () {
        return {
            title: undefined,
            message: undefined
        }
    },

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    componentDidMount() {
        this.context.router.registerComponent('compose', this);
    },

    componentWillUnmount() {
        this.context.router.deregisterComponent('compose', this);
    },

    canDeactivate: function () {
        if (this.state.title || this.state.message) {
            this.setState({warning: true})
            return false;
        }
        return true;
    },

    updateTitle: function (evt) {
        this.setState({title: evt.target.value, warning: false});
    },

    updateMessage: function (evt) {
        this.setState({message: evt.target.value, warning: false});
    },

    render: function () {
        var state = this.state;

        return element('div', {className: 'compose'},
            element('h4', null, 'Compose a new message'),
            element('input', {name: 'title', value: state.title, onChange: this.updateTitle}),
            element('textarea', {name: 'message', value: state.message, onChange: this.updateMessage}),
            element('p', null, this.state.warning ? 'Clear inputs before continuing' : '')
        );
    }
});

///////////////
// Not found //
///////////////
var NotFound = React.createClass({
    render: function () {
        return element('div', {className: 'not-found'}, 'Purposely Not found (not a bug)');
    }
});

///////////////////
// Main viewport //
///////////////////
var Main = routeNode('')(React.createClass({
    getInitialState: function () {
        return {
            routeState: router.getState()
        }
    },

    getComponent: function (route) {
        var components = {
            'inbox':   Inbox,
            'compose': Compose
        };
        return route ? components[route.name.split('.')[0]] : undefined;
    },

    render: function () {
        var Component = this.getComponent(this.props.route);
        return element(Component || NotFound);
    }
}));

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
ReactDOM.render(element(Router, {router: router, children: element(App)}), document.getElementById('reactExample'));
