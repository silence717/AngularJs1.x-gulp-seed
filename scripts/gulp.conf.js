/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 * @description  [简单配置]
 */
module.exports = function () {

	var src = './src/';
	var build = './dist/';

	var config = {
		src: src,
		build: build,
		index: src + 'index.html',
		css: [src + '**/*.css'],
		appJs: [src + 'app/**/*.js'],
		commonJs: [src + 'common/**/*.js'],
		componentJs: [src + 'components/**/*.js'],
		jsOrder: [
			'**/app.js',    // 项目主入口
			'**/app.*.js',  // 主入口相应配置
			'**/module.js', // 模块声明
			'**/router.js', // 模块路由
			'**/index.js',  // 组件、resource入口
			'**/*.js'       // 其他
		],
		cssOrder: [
			'**/app.css',       // 项目主模块
			'**/*.module.css',  // 业务子模块
			'**/*.css'          // 其他
		]
	}
	return config;
}();