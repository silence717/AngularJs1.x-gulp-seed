/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	angular
		.module('app')
		.config(config);

	config.$inject = ['$urlRouterProvider'];
	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
	}
})(window.angular);