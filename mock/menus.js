/**
 * @author  https://github.com/silence717
 * @date on 2016/10/24
 */
var menus = [
	{
		'id': '1',
		'name': '一级目录',
		'isLeaf': '1',
		'childMenus': [
			{
				'id': '11',
				'name': '二级目录1',
				'isLeaf': '0',
				'url': 'report.basic'
			},
			{
				'id': '12',
				'name': '二级目录2',
				'isLeaf': '0',
				'url': 'report.workload'
			}
		]
	},
	{
		'id': '2',
		'name': '只有一层目录',
		'isLeaf': '0',
		'childMenus': []
	}
];
module.exports = function (app) {
	app.get('/web/queryMenus', function(req, res) {
		res.json({
			'success': true,
			'state': '返回数据状态',
			'msg': '错误描述',
			'data': {
				menus: menus
			}
		});
	});
};