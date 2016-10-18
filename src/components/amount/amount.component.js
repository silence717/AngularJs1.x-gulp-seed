/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function() {
	var amount = {
		require: 'ngModel',
		bindings: {
			max: '=',
			model: '='
		},
		templateUrl: '../../src/components/amount/amount.tpl.html',
		controller: AmountController,
		controllerAs: 'vm'
	};

	angular
		.module('app.components.amount', [])
		.component('amount', amount);


	function AmountController() {
		var vm = this;
		// 数字减一
		vm.subClick = function() {
			if (vm.model === 0) return;
			vm.model -= 1;
		};
		// 数字加一
		vm.addClick = function() {
			if (vm.model === vm.max) return;
			vm.model += 1;
		};
	}
})();