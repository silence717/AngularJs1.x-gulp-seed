#### 源码地址：[https://github.com/silence717/angular-gulp-seed](https://github.com/silence717/angular-gulp-seed)
## 创建一个空文件夹名字任意，此项目为angular-gulp-seed
```bash
mkdir angular-gulp-seed
```
## 初始化工程
```bash
npm init
```
## 创建项目基本目录结构如下：
```
+src
	+app	        // 业务模块
		-app.js	// 应用入口
		+demo   // 业务模块目录，所有子模块均遵循此目录
		    - module.js      // 模块声明文件
		    - controller.js  // vm层
		    - index.html     // 主入口模板
		    - router.js      // 模块路由文件
		    - style.css      // 模块样式
		+home
	+assets	        // 静态资源目录
		-images
		-css
	+common	        // 公共服务
	+components	// 公共组件
	+scripts         // gulp脚本
	    - gulp.build.js   // build任务
	    - gulp.common.js  // dev,build公共任务
	    - gulp.config.js  // 基础配置
	    - gulp.dev.js     // dev任务
	index.html  // 主页面

package.json
```
##  正式开始coding

### gulp配置部分
    1. 安装gulp
```bash
npm install  gulp -D
```
    2. 新建gulpfile文件，安装browser-sync包，配置第一个任务
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

    3. 为了动态插入新加的js和css文件,且添加的文件有一定顺序，安装gulp系列包。  
```bash
npm install gulp-watch gulp-inject gulp-order -D
```
    4. 新建一个gulp.config.js文件,配置一些基本文件路径和顺序
```js
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
```
    5. 使用gulp-inject动态插入css和js  
* js任务编写
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
* 页面添加inject标识
```html
<!-- css -- >
<!-- inject:css -->
<!-- endinject -->

<!-- js -- >
<!-- inject:js -->
<!-- endinject -->
```
* 添加到default任务中
```js
gulp.task('default', ['inject', 'browserSync']);
```
* 执行gulp命令，可看到如图页面效果,同时index.html页面内容发生变化
```html
<!-- inject:css -->
<link rel="stylesheet" href="../src/assets/css/app.css">
<!-- endinject -->

<!-- inject:js -->
<script src="../src/app/app.js"></script>
<!-- endinject -->
```
    6. 开发过程中会不断添加新的css和js文件，为了优化开发体验，引入gulp-watch包添加watch任务，当js和css文件发生变化的时候，去执行inject任务
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
### 编写业务代码 
    1. 安装angular相关包
```bash
npm install  angular angular-ui-router --save
```

    2. 由于代码量过大，不贴出具体参见src/spp下面代码实现
* src/index.html
* src/app.js 项目主入口
* src/app.router.js 项目路由配置

### mock数据服务  
为了前端保持独立，使用express搭建一个mock服务，然后我们就能愉快的开始开发了。

    1. 首先安装依赖包：
```bash
npm install express body-parser json-server http-proxy-middleware -D
```
    2. 创建server.js，内容如下：
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

server.listen(4000, function() {
	console.log('God bless me no bug, http://localhost:4000');
});
```
    3. mock文件夹下创建index.js,内容如下：
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
    4. 引入angular-resource.js，使用$resource服务
```bash
npm install angular-resource --save
```
在common/resource/创建一个utils,具体文件为resourceUtils，为所有请求添加统一前缀
```js
(function() {
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
	    // 其中***为后端服务的统一前缀
		return resourceUtils('/***/'); 
	}

})();
```
关于$resource服务的使用，请参考这篇文章。[https://silence717.github.io/2016/09/28/creating-crud-app-minutes-angulars-resource/](https://silence717.github.io/2016/09/28/creating-crud-app-minutes-angulars-resource/)

    5. 在gulpfile.js中统一配置代理，并且修改browserSync任务：
```js
// 引入http-proxy-middleware
var proxyMiddleware = require('http-proxy-middleware');

// 配置代理路径,是否为本地mock
var isLocal = true;
var target = '';

if (isLocal) {
	target = 'http://localhost:4000';
} else {
    // API address
}
// browserSync任务添加代理
gulp.task('browserSync', function() {
	var middleware = proxyMiddleware(['/***/'], {target: target, changeOrigin: true});
	browserSync({
		server: {
			baseDir: './',
			index: 'src/index.html',
			middleware: middleware
		}
	});
});
```
    6. 你可能需要添加一些公共的interceptor去处理后端返回的数据或者请求出错的统一处理。具体参见[https://docs.angularjs.org/api/ng/service/$http](https://docs.angularjs.org/api/ng/service/$http).  

**至此已经可以在本地愉快的开发了。**

### 配置gulp编译任务
开发完成以后代码需要build上线，继续创建一些task。
    1. 安装相关依赖包
```bash
npm install gulp-angular-templatecache gulp-minify-css gulp-if gulp-useref gulp-uglify gulp-replace -D
```
    2. 配置build任务，具体在scripts/gulp.build.js文件中.
    
    3. 页面html遇到build的地方配置
```html
 ...
 <!-- build:css css/app.css -->
 <!-- endbuild -->
 
 <!-- build:js js/common.js -->
 <!-- endbuild -->
 ...
```
### 我将gulp的任务全部独立出去管理，这样使得gulpfile.js更加清晰
```js
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
// build index文件
gulp.task('build', ['build:components-templates', 'build:app-templates'], function() {
	buildTask.buildIndex();
});
// 本地开发
gulp.task('default', ['inject', 'browserSync', 'watch']);
// 线上环境打包
gulp.task('dist', ['clean'], function() {
	runSequence('inject', 'build');
});
```
### 在package.json中配置脚本
```
"scripts": {
    "start": "concurrently \"gulp\" \"node server.js\""
  }
```
* 执行npm start即可本地启动项目
* 上线合并代码的时候执行`gulp dist`命令即可

拖延症晚期，终于写完了。有时间会加入eslint校验,添加md5，添加sass等等。。。需要做的还有很多，看心情吧！