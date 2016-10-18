/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function(angular) {

	var layout = {
		templateUrl: '../src/components/layout/layout.tpl.html'
	};

	angular
		.module('app.components.layout')
		.component('layout', layout);

})(window.angular);