/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var order = require('gulp-order');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var config = require('./gulp.conf');

// 动态添加css和js到index.html
gulp.task('inject', function() {

	var js = gulp.src(config.js, {read: false}).pipe(order(config.jsOrder));
	var css = gulp.src(config.css, {read: false}).pipe(order(config.cssOrder));

	return gulp
		.src(config.index)
		.pipe(inject(js, {addPrefix: '../src', relative: true}))
		.pipe(inject(css, {addPrefix: '../src', relative: true}))
		.pipe(gulp.dest(config.src))
		.pipe(browserSync.reload({stream: true}));
});
// 添加监听任务
gulp.task('watch', function() {
	watch('src/**/*.js', function() {
		gulp.run('inject');
	});
	watch('src/**/*.css', function() {
		gulp.run('inject');
	});
});

// 使用browerSync启动浏览器
gulp.task('browserSync', function() {
	// add proxy for gui
	var middleware = proxyMiddleware(['/web/', '/guide-manger-api/1.0/'], {target: target, changeOrigin: true});
	browserSync({
		server: {
			baseDir: './',
			middleware: middleware,
			index: 'src/index.html'
		}
	});
});
gulp.task('default', ['inject', 'browserSync', 'watch']);