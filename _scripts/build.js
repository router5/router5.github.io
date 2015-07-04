var nunjucks = require('nunjucks');
var path     = require('path');
var fs       = require('fs');
var async    = require('async');

var env = nunjucks.configure(path.join(__dirname, '../'), {watch: false});

var data = {
    pageTitle: 'router5 docs | simple yet powerful routing solution!',
    styleSheets: ['styles.css']
};

function renderPage(page) {
    return function (done) {
        nunjucks.render(path.join(__dirname, '../_pages', page), data, function (err, res) {
            fs.writeFile(path.join(__dirname, '..', page), res, done);
        });
    };
}

async.parallel([
    renderPage('index.html'),
    renderPage('docs.html')
], function (err, res) {
    if (err) console.log(err);
    process.exit(err ? 1 : 0);
});
