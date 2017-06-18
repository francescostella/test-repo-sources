const exec = require('child_process').exec;

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');

gulp.task('prepare:dist', ['clean'], function(cb) {
  exec('mkdir dist && cd dist/ && git init && git remote add origin https://github.com/francescostella/test-repo-build.git && git pull origin master', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build', ['prepare:dist'], function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:prod', ['build'], function(cb) {
  exec('cd dist/ && git config user.email "circleci@circleci.com" && git config user.name "CircleCI" && git add . && git commit -m "Build by CircleCI" && git push --quiet -u origin master', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('clean', function() {
  return del(['./dist']);
});
