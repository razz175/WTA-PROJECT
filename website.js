var mysql = require('mysql');
var http = require('http');
var express = require('express');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var app = express();

var path = __dirname + "/views/";

app.use('/', router);
app.use(express.static("img"));
app.use(express.static("views"));
router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});

router.get('/property1', function(req, res) {
    res.sendFile(path + 'property1.html');
});

router.get('/rent', function(req, res) {
    res.sendFile(path + 'rent.html');
});

router.get('/login', function(req, res) {
    res.sendFile(path + 'login.html');
});

router.get('/signup', function(req, res) {
    res.sendFile(path + 'signup.html');
});

app.use(' * ', function(req, res) {
    res.send('Error 404 ');
});

app.listen(3000, function() {
    console.log("Server running at port 3000");
});