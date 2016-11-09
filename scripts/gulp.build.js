/**
 * @author  https://github.com/silence717
 * @date on 2016/11/3
 */
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var config = require('./gulp.conf');

module.exports = function () {
	var buildTask = {
		// 打包公共模板
		componentsTemplate: function() {
			var templatesPaths = [config.src + '/components/**/*.html'];
			return gulp
				.src(templatesPaths)
				.pipe(templateCache({
					module: 'components',
					root: 'components',
					filename: 'components.templates.js'
				}))
				.pipe(gulp.dest(config.build + '/js'));
		},
		// 打包业务组件模板
		appTemplate: function() {
			var templatesPaths = [config.src + '/app/**/*.html'];
			return gulp
				.src(templatesPaths)
				.pipe(templateCache({
					module: 'app',
					root: '/src/app',
					filename: 'app.templates.js'
				}))
				.pipe(gulp.dest(config.build + '/js'));
		},
		// 压缩合并代码，替换
		buildIndex: function() {
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
		}
	};
	return buildTask;

}();
