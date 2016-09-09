var docchi   = require('docchi');
var fs       = require('fs');
var path     = require('path');

function filterTagByType(type) {
    type = Array.isArray(type) ? type : [type];
    return function (tag) {
        return type.indexOf(tag.title) !== -1;
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
    if (param.optional && param.default !== undefined) {
        param.type[0] += '=' + param.default;
    }
    return param;
}

// Parse a string or a buffer.
module.exports = function (done) {
    fs.readFile(path.join(__dirname, '..', '..', 'router5/create-router.js'), function (err, res) {
        if (err) {
            done(err);
            return;
        }

        var blocks = docchi
            .parse(res.toString())
            .output()
            .filter(function (block) {
                if (block.comment.tags) {
                    return !block.comment.tags.some(filterTagByType(['private']));
                }
                return true;
            })
            .map(function (block, index) {
                var block = {
                    name: block.context.name,
                    description: block.comment.description.replace(/(<p>|<\/p>)/g, '').trim(),
                    params: block.comment.tags.filter(filterTagByType('param')).map(normalizeParams),
                    returns: block.comment.tags.filter(filterTagByType('return')).map(normalizeParams)
                };
                block.signature = block.name === 'createRouter' ? block.name : 'router.' + block.name;
                block.signature += '(' + block.params.map(function (param) {
                        return !param.optional ? param.name : '[' + param.name + ']';
                    }).join(', ') + ')';

                return block;
            });

        console.log(blocks);
        // .sort(function (a, b) {
        //     return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        // });

        done(null, blocks);
    });
};
