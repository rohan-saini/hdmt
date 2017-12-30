'use strict';

module.exports = function(app) {
	// Home page route
	var index = require('../../app/controllers/index');
	app.get('/', index.render);
	
};