'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  
  
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     
     // Watches files for changes and runs tasks based on the changed files
     watch: {
     	js:{
     	   files: ['<%= pkg.name %>/src/{,*/}*.js'],
     	   tasks: ['newer:jshint:all'],
     	   options: {
     	   	livereload: '<%=connect.options.livereload %>'
     	   }     	     
     	}
     	styles: {
         files: ['<%= pkg.name %>/src/{,*/}*.css'],
         tasks: ['newer:copy:styles', 'autoprefixer']
       },
       gruntfile: {
         files: ['gruntfile.js']
       },
       livereload: {
         options: {
           livereload: '<%= connect.options.livereload %>'
         },
         files: [
           '<%= pkg.name %>/{,*/}*.html',
           '.tmp/styles/{,*/}*.css'
         ]
       }
     },




     requirejs: {
       compile: {
         options: {
           baseUrl: ".",
           mainConfigFile: "main.js",
           name: "node_modules/almond", // assumes a production build using almond
           out: "dist"
         }
       }
     }

  });





  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });


 grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  };