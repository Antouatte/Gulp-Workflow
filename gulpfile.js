'use strict';


var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');


// CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
gulp.task('css', function () {
  gulp.src('sass/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('www/src'));
});


// JS
var uglify = require('gulp-uglify');
gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('www/src'));
});


// JSHINT
var jshint = require('gulp-jshint');
var jshintfiles = 'js/scripts.js';
gulp.task('jshint', function() {
  return gulp.src(jshintfiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});


// HTML
var include = require('gulp-include');
gulp.task('html', function() {
  gulp.src('html/*.html')
    .pipe(plumber())
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest('www'));
});


// DEFAULT GULP TASK
var browserSync = require('browser-sync').create();
gulp.task('default', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch('sass/*.scss', ['css']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch(jshintfiles, ['jshint']);
  gulp.watch(['html/*.html','include/*.html'], ['html']);
  gulp.watch(['www/index.html','www/src/*.js','www/src/*.css']).on('change', browserSync.reload);
});
