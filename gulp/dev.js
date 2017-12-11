/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
/*
**  THIS BUILD IS FOR CREATING DIST FOR DEVELOPMENT.
**  IT ALSO SERVES THE DIST.
*/


var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject');


/*
**  TAKES THE MAIN BOWER JS & CSS FILES FROM EACH BOWER DEPENDENCY AND SAVES
**  THEM TO ./APP/LIB/(JS|CSS)
*/

    gulp.task('bower-js', function(){
      var vendorDirectory = './src/lib/js';
      var bowerStreamJS = gulp.src(bowerFiles('**/*.js'));

      return bowerStreamJS
        .pipe(gulp.dest(vendorDirectory));
    });

    gulp.task('bower-css', function(){
      var vendorDirectory = './src/lib/css';
      var bowerStreamCSS = gulp.src(bowerFiles('**/*.css'));

      return bowerStreamCSS
        .pipe(gulp.dest(vendorDirectory));
    });


/*
**  BUILDS THE ./DIST DIRECTORY AND COPIES ALL ASSETS AVAILABLE IN ./APPS.
*/

    gulp.task('build', ['bower-js', 'bower-css'], function () {
      return gulp.src(['src/**', '!src/styles', '!src/styles/**'])
        .pipe(gulp.dest('dist'));
    });


/*
**  INJECTS FILE LOCATIONS INTO THE INDEX.HTML
*/
    // Simply for serving
    gulp.task('bower-inject', function(){
      injectApp();
    });

    // Builds & injects
    gulp.task('bower-build-inject', ['build'], function(){
      injectApp();
    });


    function injectApp() {
      var _BOWERDEPS = [
        './dist/lib/js/angular.js',
        './dist/lib/js/angular-ui-router.js',
        './dist/lib/js/toArrayFilter.js',
        './dist/lib/js/dirPagination.js'
      ];

      var _APPLICATION = [
        './dist/app/**/*.js'
      ]

      return gulp.src('./dist/index.html')
      .pipe(inject(gulp.src(_BOWERDEPS, {read:false}), {ignorePath: 'dist', name: 'BOWERDEPS'}))
      .pipe(inject(gulp.src(_APPLICATION, {read:false}), {ignorePath: 'dist', name: 'APPLICATION'}))
      .pipe(gulp.dest('dist'));
  }
