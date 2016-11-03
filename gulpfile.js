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
var proxyMiddleware = require('http-proxy-middleware');

// 配置代理路径，是否为本地mock
var target = '';
var isLocal = true;

if (isLocal) {
	target = 'http://localhost:4001';
} else {
	// todo 这里可以配置成你需要连接的API服务地址
}

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
	var middleware = proxyMiddleware(['/web/'], {target: target, changeOrigin: true});
	browserSync({
		server: {
			baseDir: './',
			index: 'src/index.html',
			middleware: middleware
		}
	});
});
gulp.task('default', ['inject', 'browserSync', 'watch']);