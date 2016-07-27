(function() {

  'use strict';

  // Include Gulp & Tools
  var gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      minifycss    = require('gulp-minify-css'),
      autoprefixer = require('gulp-autoprefixer'),
      runSequence  = require('run-sequence'),
      concat       = require('gulp-concat'),
      rename       = require('gulp-rename'),
      jshint       = require('gulp-jshint'),
      uglify       = require('gulp-uglify'),
      plumber      = require('gulp-plumber'),
      gutil        = require('gulp-util');

  var onError = function( err ) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
  };

  // SASS
  gulp.task('sass', function () {
    return gulp.src('./assets/sass/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./assets/css'));
  });

  // JavaScript
  gulp.task('js', function(){
    return gulp.src([
      './assets/js/scripts/jquery-2.1.4.min.js',
      './assets/js/scripts/jquery.fitvids.js',
      './assets/js/scripts/jquery.ghostHunter.min.js',
      './assets/js/scripts/script.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'));
  });

  // Watch
  gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/js/scripts/**/*.js', ['js']);
  });

  // Build
  gulp.task('build', [], function() {
    runSequence('sass', 'js');
  });

  // Default
  gulp.task('default', ['watch'], function() {
    gulp.start('build');
  });

})();