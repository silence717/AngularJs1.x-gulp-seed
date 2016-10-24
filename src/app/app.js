/**
 * @author  https://github.com/silence717
 * @date on 2016/10/17
 */
(function (angular) {
	angular
		.module('app', [
			'ui.router',
			'ngResource',
			'app.resource',
			'app.components',
			'app.demoModule',
			'app.homeModule'
		])
})(window.angular);