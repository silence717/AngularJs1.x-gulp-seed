/**
 * @author  https://github.com/silence717
 * @date on 2016/10/24
 */
(function(angular) {
	angular
		.module('app.resource')
		.factory('resourceUtils', resourceUtils)
		.factory('webResource', webResource);

	resourceUtils.$inject = ['$resource'];

	function resourceUtils($resource) {
		return function(apiPrefix) {
			return function(url, params, actions) {
				return $resource(apiPrefix + url, params, actions);
			};
		};
	}

	webResource.$inject = ['resourceUtils'];
	function webResource(resourceUtils) {
		return resourceUtils('/web/');
	}

})(window.angular);