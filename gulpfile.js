var gulp = require('gulp');
var args = require('get-gulp-args')();
var gulpWebpack = require('gulp-webpack');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var webpack = require('webpack');
var runSequence = require('run-sequence');

/// http://my.paipai.com/cgi-bin/itementry/classchoose

var fs = require('fs'),
    replace = require('gulp-replace-task');

    var dataFormat = require('dateformat'),
        now = dataFormat(new Date(), 'yyyymmddHHMMss');

var jsFileDir = './dist/js/';
var cssFileDir = './dist/css/';
var siteDir = './dist/temphtml/';

var htmlCount = 0, flagCount =0;

gulp.task('build', function () {
    var arg1 = args[0];

    var cssSet = {
        index: ['g.css', 'index.css'],
        index1: ['g.css', 'index.css']
    };
    var htmlSet = {
      index: 'index.html',
      index1: 'index1.html'
    };
    var stream, streamHtml;
    for (var key in cssSet) {
        stream = gulp
            .src(cssSet[key], { cwd: './css/' });
        if (arg1 !== 'debug') {
            stream = stream.pipe(cleanCSS({compatibility: 'ie8'}));
        }

        stream.pipe(concat(key+".bundle.css"))
           .pipe(gulp.dest(cssFileDir));

      ++htmlCount;
       streamHtml = gulp.src(htmlSet[key], { cwd: './html/' })
       .pipe(replace({
           patterns: [
               {
                   match: 'css_ref',
                   replacement: '<link rel="stylesheet" href="/css/'+key+'.bundle.css?'+now+'" media="screen" charset="utf-8">'
               }
           ]
       }));

       streamHtml.pipe(gulp.dest(siteDir))
       .on('end',function () {
         ++flagCount;
        //  console.log(flagCount+","+htmlCount);
         if (flagCount===htmlCount) {
           runSequence("build_webpack");
           flagCount =0;
           htmlCount =0;
         }
       });


    }


});

// gulp.task('build_js', function () {
//     var arg1 = args[0];
//
//     var jsSet = {
//         index: ['require.js', 'jquery-1.8.3.min.js', 'mustache.js', 'logout.js', 'common.js', 'index.js'],
//         shopconfirm: ['require.js', 'jquery-1.8.3.min.js', 'mustache.js', 'logout.js', 'common.js', 'shopconfirm.js']
//     };
//     var stream;
//     for (var key in jsSet) {
//         stream = gulp
//             .src(jsSet[key], { cwd: 'js/' });
//         if (arg1 !== 'nojsmin') {
//             stream = stream.pipe(uglify());
//         }
//
//         stream
//             .pipe(concat(key+"_combo.js"))
//            .pipe(gulp.dest(staticFileDir));
//     }
//
//
// });
//, ['build_css']
gulp.task('build_webpack',function () {
    // setTimeout(function() {
      var arg1 = args[0];
      // console.log(arg1);
      var jsSet = {
          index: './js/c.js',
          index1: './js/c.js'
      };
      var stream, webpackConfig;
      for (var key in jsSet) {
        stream = gulp.src(jsSet[key]);

        if (arg1 === 'debug') {
          webpackConfig = require('./webpack.dev.config.js');
        }
        else {
          webpackConfig = require('./webpack.prd.config.js');
        }
            stream.pipe(gulpWebpack( webpackConfig ))
            .pipe(gulp.dest(jsFileDir));
      }
    // }, 1000);

});


// gulp.task('webpack',function () {
//     var arg1 = args[0];
//     console.log(arg1);
//     var jsSet = {
//         index: './js/c.js',
//         index1: './js/c.js'
//     };
//     var stream, webpackConfig;
//     for (var key in jsSet) {
//       stream = gulp.src(jsSet[key]);
//       if (arg1 === 'debug') {
//         webpackConfig = require('./webpack.dev.config.js');
//       }
//       else {
//         webpackConfig = require('./webpack.prd.config.js');
//       }
//           stream.pipe(gulpWebpack( webpackConfig ))
//           .pipe(gulp.dest(jsFileDir));
//     }
// });



// gulp.task('build_html', function () {
//     var baseDir = 'html/';
//
//     var processNav = fs.readFileSync(baseDir + 'process_nav.html', 'utf-8');
//     var htmlSet = {
//         index: 'index.html'
//     };
//     var stream;
//     for (var key in htmlSet) {
//         stream = gulp.src(htmlSet[key], { cwd: baseDir })
//         .pipe(replace({
//             patterns: [
//                 {
//                     match: 'css_ref',
//                     replacement: '<link rel="stylesheet" href="/css/'+key+'.bundle.css" media="screen" charset="utf-8">'
//                 },
//                 {
//                     match: 'include_js',
//                     replacement: '<script src="/js/'+key+'.bundle.js" charset="utf-8"></script>'
//                 }
//             ]
//         }));
//
//         stream.pipe(gulp.dest(siteDir));
//     }
//
// });


// gulp.task('build', function () {
//   runSequence("build_css","build_webpack");
// });
