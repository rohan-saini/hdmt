'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var config = require('../../config/config');
var AWS = require('aws-sdk');

exports.validateUser = function(req, res) {

	console.log('request username: ' + req.body.username);
    console.log('request password: ' + req.body.password);

    // check database and return validity
	var dynamodb = new AWS.DynamoDB({region: config.app.AWS_REGION});

	console.log("Querying for username and password");

	var params = {
	    TableName : config.app.userTableName,
		Key: {
			"username": {
				S: req.body.username
			}
		}
	};

	var valid = false;
	dynamodb.getItem(params, function(err, data) {
	    if (err) {
	        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
	    }
		else {
	        console.log("Query succeeded.");
			if(!data.Item) {
				console.log("username not found");
			}
			else {
				if(data.Item.password.S == req.body.password) {
					console.log("username and password valid");
					valid = true;
					res.jsonp({"message":"success", "data":{"valid":valid}});
				}
				else {
					console.log("password is invalid");
					res.jsonp({"message":"failure", "data":{"valid":valid}});
				}
			}
		}
	});
};
