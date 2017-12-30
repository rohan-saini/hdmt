'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var config = require('../../config/config');

function cleanJSON (json){
    return JSON.stringify(json).replace(/<\//g, '<\\/');
}

exports.render = function(req, res) {

	//Home page render
    //console.log("theme is " + config.THEME);
	res.render('index', {
	            theme: config.THEME || 'flatly',
	            flask_debug: process.env.FLASK_DEBUG || 'false'
	        });
};
