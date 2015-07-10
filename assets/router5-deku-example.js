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
    .use(routerPlugin(router));

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
var InboxItem = {
    shouldComponentUpdate: function (component, nextProps, nextState) {
        return nextProps.mailTitle !== component.props.mailTitle;
    },

    render: function (component) {
        var props = component.props;

        function clickHandler(evt, component, updateState) {
            router.navigate('inbox.message', {id: component.props.id})
        }

        return element(
            'li', {onClick: clickHandler},
            element('h4', null, props.mailTitle),
            element('p', null, props.mailMessage)
        );
    }
};


/////////////////////////
// Mail List component //
/////////////////////////
var InboxList = {
    render: function () {
        var emails = getEmails();

        return element('ul', {'class': 'mail-list'}, emails.map(function (mail) {
            mail.key = mail.id;
            return element(InboxItem, mail);
        }));
    }
};

////////////////////
// Mail Component //
////////////////////
var Message = {
    initialState: function (component) {
        return {
            routeState: router.getState()
        };
    },

    render: function (component) {
        var email = getEmail(component.state.routeState.params.id);
        return element('section', {'class': 'mail'},
            element('h4', null, email.mailTitle),
            element('p', null, email.mailMessage)
        );
    }
};
SegmentDecorator(Message, 'inbox.message', function (component, setState, toRoute) {
    setState({routeState: toRoute});
});

/////////////////////
// Inbox component //
/////////////////////
var Inbox = {
    initialState: function (component) {
        return {
            routeState: router.getState()
        };
    },

    render: function (component) {
        var emails = getEmails();
        var routeState = component.state.routeState;

        return element('div', {class: 'inbox'},
            element(InboxList, {emails: emails}),
            routeState.name === 'inbox.message' ? element(Message) : null
        );
    }
};
SegmentDecorator(Inbox, 'inbox', function (component, setState, toRoute) {
    setState({routeState: toRoute});
});

/////////////
// Compose //
/////////////
var Compose = SegmentDecorator({
    initialState: function () {
        return {
            title: undefined,
            message: undefined,
            warning: false
        }
    },

    canDeactivate: function (component, setState) {
        console.log(component, setState);
        if (component.state.title || component.state.message) {
            setState({warning: true})
            return false;
        }
        return true;
    },

    render: function (component) {
        var state = component.state;

        function updateTitle(evt, component, setState) {
            setState({title: evt.target.value, warning: false});
        }

        function updateMessage(evt, component, setState) {
            setState({message: evt.target.value, warning: false});
        }

        return element('div', {'class': 'compose'},
            element('h4', null, 'Compose a new message'),
            element('input', {name: 'title', value: state.title, onInput: updateTitle}),
            element('textarea', {name: 'message', value: state.message, onInput: updateMessage}),
            element('p', null, state.warning ? 'Clear inputs before continuing' : '')
        );
    }
}, 'compose');

///////////////
// Not found //
///////////////
var NotFound = {
    render: function () {
        return element('div', {'class': 'not-found'}, 'Purposely Not found (not a bug)');
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
        function getComponent(routeState) {
            var components = {
                'inbox':   Inbox,
                'compose': Compose
            };
            return routeState ? components[routeState.name.split('.')[0]] : undefined;
        }

        var currentRoute = component.state.currentRoute;
        return element(getComponent(currentRoute) || NotFound);
    }
};
SegmentDecorator(Main, '', function (component, setState, toRoute, fromRoute) {
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

dekuExampleApp.mount(element(App))

render(dekuExampleApp, document.getElementById('dekuExample'));
