'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./config');

module.exports = function (app) {

    app.set('showStackError', true);

    //Prettify HTML
    app.locals.pretty = true;

    //Setting the fav icon and static folder
    app.use(express.static(config.root + '/static'));

    //Set views path, template engine and default layout
    app.set('views', config.root + '/static/views');
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended:false}));

    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

}
