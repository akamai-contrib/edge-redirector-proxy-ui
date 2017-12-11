/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
require('require-dir')('./gulp');

gulp.task('sass', function() {
  return gulp.src('src/styles/**/*.scss')
      .pipe(sass({
          outputStyle: 'compressed',
          includePaths: ['node_modules/susy/sass']
      }).on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['build-dev']);
