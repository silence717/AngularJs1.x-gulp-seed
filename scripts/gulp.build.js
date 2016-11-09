/**
 * @author  https://github.com/silence717
 * @date on 2016/11/3
 * @desc [gulp dist 任务集合]
 */
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var minifyCss = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
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
					root: '../src/components',
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
					root: '../src/app',
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

			return gulp.src(config.index)
				.pipe(useref())
				.pipe(replace(replacements))
				.pipe(replace(replaceApp))
				.pipe(gulpIf('*.js', uglify()))
				.pipe(gulpIf('*.css', minifyCss()))
				.pipe(gulp.dest(config.build));	
		}
	};
	return buildTask;

}();
