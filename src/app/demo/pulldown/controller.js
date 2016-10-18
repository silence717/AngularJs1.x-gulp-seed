/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function() {

	angular
		.module('app.demoModule.pulldown')
		.controller('PullDownController', PullDownController);

	function PullDownController() {
		var vm = this;

		vm.data = [
			{key: 'price', sort: 'asc', title: '价格', value: '从低到高'},
			{key: 'price', sort: 'desc', title: '价格', value: '从高到低'},
			{key: 'saleAmount', sort: 'asc', title: '销量', value: '从低到高'},
			{key: 'saleAmount', sort: 'desc', title: '销量', value: '从高到低'}
		];
		vm.clk = function(currentData) {
			console.log(currentData);
			console.log('reload data from backend...');
		}
	}
})();