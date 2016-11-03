/**
 * @author  https://github.com/silence717
 * @date on 2016/10/24
 */
(function(angular) {
	angular
		.module('app.resource')
		.factory('menuResource', menuResource);
	menuResource.$inject = ['webResource'];
	function menuResource(webResource) {
		var resource = {
			queryMenu: queryMenuResource
		};
		return resource;
		
		function queryMenuResource() {
			return webResource('queryMenus');
		}
	}
})(window.angular);