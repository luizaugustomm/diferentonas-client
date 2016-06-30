var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ghPages = require('gulp-gh-pages');
var replace = require('replace');

var replaceFiles = ['./www/js/app.js'];

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('deploy-ionic-serve', ['remove-ghpages-proxy'], function() {
  return replace({
    regex: "http://diferentonas.herokuapp.com",
    replacement: "http://localhost:8100",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('deploy-emulator', ['remove-ghpages-proxy'], function() {
  return replace({
    regex: "http://localhost:8100",
    replacement: "http://diferentonas.herokuapp.com",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('add-ghpages-proxy', function() {
  return replace({
    regex: "http://",
    replacement: "https://crossorigin.me/http://",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('remove-ghpages-proxy', function() {
  return replace({
    regex: "https://crossorigin.me/http://",
    replacement: "http://",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('deploy', ['deploy-emulator', 'add-ghpages-proxy'], function() {
  return gulp.src('./www/**/*')
    .pipe(ghPages());
});
