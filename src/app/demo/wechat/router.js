/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	angular
		.module('app.demoModule.wechat')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var wechat = {
			url: '/wechat',
			templateUrl: '../src/app/demo/wechat/index.html',
			controller: 'WechatController',
			controllerAs: 'vm'
		};
		$stateProvider.state('demo.wechat', wechat);
	}
})(window.angular);