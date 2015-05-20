var gulp = require('gulp');
var requirejsOptimize = require('gulp-requirejs-optimize');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');

gulp.task('default', function() {
  // place code for your default task here
})

gulp.task('scripts', function () {
    return gulp.src('src/main.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
return gulp.src('./static/html/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-css', function() {
  return gulp.src('styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});