var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var minifyjs = require('gulp-minify');


gulp.task('minifycss', function() {
    gulp.src('src/fastform/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('resources/public/css'));
});

gulp.task('minifyjs', function() {
    gulp.src('src/fastform/js/*.js')
        .pipe(minifyjs())
        .pipe(gulp.dest('resources/public/js'));
});

gulp.task('default', ['minifycss', 'minifyjs']);
