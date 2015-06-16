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
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

    //Style Dependencies
var autoprefixer = require('gulp-autoprefixer');

    //Dev Dependancies
var jshint = require('gulp-jshint');

   //Deploy that sh*t!
var ghPages = require('gulp-gh-pages');






gulp.task('default', ['connect', 'watch'], function(){
   return gutil.log('Gulp is running!')
});	

gulp.task('build', ['clean','styles', 'leaflet', 'htmlUgly', 'images', 'scripts']);

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

// Clean:  cleans paths by deleting temp files and previous build versions
gulp.task('clean', function(cb) {
    del(['dist/*.html', 'dist/src/*.css', 'dist/src/*.js'], cb)
});


//htmlUgly: minifies html and pushes to 'dist'
gulp.task('htmlUgly', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src('index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'HTML task complete' }));
});

// Styles: minifies css and pushes to 'dist'
gulp.task('styles', function() {
  return gulp.src('src/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/src/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

//Leaflet: minifies leaflet css and pushes to 'dist'
gulp.task('leaflet', function() {
    return gulp.src('lib/leaflet-0.7.3/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/lib/leaflet-0.7.3/'))
    .pipe(notify({ message: 'Leaflet task complete' }));
});

//Scripts: Optimizes RequireJS modules for build and pushes to 'dist'
gulp.task('scripts', function () {
    return gulp.src('./src/main.js')
        .pipe(requirejsOptimize({
              mainConfigFile: './src/main.js', 
          }))
        .pipe(gulp.dest('dist/src'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

//Images: Minimize images and push to 'dist'
gulp.task('images', function (){
     return gulp.src('lib/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/lib/images'))
        .pipe(notify({ message: 'Images task complete' }));

  });




