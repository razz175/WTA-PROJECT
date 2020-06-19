const express = require("express");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const users = [];
var app = express();

var router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan('short'));

function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "project",
        // multipleStatements: true
    });
}
var mysqlConn = getConnection()


app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static("img"));
app.use(express.static("./views"));
// app.use('/', router);

app.set('views', path.join(__dirname, "/views"));
var path1 = __dirname + "/views/";

app.get('/', function(req, res) {
    res.sendFile(path1 + 'index.html');
});

app.get('/property1', function(req, res) {
    res.sendFile(path1 + 'property1.html');
});

app.get('/rent', function(req, res) {
    res.sendFile(path1 + 'rent.html');
});

app.get('/villa', function(req, res) {
    res.sendFile(path1 + 'villa.html');
});

app.get('/login', function(req, res) {
    res.sendFile(path1 + 'login.html');
});

app.post('/not-get', function(req, res) {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send("Cant find");

    }
});


app.get('/signup', function(req, res) {
    res.sendFile(path1 + 'signup.html');
});
app.post('/auth', function(req, res) {
    const name = req.body.name;
    const emailAddress = req.body.emailAddress;
    const phone = req.body.phone;
    const username = req.body.username;
    const password = req.body.password;


    const queryString = "INSERT INTO cust_reg (name, emailAddress, phone, username, password) VALUES(?, ?, ?, ?, ?)";
    getConnection().query(queryString, [name, emailAddress, phone, username, password], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert" + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new user");
        users.push(name, emailAddress, phone, username, password);
    });
    res.redirect("/");
});

app.use(' * ', function(req, res) {
    res.send('Error 404 ');
});




app.listen(4000, function() {
    console.log("connected to server");
})
