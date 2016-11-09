/**
 * @author  https://github.com/silence717
 * @date on 2016/11/09
 * @desc [公共gulp任务]
 */
var gulp = require('gulp');
var inject = require('gulp-inject');
var order = require('gulp-order');
var browserSync = require('browser-sync');
var config = require('./gulp.conf.js');

module.exports = function () {
	
	var commonTask = {
		// 动态插入js和css文件
		inject: function() {
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
		}
	};
	return commonTask;
}();