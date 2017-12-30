'use strict';

var runSimulationJob = require('../../app/controllers/runSimulation');

module.exports = function(app) {

	// collection post route
	app.route('/runSimulation')
        .post(runSimulationJob.runSimulation);

};
