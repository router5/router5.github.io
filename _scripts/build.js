var nunjucks       = require('nunjucks');
var path           = require('path');
var fs             = require('fs');
var async          = require('async');
var marked         = require('marked');
var objectAssign   = require('object-assign');

var router5Version = require('../package.json').version

var generateApi    = require('./generate-api');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

var env = nunjucks.configure(path.join(__dirname, '../'), {watch: false});

var data = {
    pageTitle: 'router5 | flexible and powerful routing solution for web applications',
    styleSheets: ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/monokai.min.css', '/styles/main.css']
};

function renderPage(page, customData) {
    return function (done) {
        nunjucks.render(path.join(__dirname, '../_pages', page), objectAssign({}, data, customData), function (err, res) {
            fs.writeFile(path.join(__dirname, '..', page), res, done);
        });
    };
}

function renderDoc(dir, page, customData) {
    return function (done) {
        fs.readFile(path.join(__dirname, '..', dir, page), function (err, md) {
            if (err) {
                done(err);
                return;
            }

            var docData = objectAssign({}, data, customData, {
                styleSheets: [
                    '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/github-gist.min.css',
                    '/styles/main.css',
                    '/styles/docs.css',
                    '/styles/examples.css'
                ],
                article: marked(md.toString())
            });

            nunjucks.render(path.join(__dirname, '../_pages/docs.html'), docData, function (err, res) {
                fs.writeFile(path.join(__dirname, '..', 'docs', page.replace(/\.md$/, '.html')), res.replace(/lang-javascript/g, 'lang-javascript javascript'), done);
            });
        });
    };
}

function renderApi(done) {
    generateApi(function (err, doc) {
        nunjucks.render(path.join(__dirname, '../_pages/api.html'), doc, function (err, docHtml) {
            var docData = objectAssign({}, data, {
                styleSheets: [
                    '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/github.min.css',
                    '/styles/main.css',
                    '/styles/docs.css'
                ],
                apiRef: true,
                article: docHtml
            });

            nunjucks.render(path.join(__dirname, '../_pages/docs.html'), docData, function (err, res) {
                fs.writeFile(path.join(__dirname, '..', 'docs/api-reference.html'), res.replace(/lang-javascript/g, 'lang-javascript javascript'), done);
            });
        });
    })
};

async.parallel([
    renderPage('index.html', {home: true, router5Version: router5Version, pageTitle: data.pageTitle.replace(' docs ', ' ')}),
    renderDoc('_docs', 'get-started.md', {getStarted: true}),
    renderDoc('_docs', 'migration.md', {migration: true}),
    renderDoc('_docs', 'migration-2.md', {migration2: true}),
    renderDoc('_guides', 'configuring-routes.md', {confRoutes: true, docs: true}),
    renderDoc('_guides', 'router-options.md', {options: true, docs: true}),
    renderDoc('_guides', 'navigation.md', {navigation: true, docs: true}),
    renderDoc('_guides', 'transition.md', {transition: true, docs: true}),
    renderDoc('_guides', 'middleware.md', {middleware: true, docs: true}),
    renderDoc('_plugins', 'listeners.md', {listeners: true, plugins: true}),
    renderDoc('_plugins', 'history.md', {history: true, plugins: true}),
    renderDoc('_guides', 'plugins.md', {usePlugins: true, docs: true}),
    renderDoc('_guides', 'path-syntax.md', {pathSyntax: true, docs: true}),
    renderDoc('_guides', 'preventing-navigation.md', {preventNav: true, docs: true}),
    renderDoc('_guides', 'universal-applications.md', {universal: true, docs: true}),
    renderDoc('_docs', 'understanding-router5.md', {understanding: true}),
    renderDoc('_guides', 'async-data.md', {asyncData: true, docs: true}),
    // renderApi,
    renderDoc('_docs', 'ecosystem.md', {ecosystem: true, examples: true}),
    renderDoc('_docs', 'with-react.md', {react: true, examples: true, scripts: [
        '/assets/router5-react-example.js'
    ]}),
    renderDoc('_docs', 'with-react-redux.md', {reactRedux: true, examples: true, scripts: [
        '/assets/router5-react-redux-example.js'
    ]}),
    renderDoc('_docs', 'with-deku.md', {deku: true, examples: true, scripts: [
        '/assets/router5-deku-example.js'
    ]}),
    renderDoc('_docs', 'with-deku-redux.md', {dekuRedux: true, examples: true, scripts: [
        '/assets/router5-deku-redux-example.js'
    ]})
], function (err, res) {
    if (err) console.log(err);
    process.exit(err ? 1 : 0);
});
