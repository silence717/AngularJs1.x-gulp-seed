/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var templateCache = require('gulp-angular-templatecache');
var order = require('gulp-order');
var inject = require('gulp-inject');
var replace = require('gulp-replace');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var watch = require('gulp-watch');
var config = require('./gulp.conf');
var proxyMiddleware = require('http-proxy-middleware');
var runSequence = require('run-sequence');

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
	// 业务js
	var appJs = gulp.src(config.appJs, {read: false}).pipe(order(config.jsOrder));
	// resource js
	var commonJs = gulp.src(config.commonJs, {read: false}).pipe(order(config.jsOrder));
	// 组件js
	var componentJs = gulp.src(config.componentJs, {read: false}).pipe(order(config.jsOrder));
	// css
	var css = gulp.src(config.css, {read: false}).pipe(order(config.cssOrder));

	return gulp
		.src(config.index)
		.pipe(inject(commonJs, {addPrefix: '../src', relative: true, name: 'common'}))
		.pipe(inject(componentJs, {addPrefix: '../src', relative: true, name: 'components'}))
		.pipe(inject(appJs, {addPrefix: '../src', relative: true}))
		.pipe(inject(css, {addPrefix: '../src', relative: true}))
		.pipe(gulp.dest(config.src))
		.pipe(browserSync.reload({stream: true}))
		.on('error', function(error) {
			console.log(error);
		});
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
			index: 'dist/index.html',
			middleware: middleware
		}
	});
});
// 清除dist文件
gulp.task('clean', function() {
	del(config.build);
});
// 打包公共模板文件
gulp.task('build:components-templates', function() {
	var templatesPaths = [config.src + '/common/components/**/*.html'];
	return gulp
		.src(templatesPaths)
		.pipe(templateCache({
			module: 'components',
			root: 'components',
			filename: 'components.templates.js'
		}))
		.pipe(gulp.dest(config.build + '/js'));
});
// 打包业务模板文件
gulp.task('build:app-templates', function() {
	var templatesPaths = [config.src + '/app/**/*.html'];
	return gulp
		.src(templatesPaths)
		.pipe(templateCache({
			module: 'app',
			root: '/src/app',
			filename: 'app.templates.js'
		}))
		.pipe(gulp.dest(config.build + '/js'));
});

// build index文件
gulp.task('build', ['build:components-templates', 'build:app-templates'], function() {
	var replacements = [
		'<!-- components.templates.js -->',
		'<script src="../dist/js/components.templates.js"></script>'
	];

	var replaceApp = [
		'<!-- app.templates.js -->',
		'<script src="../dist/js/app.templates.js"></script>'
	];
	return gulp
		.src(config.src + '/index.html')
		.pipe(replace(replacements))
		.pipe(replace(replaceApp))
		.pipe(usemin({
			html: [minifyHtml({empty: true, quotes: true})],
			css: [minifyCss(), rev()],
			js: [uglify({
				mangle: false,
				compress: false,
				output: {
					bracketize: true
				}
			}).on('error', function(e) {
				console.log(e);
			}), rev()]
		}))
		.pipe(gulp.dest(config.build));
});
// 本地开发
gulp.task('default', ['inject', 'browserSync', 'watch']);

// 线上环境打包
gulp.task('dist', ['clean'], function() {
	runSequence('inject', 'build');
});