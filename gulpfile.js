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
          .pipe(gulp.dest(paths.html.dest));

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
            .on("Erreur", gp.notify.onError({
                title: "stile"
            }))
           .pipe(gp.csscomb())
           .pipe(gp.cssbeautify({indent: ' '}))
           .pipe(gp.csso())
           .pipe(gp.sourcemaps.write())
           .pipe(gulp.dest(paths.css.dest));  


const watch = () =>
        gulp.watch('./src/pug/pages/**/*.pug', pug)
        gulp.watch('./src/static/sass/**/*.scss', sass)
        

const build = gulp.series(gulp.parallel(pug, sass, watch));

exports.pug = pug;
exports.sass = sass;
exports.watch = watch;

gulp.task('default', build);