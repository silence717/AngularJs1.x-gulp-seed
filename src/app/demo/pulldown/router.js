/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	angular
		.module('app.demoModule.pulldown')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var pulldown = {
			url: '/pulldown',
			templateUrl: '../src/app/demo/pulldown/index.html',
			controller: 'PullDownController',
			controllerAs: 'vm'
		};
		$stateProvider.state('pulldown', pulldown);
	}
})(window.angular);