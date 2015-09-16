///////////////* Setup *///////////////

var gulp = require('gulp'),
  del = require('del'),
  merge = require('merge-stream'),
  imageminPngquant = require('imagemin-pngquant'),
  // concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  // concatCss = require('gulp-concat-css'),
  minifyCSS = require('gulp-minify-css'),
  rename = require("gulp-rename"),
  minifyHTML = require('gulp-minify-html'),
  uncss = require('gulp-uncss'),
  inlinesource = require('gulp-inline-source');

///////////////* Stream *///////////////

// Clean Dist
gulp.task('clean', function (cb) {
  del(['./css/*', './js/*', './img/*'], cb);
});

// Move JPGs Into Dist (Unfortunately, I cannot use imagemin because I run Win7 :'( )
gulp.task('images', function() {
  return gulp.src('./src/img/*.jpg')
    .pipe(gulp.dest('./img'));
});

// Optimize PNGs
gulp.task('pngs', ['images'], function () {
  return gulp.src('./src/img/*.png')
    .pipe(imageminPngquant({quality: '65-80', speed: 4})())
    .pipe(gulp.dest('./img'));
});

// Concatenate And Minify JavaScript
gulp.task('scripts', ['pngs'], function(){
  var bootstrap = gulp.src('./src/js/bootstrap.js')
    .pipe(rename('bootstrap.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
  var myScript = gulp.src('./src/js/script.js')
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
  return merge(bootstrap, myScript);
});

// Minify CSS
gulp.task('styles', ['scripts'], function(){
  var style = gulp.src('./src/css/style.css')
    .pipe(rename('style.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css'));
  var bootstrap = gulp.src('./src/css/bootstrap.css')
    .pipe(rename('bootstrap.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css'));
  var bootstrapTheme = gulp.src('./src/css/bootstrap-theme.css')
    .pipe(rename('bootstrap-theme.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css'));

  return merge(style, bootstrap, bootstrapTheme);
});

// Minify HTML
gulp.task('html', ['styles'], function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('./src/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./'));
});

// UnCSS by HTML
gulp.task('uncss', ['html'], function() {
  return gulp.src('./css/bootstrap.min.css')
    .pipe(uncss({html: ['./*.html']}))
    .pipe(gulp.dest('./css'));
});

// Inline HTML Sources
gulp.task('inline', ['uncss'], function() {
  return gulp.src('./*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./'));
});

///////////////* Default *///////////////
// DEFAULT Group: Optimize and Build
gulp.task('default', ['images', 'pngs', 'scripts', 'styles', 'html', 'uncss', 'inline']);

///////////////* Watch *///////////////
// Watch
gulp.task('watch', function () {
  gulp.watch('./src/*.html', ['html', 'inline']);
  gulp.watch('./src/css/*.css', ['styles', 'html', 'uncss', 'inline']);
  gulp.watch('./src/js/*.js', ['scripts', 'html', 'inline']);
  gulp.watch('./src/img/*', ['images', 'pngs']);
});