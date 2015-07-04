var nunjucks       = require('nunjucks');
var path           = require('path');
var fs             = require('fs');
var async          = require('async');
var marked         = require('marked');
var objectAssign   = require('object-assign');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

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

function renderDoc(page) {
    return function (done) {
        fs.readFile(path.join(__dirname, '../_docs', page), function (err, md) {
            if (err) {
                done(err);
                return;
            }

            var docData = objectAssign({}, data, {
                styleSheets: ['styles.css', 'docs.css'],
                article: marked(md.toString())
            });

            nunjucks.render(path.join(__dirname, '../_pages/docs.html'), docData, function (err, res) {
                fs.writeFile(path.join(__dirname, '..', page.replace(/\.md$/, '.html')), res, done);
            });
        });
    };
}

async.parallel([
    renderPage('index.html'),
    renderDoc('why-router5.md'),
], function (err, res) {
    if (err) console.log(err);
    process.exit(err ? 1 : 0);
});
