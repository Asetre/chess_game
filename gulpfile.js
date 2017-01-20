const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default', function() {
    return gulp.src(['public/js/board.js', 'public/js/pieces.js', 'public/js/app.js'])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('public'));
});
