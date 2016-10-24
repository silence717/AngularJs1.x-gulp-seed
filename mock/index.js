/**
 * @author  https://github.com/silence717
 * @date on 2016/10/24
 */
var fs = require('fs');
var express = require ('express');
var router = express.Router();

fs.readdirSync('mock').forEach(function(route) {
	if (route.indexOf('index') === -1) {
		require('./' + route)(router);
	}
});

module.exports = router;