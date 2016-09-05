// Router
var routeNodes = {
    name: '',
    children: [
        {name: 'users', children: [
            {name: 'users.view', params: {id: 1}, segmentName: 'view'},
            {name: 'users.list', segmentName: 'list'}
        ]},
        {name: 'orders', children: [
            {name: 'orders.view', params: {id: 'AB45F8'}, segmentName: 'view'},
            {name: 'orders.completed', segmentName: 'completed'},
            {name: 'orders.pending', segmentName: 'pending'}
        ]}
    ]
};

var svg;
var height = 400;

var createRouter = router5.default;
var router = createRouter()
    .setOption('useHash', true)
    // Users
    .addNode('users',      '/users')
    .addNode('users.view', '/view/:id')
    .addNode('users.list', '/list')
    // Orders
    .addNode('orders',           '/orders')
    .addNode('orders.completed', '/completed')
    .addNode('orders.pending',   '/pending')
    .addNode('orders.view',      '/details/:id')
    .usePlugin(router5ListenersPlugin())
    .usePlugin(router5BrowserPlugin())
    .addListener(drawGraph)
    .start(function (err, state) {
        drawGraph(state, null);
    });
// Draw graph
function drawGraph(toState, fromState) {
    toState = toState || {};
    fromState = fromState || {};

    var width = Math.min(500, document.getElementById('svgRouteTree').clientWidth - 40);
    if (svg) {
        svg.remove();
        document.getElementById('svgRouteTree').removeChild(document.querySelector("#svgRouteTree svg"));
    }

    var cluster = d3.layout.cluster()
        .size([width, height - 100]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.x, d.y]; });

    svg = d3.select('#svgRouteTree').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(0, 30)');

    var nodes = cluster.nodes(routeNodes);
    var links = cluster.links(nodes);

    var link = svg.selectAll(".link")
        .data(links)
        .enter()
            .append("path")
            .attr("class", function (d) {
                if (!toState.name) return "link";
                if (toState.name.indexOf(d.target.name) >= 0 && toState.name.indexOf(d.source.name) >= 0) return "link active";
                if (fromState.name && fromState.name.indexOf(d.target.name) === 0 &&
                    toState.name.indexOf(d.target.name) === -1) return 'link deactivated';
                return "link";
            })
            .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
            .append("g")
            .attr("class", function(d) {
                if (toState.name === d.name) return 'node active match';
                if (fromState.name && fromState.name.indexOf(d.name) === 0 &&
                    toState.name.indexOf(d.name) === 0) {
                    var toSegments = toState.name.split('.');
                    var fromSegments = fromState.name.split('.');
                    for (var i = 0; Math.min(toSegments.length, fromSegments.length); i+=1) {
                        if (toSegments[i] !== fromSegments[i]) break;
                    }
                    if (i === 0 && d.name === '') return 'node active apex';
                    if (i > 0 && d.name === toSegments[i - 1]) return 'node active apex';
                }
                if (toState.name && toState.name.indexOf(d.name) === 0) return 'node active';
                var segment = d.name.split('.').reverse()[0];
                if (fromState.name && fromState.name.indexOf(d.name) === 0 &&
                    toState.name.indexOf(d.name) === -1) return 'node deactivated';
                return 'node';
            })
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

    node.append("circle")
        .attr("r", 10)
        .on('click', function (d) {
            if (d.name) {
                router.navigate(d.name, d.params);
            }
        });

    node.append("text")
        .attr("dx", function(d) { return d.children ? -15 : 0; })
        .attr("dy", function(d) { return d.children ? 5 : 25; })
        .style("text-anchor", function(d) { return d.children ? "end" : "middle"; })
        .text(function(d) { return d.segmentName || d.name; });
}

window.addEventListener('resize', function () {
    drawGraph(router.getState(), null);
}, false);
