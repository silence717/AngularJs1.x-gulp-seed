/**
 * @author [https://github.com/silence717]
 * @since  2016-08-17
 */
(function(angular) {
    angular
        .module('app.components.pullDown')
        .directive('pullDown', pullDown);

    pullDown.$inject = ['$document'];

    function pullDown($document) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                selectCallback: '&'
            },
            templateUrl: '../src/components/pulldown/pulldown.tpl.html',
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: function(scope, element, attrs, vm) {
                var documentClickHandler = function(event) {
                    // 判断是否为外部点击
                    var isOutsideEvent = (element[0] !== event.target) && (element.find(event.target).length === 0);
                    if (isOutsideEvent) {
                        scope.$apply(function() {
                            vm.onClose();
                        });
                    }
                };
                $document.off('click').on('click', documentClickHandler);
                scope.$on('$destroy', function() {
                    $document.off('click', documentClickHandler);
                });
            }
        };
    }
    // controller逻辑
    function Controller() {
        var vm = this;
        // 选中项
        vm.selectData = vm.data[0];
        // 是否显示下拉
        vm.isOpened = false;
        // 切换下拉
        vm.toggle = function(event) {
            vm.isOpened = !vm.isOpened;
            event.stopPropagation();
        };
        // 关闭浮层
        vm.onClose = function() {
            vm.isOpened = false;
        };
        // 点击选择
        vm.itemClick = function(item) {
            vm.selectData = item;
            vm.isOpened = !vm.isOpened;
            vm.selectCallback({currentData: vm.selectData});
        }
    }
    
})(window.angular);
