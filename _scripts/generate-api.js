var docchi   = require('docchi');
var fs       = require('fs');
var path     = require('path');

function filterTagByType(type) {
    return function (tag) {
        return tag.title === type;
    };
}

function normalizeParam(paramType) {
    if (paramType.type === 'AllLiteral') return ['*'];
    if (paramType.type === 'UnionType') {
        return paramType.elements.map(normalizeParam)
            .reduce(function (red, elm) {
                return red.concat(elm);
            });
    }
    if (paramType.type === 'NameExpression') {
        return [paramType.name];
    }
    if (paramType.type === 'TypeApplication') {
        return [paramType.applications[0].name + '[]'];
    }
    if (paramType.type === 'OptionalType') {
        return normalizeParam(paramType.expression);
    }
    console.log(paramType);
}

function normalizeParams(param) {
    if (param.type.type === 'UnionType') {
        param.type = param.type.elements.map(normalizeParam);
        return param;
    }
    if (param.type.type === 'OptionalType') {
        param.optional = true;
    }
    param.type = normalizeParam(param.type);
    if (param.optional) {
        param.type[0] += '=' + param.default;
    }
    return param;
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
            .map(function (block, index) {
                var block = {
                    name: block.context.name,
                    description: block.comment.description,
                    params: block.comment.tags.filter(filterTagByType('param')).map(normalizeParams),
                    returns: block.comment.tags.filter(filterTagByType('return')).map(normalizeParams)
                };

                block.signature = (index === 0 ? '' : 'router5.') + block.name + '(' + block.params.map(function (param) {
                    return param.name;
                }).join(', ') + ')';

                return block;
            });

        var classBlock   = blocks[0];
        var methodBlocks = blocks.slice(1);
        // .sort(function (a, b) {
        //     return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        // });

        done(null, {'class': classBlock, methods: methodBlocks});
    });
};
