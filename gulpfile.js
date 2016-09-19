var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

var template = function (publication) {
  gulp.src('src/mazyun/*.handlebars')
          .pipe(handlebars({
            handlebars: require('handlebars')
          }))
          .pipe(wrap('Handlebars.template(<%= contents %>)'))
          .pipe(declare({
            namespace: 'DiwaneeSocialHoney.templates',
            noRedeclare: true // Avoid duplicate declarations 
          }))
          .pipe(concat('diwanee-social-honey-mazyun.js'))
          .pipe(gulp.dest('dist'));
};

gulp.task('default', function () {
  template();
});