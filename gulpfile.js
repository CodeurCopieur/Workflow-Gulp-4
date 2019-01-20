'use strict';
const gulp = require('gulp'),
      gp = require('gulp-load-plugins')();


const paths = {
      html : {
          src : './src/pug/pages/*.pug',
          dest: './build/html'
      },
      css: {
          src : './src/static/sass/*.scss',
          dest : './build/css'
      }
}

const pug = () =>
      gulp.src(paths.html.src)
          .pipe(gp.pug({
              pretty: true
          }))
          .pipe(gulp.dest(paths.html.dest))

const sass = () =>
      gulp.src(paths.css.src)
          .pipe(gp.sourcemaps.init())
          .pipe(gp.plumberNotifier())
          .pipe(gp.sass({
              'include css': true
           }))
           .pipe(gp.autoprefixer({
                browsers: ['last 10 versions']
            }))
            .on("error", gp.notify.onError({
                title: "stile"
            }))
           .pipe(gp.csscomb())
           .pipe(gp.cssbeautify({indent: ' '}))
           .pipe(gp.csso())
           .pipe(gp.sourcemaps.write())
           .pipe(gulp.dest(paths.css.dest))          

exports.pug = pug;
exports.sass = sass;