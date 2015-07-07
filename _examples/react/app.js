var react        = require('react');
var router       = require('./router').router;
var SegmentMixin = require('./router').SegmentMixin;
var Nav          = require('./components/nav');

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
        var routeName = this.state.routeState.name;
        return (
            <div className="router5-react-app">
                <aside>
                    <Nav />
                </aside>

                <main>
                    <div>{routeName}</div>
                </main>
            </div>
        );
    }
});

React.render(<App/>, document.getElementById('reactExample'));
