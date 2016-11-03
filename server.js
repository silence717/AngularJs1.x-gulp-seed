/**
 * @author  https://github.com/silence717
 * @date on 2016/10/17
 */
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

server.listen(4001, function() {
	console.log('God bless me, please visit http://localhost:4001');
});