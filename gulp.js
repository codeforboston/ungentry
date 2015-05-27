var gulp = require('gulp');


    //Serve Dependencies
var connect = require('gulp-connect');
var del = require('del');  

    //Build Dependencies 
var requirejsOptimize = require('gulp-requirejs-optimize');
var minifyHTML = require('gulp-minify-html');

    //Style Dependencies
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var ghPages = require('gulp-gh-pages');

    //Dev Dependancies
var jshint = require('gulp-jshint');




gulp.task('default', ['webserver']);
	

gulp.task('build', ['',''], function(){

});

gulp.task('webserver', function() {
  connect.server({
  	livereload: true
  });
});

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

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});