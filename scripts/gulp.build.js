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
	var componentsTemplatesPaths = [config.src + '/components/**/*.html'];
	var appTemplatesPaths = [config.src + '/app/**/*.html'];
	var buildTask = {
		// copy components html
		copyCompoentsHtml: function () {
			return gulp
				.src(componentsTemplatesPaths)
				.pipe(gulp.dest(config.build + '/components/'));
		},
		// copy app html
		copyAppHtml: function () {
			return gulp
				.src(appTemplatesPaths)
				.pipe(gulp.dest(config.build + '/app/'));
		},
		// 打包公共模板
		componentsTemplate: function() {
			return gulp
				.src(componentsTemplatesPaths)
				.pipe(templateCache({
					module: 'components',
					root: '../dist/components',
					filename: 'components.templates.js'
				}))
				.pipe(gulp.dest(config.build + '/js'));
		},
		// 打包业务组件模板
		appTemplate: function() {
			return gulp
				.src(appTemplatesPaths)
				.pipe(templateCache({
					module: 'app',
					root: '../dist/app',
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
				.pipe(replace('../src/', '../dist/'))
				.pipe(gulpIf('*.css', minifyCss()))
				.pipe(gulp.dest(config.build));	
		}
	};
	return buildTask;

}();
