# angular + gulp + es5种子项目
step by step 生成一个angular + gulp的项目
## 创建一个空文件夹名字任意，此项目为angular-gulp-seed
## 初始化工程
```bash
npm init
```
## 目录结构
```
src
	app	// 业务模块
		-app.html	// 应用 html 模板
		-index.js	// 应用入口
	assets	// 第三方资源目录
		+images
		+css
	common	// 公共资源

	components	// 组件

package.json
```

3. 安装生产环境使用的依赖
```bash
cnpm install  angular angular-ui-router --save
```
4. 安装gulp
```bash
npm install  gulp -D
```
5. 新建gulpfile文件，配置第一个任务
```js
var browserSync = require('browser-sync');
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './',
            index: 'src/index.html'
        }
    });
});
gulp.task('default', ['browserSync']);
// 执行gulp命令，浏览器启动，可以看到大致页面结构
```
更多browser-sync的信息：[http://www.browsersync.cn/](http://www.browsersync.cn/)。
6. 添加任务，动态插入新加的js和css文件,为了添加的文件有一定顺序且便于管理，引入gulp-order。

1. 新建一个gulp.config.js文件,具体文件定义内容参见文件详情
2. 引入gulp-inject动态插入css和js
```js
var config = require('./gulp.conf.js');
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
```
页面添加inject标识
```html
<!-- css -- >
<!-- inject:css -->
<!-- endinject -->

<!-- js -- >
<!-- inject:js -->
<!-- endinject -->
```
3. 添加到default任务中
```js
gulp.task('default', ['inject', 'browserSync']);
```
4. 执行gulp命令，可看到如图页面效果,同时index.html页面内容发生变化
```html
<!-- inject:css -->
<link rel="stylesheet" href="../src/assets/css/app.css">
<!-- endinject -->

<!-- inject:js -->
<script src="../src/app/app.js"></script>
<!-- endinject -->
```
5. 开发过程中会不断添加新的css和js文件，为了优化开发体验，引入gulp-watch包添加watch任务，当js和css文件发生变化的时候，去执行inject任务
```js
var watch = require('gulp-watch');
gulp.task('watch', function() {
	watch('src/**/*.js', function() {
		gulp.run('inject');
	});
	watch('src/**/*.css', function() {
		gulp.run('inject');
	});
});
gulp.task('default', ['inject', 'browserSync', 'watch']);
```

6. 为了前端保持独立，使用express搭建一个mock服务,到这里的时候，我们就能愉快的开始开发了。

首先安装依赖包：
```bash
npm install express body-parser json-server http-proxy-middleware -D
```
创建server.js，内容如下：
```js
var jsonServer = require('json-server');
var server = jsonServer.create();
var middlewares = jsonServer.defaults();
var bodyParser = require('body-parser');
var mockRouter = require('./mock/index');

// 添加默认的中间件 logger, static, cors and no-cache
server.use(middlewares);

// 解析 body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));

server.use(mockRouter);

server.listen(400, function() {
	console.log('server is running, please visit http://localhost:9000');
});
```
mock文件夹下创建index.js,内容如下：
```js
var fs = require('fs');
var express = require ('express');
var router = express.Router();

fs.readdirSync('mock').forEach(function(route) {
    if (route.indexOf('index') === -1) {
        require('./' + route)(router);
    }
});

module.exports = router;
```
在gulpfile.js中统一配置拦截请求：
```js
var proxyMiddleware = require('http-proxy-middleware');

```
7. 引入angular-resource.js，使用$resource服务
```bash
npm install angular-resource --save
```
在common/resource/创建一个resourceUtils.js文件，为所有请求添加统一前缀
```js
(function(angular) {
	angular
		.module('app.resource')
		.factory('resourceUtils', resourceUtils)
		.factory('webResource', webResource);

	resourceUtils.$inject = ['$resource'];

	function resourceUtils($resource) {
		return function(apiPrefix) {
			return function(url, params, actions) {
				return $resource(apiPrefix + url, params, actions);
			};
		};
	}

	webResource.$inject = ['resourceUtils'];
	function webResource(resourceUtils) {
		return resourceUtils('/web/');
	}

})(window.angular);
```
关于$resource服务的使用，请参考这篇文章。[https://silence717.github.io/2016/09/28/creating-crud-app-minutes-angulars-resource/](https://silence717.github.io/2016/09/28/creating-crud-app-minutes-angulars-resource/)