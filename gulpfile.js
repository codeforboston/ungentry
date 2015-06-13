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
var notify = require('gulp-notify');

    //Style Dependencies
var autoprefixer = require('gulp-autoprefixer');

var ghPages = require('gulp-gh-pages');

    //Dev Dependancies
var jshint = require('gulp-jshint');






gulp.task('default', ['connect', 'watch'], function(){
   return gutil.log('Gulp is running!')
});	

gulp.task('build', ['clean','styles','html','scripts']);

gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});


gulp.task('connect', function() {
  connect.server({
     port: 3000,
  	 livereload: true
  });
});

 //Watch files for Livereload
gulp.task('watch', function (){
  //watch html files
  gulp.watch(['index.html'], ['html']);
  //watch css files
  gulp.watch(['./src/*.css'],['css']);

})

gulp.task('html', function (){
  gulp.src('index.html')
    .pipe(connect.reload());
});
gulp.task('css',function(){
  gulp.src('./src/*.css')
    .pipe(connect.reload());
  })

// Clean
gulp.task('clean', function(cb) {
    del(['dist/*.html', 'dist/src'], cb)
});


//minify html for build
gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src('./*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'HTML task complete' }));
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/src'))
    .pipe(notify({ message: 'Styles task complete' }));
});

//Optimize/minify JS scripts for build
gulp.task('scripts', function () {
    return gulp.src('src/main.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'Scripts task complete' }));
});




