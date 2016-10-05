var gulp = require('gulp');
var args = require('get-gulp-args')();
var webpack = require('gulp-webpack');

/// http://my.paipai.com/cgi-bin/itementry/classchoose

var fs = require('fs'),
    replace = require('gulp-replace-task');



var jsFileDir = '../prd/js/';
var siteDir = '../prd/html/';


gulp.task('build_webpack', function () {
    var arg1 = args[0];

    var jsSet = {
        index: 'c.js'
    };
    var stream, webpackConfig;
    for (var key in jsSet) {
      stream = gulp.src('js/'+jsSet[key]);
      if (arg1 === 'debug') {
        webpackConfig = require('./webpack.dev.config.js');
      }
      else {
        webpackConfig = require('./webpack.prd.config.js');
      }
          stream.pipe(webpack( webpackConfig ))
          .pipe(gulp.dest(jsFileDir));
    }


});


gulp.task('build_html', function () {
    var baseDir = 'html/';

    var processNav = fs.readFileSync(baseDir + 'process_nav.html', 'utf-8');
    var htmlSet = {
        index: 'index.html'
    };
    var stream;
    for (var key in htmlSet) {
        stream = gulp.src(htmlSet[key], { cwd: baseDir })
        .pipe(replace({
            patterns: [
                {
                    match: 'css_ref',
                    replacement: '<link rel="stylesheet" href="/css/'+key+'.bundle.css" media="screen" charset="utf-8">'
                },
                {
                    match: 'include_js',
                    replacement: '<script src="/js/'+key+'.bundle.js" charset="utf-8"></script>'
                }
            ]
        }));

        stream.pipe(gulp.dest(siteDir));
    }

});


gulp.task('build', ['build_js', 'build_html']);
