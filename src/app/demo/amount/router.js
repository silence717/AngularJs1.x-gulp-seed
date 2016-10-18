/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	angular
		.module('app.demoModule.amount')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var amount = {
			url: '/amount',
			views: {
				'' : {
					templateUrl: '../src/app/demo/amount/index.html',
					controller: 'AmountController',
					controllerAs: 'vm'
				}
			}
		};
		$stateProvider.state('demo.amount', amount);
	}
})(window.angular);