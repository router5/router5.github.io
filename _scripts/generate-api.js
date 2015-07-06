var docchi   = require('docchi');
var fs       = require('fs');
var path     = require('path');

function filterTagByType(type) {
    return function (tag) {
        return tag.title === type;
    };
}

// Parse a string or a buffer.
module.exports = function (done) {
    fs.readFile(path.join(__dirname, '..', 'node_modules/router5/modules/Router5.js'), function (err, res) {
        if (err) done(err);

        var blocks = docchi
            .parse(res.toString())
            .output()
            .filter(function (block) {
                if (block.comment.tags) {
                    return !block.comment.tags.some(filterTagByType('private'));
                }
                return true;
            })
            .map(function (block) {
                return {
                    name: block.context.name,
                    description: block.comment.description,
                    params: block.comment.tags.filter(filterTagByType('param'))
                        .map(function (param) {
                            param.type = param.type.name || param.type.type;
                            return param;
                        }),
                    returns: block.comment.tags.filter(filterTagByType('return'))
                };
            });

        var classBlock   = blocks[0];
        var methodBlocks = blocks.slice(1);

        done(null, {'class': classBlock, methods: methodBlocks});
    });
};
