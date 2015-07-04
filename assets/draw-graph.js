// Router
var router = new Router5()
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
    .start();

// Links
// Array.prototype.slice
//     .call(document.querySelectorAll('a.nav-link'))
//     .forEach(function(link) {
//         var routeName = link.getAttribute('route-name');
//         var routeParams = JSON.parse((link.getAttribute('route-params') || '{}').replace(/'/g, '"'));

//         link.setAttribute('href', router.buildPath(routeName, routeParams));

//         link.addEventListener('click', function (evt) {
//             evt.preventDefault();
//             router.navigate(routeName, routeParams);
//         }, false);
//     });

routeNodes = {
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
var height = 380;
// Draw graph
function drawGraph() {
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

    var nodes = cluster.nodes(routeNodes),
        links = cluster.links(nodes);

    var link = svg.selectAll(".link")
        .data(links)
        .enter()
            .append("path")
            .attr("class", function (d) {
                var currentState = router.getState() || {};
                if (!currentState.name) return "link";
                return currentState.name.indexOf(d.target.name) >= 0 && currentState.name.indexOf(d.source.name) >= 0 ? "link active" : "link";
            })
            .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
            .append("g")
            .attr("class", function(d) {
                var currentState = router.getState() || {};
                if (currentState.name === d.name) return 'node active match';
                if (currentState.name && currentState.name.indexOf(d.name) === 0) return 'node active';
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

drawGraph();

window.addEventListener('resize', drawGraph, false);

router.addListener(drawGraph);
