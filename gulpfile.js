const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');

gulp.task('build', ['clean'], function() {
  gulp.src('src/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
  return del(['./dist']);
});
