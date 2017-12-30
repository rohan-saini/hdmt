
    var AWS = require('aws-sdk');
    var express = require('express');
    var bodyParser = require('body-parser');
    var https = require('https');
    var fs = require('fs');
    

    // Load Configurations
    var config = require('./config/config');
    console.log('Starting ' + config.app.name + '...');
    console.log('Config loaded: ' + config.NODE_ENV);
    AWS.config.region = process.env.REGION
    
    //setup express
    var express_cfg = require('./config/express');
    var app = express();
    express_cfg(app);
    
    var soap_cfg = require('./config/soap');
    soap_cfg(app);

	//host application on port
    var port = config.PORT || 3000;
    
    if (config.USE_HTTPS) {
       var options = {
         key: fs.readFileSync('config/cert/server.key'),
         cert: fs.readFileSync('config/cert/server.crt')
       };
       var listener = https.createServer(options, app).listen(port, function () {
        console.log('HTTP server running at http://127.0.0.1:' + port + '/');
       });
    } else {
       var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
       });
    }
