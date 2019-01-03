(function() {

  'use strict';

  // Include Gulp & Tools
  var gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      minifycss    = require('gulp-minify-css'),
      autoprefixer = require('gulp-autoprefixer'),
      concat       = require('gulp-concat'),
      rename       = require('gulp-rename'),
      jshint       = require('gulp-jshint'),
      uglify       = require('gulp-uglify'),
      plumber      = require('gulp-plumber'),
      gutil        = require('gulp-util'),
      replace      = require('gulp-replace'),
      fs           = require('fs');

  // Set the compiler to use Dart Sass instead of Node Sass
  sass.compiler = require('dart-sass');

  var onError = function( err ) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
  };

  // SASS
  gulp.task('sass', function (done) {
    return gulp.src('./assets/sass/*.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./assets/css'))
    done();
  });

  gulp.task('inlinecss', function(done) {
    return gulp.src(['partials/inline-css.hbs'])
    .pipe(replace('@@compiled_css', fs.readFileSync('assets/css/style.min.css')))
    .pipe(gulp.dest('partials/compiled'))
    done();
  });

  // JavaScript
  gulp.task('js', function(done) {
    return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './node_modules/evil-icons/assets/evil-icons.min.js',
      './bower_components/fitvids/jquery.fitvids.js',
      './node_modules/prismjs/prism.js',
      './node_modules/lunr/lunr.js',
      './node_modules/lunr-languages/lunr.stemmer.support.js',
      './node_modules/lunr-languages/lunr.ru.js',
      './node_modules/lunr-languages/lunr.fr.js',
      './node_modules/lunr-languages/lunr.de.js',
      './node_modules/lunr-languages/lunr.es.js',
      './node_modules/lunr-languages/lunr.pt.js',
      './node_modules/lunr-languages/lunr.it.js',
      './node_modules/lunr-languages/lunr.fi.js',
      './node_modules/lunr-languages/lunr.du.js',
      './node_modules/lunr-languages/lunr.da.js',
      './node_modules/lunr-languages/lunr.multi.js',
      './assets/js/ghosthunter.js',
      './assets/js/app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'))
    done();
  });

  gulp.task('watch', function() {
    gulp.watch('assets/sass/**/*.scss', gulp.series('build_css'));
    gulp.watch(['./assets/js/app.js', './assets/js/ghosthunter.js'], gulp.series('js'));
  });

  gulp.task(
    'build_css',
    gulp.series('sass', 'inlinecss')
  );

  gulp.task(
    'build',
    gulp.series('build_css', 'js')
  );

  gulp.task(
    'default',
    gulp.series('build', 'watch')
  );

})();