'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var config = require('../../config/config');
var uuidv4 = require('uuid/v4');
var fs = require("file-system");
var AWS = require('aws-sdk');

exports.runSimulation = function(req, res) {

	//collection web method
	console.log('running simulation and uploading to AWS S3');

	var s3ObjectParam = {
		region: config.app.AWS_REGION,
		signatureVersion: "v4",
		//credentials : awsCredParm
	};

	var fileName = "input/" + uuidv4() + ".txt";

	var params = {
		Bucket: config.app.inputBucketName,
		Key: fileName,
		Body: req.body.textToSave
	}

	var s3Object = new AWS.S3(s3ObjectParam);
	s3Object.putObject(params, function(err){
		if(err) {
			res.jsonp({"message":"failure", "data":"error in writing file" + err});
		}
		else {
			res.jsonp({"message":"success", "data":fileName});
		}
	});
};
