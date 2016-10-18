/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	angular
		.module('app.demoModule')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var demo = {
			url: '/wechat',
			templateUrl: '../src/app/demo/index.html'
		};
		$stateProvider.state('demo', demo);
	}
})(window.angular);