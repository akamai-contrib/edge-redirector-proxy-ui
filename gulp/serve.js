/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
/*
**  THIS GULP FILE IS FOR INITIALIZING THE VARIOUS SERVE TASKS.
*/


var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback');


/*
**  SERVE STATIC ASSETS THAT HAVE ALREADY BEEN PREBUILT IN DIST.
**  WARNING: THIS WILL NOT WORK IF YOU HAVE NOT PREBUILT YOUR DIST, RUN
**           `NPM RUN GULP` INSTEAD.
*/

    gulp.task('serve', ['bower-inject'], function(){
      browserSync.init({
        server: {
          baseDir: 'dist',
          index: 'index.html',
          middleware: [historyApiFallback()] // used for persisting SPA routes
        }
      });
    });


/*
**  SERVE STATIC ASSETS AFTER BUILDING THE DEV DIST, THIS DOES NOT CONCAT OR
**  MINIFY FILES AND IS INTENDED FOR DEVELOPMENT.
*/

    gulp.task('build-dev', ['bower-build-inject', 'sass'], function(){
      browserSync.init({
        server: {
          baseDir: 'dist',
          index: 'index.html',
          middleware: [historyApiFallback()] // used for persisting SPA routes
        }
      });

      gulp.watch("src/**", ['sass', 'build-dev-watch']);
    });

    gulp.task('build-dev-watch', ['bower-build-inject'], function(done) {
      browserSync.reload();
      done();
    });
