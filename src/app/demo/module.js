/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	angular
		.module('app.demoModule', [
			'app.demoModule.amount',
			'app.demoModule.menu',
			'app.demoModule.pulldown',
			'app.demoModule.wechat'
		]);
})(window.angular);