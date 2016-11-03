/**
 * @author [https://github.com/silence717]
 * @since  2016-09-05
 */
(function() {
    angular
        .module('app.components.menu')
        .directive('menu', menu);

    function menu() {
        var directive = {
            restrict: 'E',
            scope: {
                data: '=',
                pid: '='
            },
            templateUrl: '../src/components/menu/menu.tpl.html',
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        };
        return directive;
    }


    function Controller($scope) {
        var vm = this;
        initData();

        function initData() {
            angular.forEach(vm.data, function(item) {
                if (item.isLeaf === '1') {
                    item.opened = true;
                }
            });
        }
        // 打开关闭菜单
        vm.toggleOpen = function(item) {
            item.opened = !item.opened;
        };
    }
})();