/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	angular
		.module('app.demoModule.menu')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var menu = {
			url: '/menu',
			templateUrl: '../src/app/demo/menu/index.html',
			controller: 'MenuController',
			controllerAs: 'vm'
		};
		$stateProvider.state('menu', menu);
	}
})(window.angular);