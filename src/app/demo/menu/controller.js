/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function() {

	angular
		.module('app.demoModule.menu')
		.controller('MenuController', MenuController);

	function MenuController() {
		var vm = this;
		vm.menus = [
			{
				'id': '11',
				'name': 'ONLY',
				'isLeaf': '1',
				'brand': 'only',
				'childMenus': [
					{
						'id': '3',
						'name': '基础报表',
						'isLeaf': '0',
						'brand': 'only',
						'url': 'report.basic'
					},
					{
						'id': '4',
						'name': '工作量分析',
						'isLeaf': '0',
						'brand': 'only',
						'url': 'report.workload'
					},
					{
						'id': '3',
						'name': '分时接待分析',
						'isLeaf': '0',
						'brand': 'only',
						'url': 'report.timeAnalysis'
					},
					{
						'id': '4',
						'name': '接待压力分析',
						'isLeaf': '0',
						'brand': 'only',
						'url': 'report.reception'
					}
				]
			},
			{
				'id': '12',
				'name': 'JACK&JONES',
				'brand': 'jj',
				'isLeaf': '1',
				'childMenus': [
					{
						'id': '3',
						'name': '基础报表',
						'isLeaf': '0',
						'brand': 'jj',
						'url': 'report.basic'
					},
					{
						'id': '4',
						'name': '工作量分析',
						'isLeaf': '0',
						'brand': 'jj',
						'url': 'report.workload'
					},
					{
						'id': '3',
						'name': '分时接待分析',
						'isLeaf': '0',
						'brand': 'jj',
						'url': 'report.timeAnalysis'
					},
					{
						'id': '4',
						'name': '接待压力分析',
						'isLeaf': '0',
						'brand': 'jj',
						'url': 'report.reception'
					}
				]
			},
			{
				'id': '13',
				'name': 'VERO MODA',
				'brand': 'vm',
				'isLeaf': '1',
				'childMenus': [
					{
						'id': '3',
						'name': '基础报表',
						'isLeaf': '0',
						'brand': 'jj',
						'url': 'report.basic'
					},
					{
						'id': '4',
						'name': '工作量分析',
						'isLeaf': '0',
						'brand': 'jj',
						'url': 'report.workload'
					},
					{
						'id': '3',
						'name': '分时接待分析',
						'isLeaf': '0',
						'brand': 'jj',
						'url': 'report.timeAnalysis'
					},
					{
						'id': '4',
						'name': '接待压力分析',
						'isLeaf': '0',
						'brand': 'jj',
						'url': 'report.reception'
					}
				]
			},
			{
				'id': '14',
				'name': 'SELECTED',
				'brand': 'slt',
				'isLeaf': '1',
				'childMenus': [
					{
						'id': '3',
						'name': '基础报表',
						'isLeaf': '0',
						'brand': 'slt',
						'url': 'report.basic'
					},
					{
						'id': '4',
						'name': '工作量分析',
						'isLeaf': '0',
						'brand': 'slt',
						'url': 'report.workload'
					},
					{
						'id': '3',
						'name': '分时接待分析',
						'isLeaf': '0',
						'brand': 'slt',
						'url': 'report.timeAnalysis'
					},
					{
						'id': '4',
						'name': '接待压力分析',
						'isLeaf': '0',
						'brand': 'slt',
						'url': 'report.reception'
					}
				]
			},
			{
				'id': '15',
				'name': 'J.LINDEBERG',
				'brand': 'jl',
				'isLeaf': '1',
				'childMenus': [
					{
						'id': '3',
						'name': '基础报表',
						'isLeaf': '0',
						'brand': 'slt',
						'url': 'report.basic'
					},
					{
						'id': '4',
						'name': '工作量分析',
						'isLeaf': '0',
						'brand': 'slt',
						'url': 'report.workload'
					},
					{
						'id': '3',
						'name': '分时接待分析',
						'isLeaf': '0',
						'brand': 'slt',
						'url': 'report.timeAnalysis'
					},
					{
						'id': '4',
						'name': '接待压力分析',
						'isLeaf': '0',
						'brand': 'slt',
						'url': 'report.reception'
					}
				]
			}
		];
	}
})();