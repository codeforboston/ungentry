'use strict';

var gulp = require('gulp');


    //Serve Dependencies
var connect = require('gulp-connect');
var del = require('del');
var gutil = require('gulp-util');  

    //Build Dependencies 
var requirejsOptimize = require('gulp-requirejs-optimize');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');

    //Style Dependencies
var autoprefixer = require('gulp-autoprefixer');

var ghPages = require('gulp-gh-pages');

    //Dev Dependancies
var jshint = require('gulp-jshint');





	

gulp.task('build', ['','']);

gulp.task('connect', function() {
  connect.server({
     //root: 'ungentry',
  	 livereload: true
  });
});

gulp.task('html', function (){
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('watch', function (){
  gulp.watch(['index.html'], ['html']);
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

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['connect', 'watch'], function(){
   return gutil.log('Gulp is running!')
});
