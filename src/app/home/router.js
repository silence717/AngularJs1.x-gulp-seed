/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	angular
		.module('app.homeModule')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var home = {
			url: '/home',
			templateUrl: '../src/app/home/index.html'
		};
		$stateProvider.state('home', home);
	}
})(window.angular);