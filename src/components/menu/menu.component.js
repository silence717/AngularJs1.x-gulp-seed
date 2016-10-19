/**
 * @author [https://github.com/silence717]
 * @since  2016-09-05
 */
(function() {
    angular
    .module('app.components.menu', ['ui.router'])
    .directive('menu', menu);

    function menu() {
        var directive = {
            restrict: 'E',
            scope: {
                data: '=',
                pid: '='
            },
            templateUrl: '../src/components/menu/menu.tpl.html',
            controller: MenuController,
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        };
        return directive;
    }

    function MenuController() {
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