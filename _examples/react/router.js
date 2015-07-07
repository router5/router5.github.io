var Router5 = require('router5').Router5;
var r5React = require('router5-react');

var router = new Router5()
    .setOption('useHash', true)
    .setOption('defaultRoute', 'inbox')
    // Routes
    .addNode('inbox',            '/inbox')
    .addNode('inbox.message',    '/inbox/message/:id')
    .addNode('contacts',         '/contacts')
    .addNode('contacts.details', '/contacts/details/:id')
    .start();

var Link = r5React.linkFactory(router);
var SegmentMixin = r5React.segmentMixinFactory(router);


module.exports.router = router;
module.exports.Link = Link;
module.exports.SegmentMixin = SegmentMixin;
