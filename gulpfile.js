var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    usemin = require('gulp-usemin');
    
gulp.task('usemin', function() {
    return gulp.src('./public/src/index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            js: [uglify(), 'concat']
        }))
        .pipe(gulp.dest('./public/deploy'));
});

gulp.task('copy-html-templates', function() {
    gulp.src('./public/src/templates/**/*')
        .pipe(gulp.dest('./public/deploy/templates'));
});

gulp.task('copy-fonts', function() {
    gulp.src('./public/src/fonts/**/*')
        .pipe(gulp.dest('./public/deploy/fonts'));
});

gulp.task('test', function(done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('default', ['usemin', 'copy-html-templates', 'copy-fonts']);