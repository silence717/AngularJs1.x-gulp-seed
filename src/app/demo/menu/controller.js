/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function() {

	angular
		.module('app.demoModule.menu')
		.controller('MenuController', MenuController);

	MenuController.$inject = ['menuResource'];
	function MenuController(menuResource) {
		var vm = this;		
		menuResource.queryMenu().get().$promise.then(function (res) {
			vm.menus = res.data.menus;
		});
	}
})();