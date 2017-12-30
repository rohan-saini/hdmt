'use strict';

var validateJob = require('../../app/controllers/validateUser');

module.exports = function(app) {

	// splitter post route
	app.route('/validateUser')
        .post(validateJob.validateUser);

};
