var react = require('React');
var Link  = require('../router').Link;

module.exports = React.createClass({
    render: function () {
        return (
            <nav>
                <Link routeName="inbox">Inbox</Link>
                <Link routeName="contacts">Contacts</Link>
            </nav>
        );
    }
});
