var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var print = require('gulp-print');

var template = function (publication) {
  gulp.src('src/' + publication + '/*.handlebars')
          .pipe(plumber())
          .pipe(print(function (filepath) {
            return "precompiling: " + filepath
          }))
          .pipe(handlebars({
            handlebars: require('handlebars')
          }))
          .pipe(wrap('Handlebars.template(<%= contents %>)'))
          .pipe(declare({
            namespace: 'DiwaneeSocialHoney.templates',
            noRedeclare: true // Avoid duplicate declarations 
          }))
          .pipe(concat('diwanee-social-honey-' + publication + '.js'))
          .pipe(gulp.dest('dist'));
};

// Add publications hire
var templates = function () {
  template('mazyun');
};

gulp.task('watch', function () {
  return gulp.watch('src/**/*.handlebars', function () {
    templates();
  });
});

gulp.task('default', function () {
  templates();
  gulp.start('watch');
});

