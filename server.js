var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

var request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies



const encode = require('nodejs-base64-encode');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/* Captcha API */
app.post('/api/v1/captcha', function(req, res) {

    var capObj = {};
    capObj.secret = '6LeP6EAUAAAAAOyVjQq2MX9r6ONWvhriwuiAAkH7';
    capObj.response = req.body.responseKey;
    capObj.remoteip = '192.168.0.63';
    // Set the headers
    var headers = {
        //'User-Agent':       'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Configure the request
    var options = {
        url: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'POST',
        headers: headers,
        form: capObj
    }

    // Start the request
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.send(body);
        }
    })

});

/* Login  API */
app.post('/api/v1/login', function(req, res) {
    var uEmail = req.body.userEmail;
    var uPwd = encode.decode(req.body.userPwd, 'base64');

    var apiRes = {
        'res': 'failure'
    };

    console.log(uEmail,uPwd);

    fs.readFile("credentials.json", 'utf8', function(err, contents) {
        var userAuthDetails = JSON.parse(contents);
        for (i = 0; i < userAuthDetails.length; i++) {
            if ((userAuthDetails[i].email == uEmail) && (userAuthDetails[i].password == uPwd)) {
               apiRes = {
                    'res': 'success',
                    'token': userAuthDetails[i].token
                };
            }
        }
        res.send(apiRes);
    });
});


console.log('server started at 3001');
app.listen(3001);