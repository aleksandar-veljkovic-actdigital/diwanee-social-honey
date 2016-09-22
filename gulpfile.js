var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var print = require('gulp-print');
var addsrc = require('gulp-add-src');

//
// To add publication you should:
// 1. Within src folder add folder named as PUBLICATION, and within within that created folder add handlebars template named `diwanee-social-honey.handlebars`
// 2. Within `templates()` function add function-call template({PUBLICATION})
//
var templates = function () {
  template('mazyun');
};

var template = function (publication) {
  gulp.src(['src/' + publication + '/*.handlebars'])
          .pipe(plumber())
          .pipe(print(function (filepath) {
            return "precompiling: " + filepath;
          }))
          .pipe(handlebars({
            handlebars: require('handlebars')
          }))
          .pipe(wrap('Handlebars.template(<%= contents %>)'))
          .pipe(declare({
            namespace: 'DiwaneeSocialHoney.templates',
            noRedeclare: true // Avoid duplicate declarations 
          }))
          .pipe(addsrc('src/diwanee-social-honey.js'))  // MAIN FILE ADDED HERE
          .pipe(concat('diwanee-social-honey-' + publication + '.js'))
          .pipe(gulp.dest('dist'))
          .pipe(print(function (filepath) {
            return publication + " builded!";
          }));
};



gulp.task('watch', function () {
  return gulp.watch(['src/**/*.handlebars', 'src/diwanee-social-honey.js'], function () {
    templates();
  });
});

gulp.task('default', function () {
  templates();
  gulp.start('watch');
});

