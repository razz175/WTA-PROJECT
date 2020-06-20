const express = require("express");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const PORT = 4000;
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

app.get('/addproperty', function(req, res) {
    res.sendFile(path1 + 'addproperty.html');
});

app.get('/buyproperty', function(req, res) {
    res.sendFile(path1 + 'search2.html');
});

app.post('/login', function(req, res) {

    getConnection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        this.obj = req.body;
        console.log(this.obj.name);
        console.log("data sent successfully");

        var t1 = "select exists(select * from cust_reg where cust_reg.emailAddress=? and cust_reg.password=?) as EXIST";

        getConnection.query(t1, [req.body.emailAddress, req.body.password], function(err, result) {
            if (err) {
                res.status(404).send("error in mysql");
                console.log(err);
                console.log("Cant done");
            } else {
                res.status(200).send(result[0]);
                console.log(result[0].EXIST);
                console.log('success', req.body.name);
            }

        });

    });
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

app.post('/add_prop', function(req, res) {
    const pID = req.body.pID;
    const pOwnerId = req.body.pOwnerId;
    const type = req.body.type;
    const price = req.body.price;
    const location = req.body.location;


    const queryString = "INSERT INTO property (pID, pOwnerId, type, price, location) VALUES(?, ?, ?, ?, ?)";
    getConnection().query(queryString, [pID, pOwnerId, type, price, location], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert" + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new user");
        users.push(pID, pOwnerId, type, price, location);
    });
    res.redirect("/");
});

app.post('/search_box', function(req, res) {
    const location = req.body.location;
    const price = req.body.price;

    const queryString = "SELECT * FROM property WHERE location = ?";

    getConnection().query(queryString, [location], (err, results, fields) => {
        if (err) {
            throw err;
            return
        }
        console.log(results);
    });
    res.redirect("/buyproperty");

});

app.use(' * ', function(req, res) {
    res.send('Error 404 ');
});




app.listen(PORT, function() {
    console.log("server running on localhost:" + PORT);
});
