var express = require('express');
var config = require('./config');
var soap = require('soap');
var hello =  require('./soap/hello-soap');

module.exports = function(app) {
    console.log('Initializing Soap endpoints');

    var helloWsdl = require('fs').readFileSync('config/soap/hello.wsdl', 'utf8');

    var soapserver = soap.listen(app, '/soap/hello', hello.helloService, helloWsdl);
    soapserver.log = function(type, data){
        console.log(type + " " + data);
    }

}
