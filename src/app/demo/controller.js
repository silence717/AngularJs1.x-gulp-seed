/**
 * @author  https://github.com/silence717
 * @date on 2016/10/24
 */
(function(angular) {

	angular
		.module('app.demoModule')
		.controller('DemoController', DemoController);

	DemoController.$inject = ['$state'];
	function DemoController($state) {
		$state.go('demo.wechat');
	}
})(window.angular);