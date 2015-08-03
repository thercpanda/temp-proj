var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    prefix      = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('_scss/main.scss')
		.pipe(sass({
			onError: browserSync.notify()
		}))
		.pipe(prefix(['last 2 versions'], { cascade: true }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('index.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', ['sass', 'html'], function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});
});

gulp.task('watch', function() {
	gulp.watch('_scss/**/.scss', ['sass']);
	gulp.watch('index.html', ['html']);
});

gulp.task('default', ['browser-sync', 'watch']);