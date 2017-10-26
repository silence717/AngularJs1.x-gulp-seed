/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var config = require('./scripts/gulp.conf.js');
var buildTask = require('./scripts/gulp.build.js');
var devTask = require('./scripts/gulp.dev.js');
var commonTask = require('./scripts/gulp.common.js');

// 动态添加css和js到index.html
gulp.task('inject', function() {
	commonTask.inject();
});
// 添加监听任务
gulp.task('watch', function() {
	devTask.watch();
});
// 使用browerSync启动浏览器
gulp.task('browserSync', function() {
	devTask.browserSync();
});
// 清除dist文件
gulp.task('clean', function() {
	del(config.build);
});
// 打包组件模板
gulp.task('build:components-templates', function() {
	buildTask.componentsTemplate();
});
// 打包业务模板
gulp.task('build:app-templates', function () {
	buildTask.appTemplate();
});
// copy html files
gulp.task('copyHtml', function () {
	buildTask.copyCompoentsHtml();
	buildTask.copyAppHtml();
});
// build index文件
gulp.task('build', ['copyHtml', 'build:components-templates', 'build:app-templates'], function() {
	buildTask.buildIndex();
});
// 本地开发
gulp.task('default', ['inject', 'browserSync', 'watch']);
// 线上环境打包
gulp.task('dist', ['clean'], function() {
	runSequence('inject', 'build');
});