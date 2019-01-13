'use strict';

const paths = {
      html : {
          src : './src/pug/pages/*.pug',
          dest: './build/html'
      }
}

const gulp = require('gulp'),
      pug = require('gulp-pug');

const pug_g = () =>
      gulp.src(paths.html.src)
          .pipe(pug({
              pretty: true
          }))
          .pipe(gulp.dest(paths.html.dest))


exports.pug_g = pug_g;