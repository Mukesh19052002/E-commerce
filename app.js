const express = require("express");
const app = express();
const mysql = require('mysql');
const path = require('path');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("SQL connected");
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine set
app.set('view engine', 'ejs');


//directory for css
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


//calling functions
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.get('/homepage', function(req, res) {
    res.render('homepage');
});

app.post('/register-form', function(req, res) {
    const { name, email, password, passwordConfirm } = req.body;
    console.log(req.body);
    if (password === passwordConfirm) {
        db.query("select * from user_details where email = ?", [email], function(req, res) {
            if (res.length > 0) {
                res.send("Email Already Exsists");
            } else {
                db.query("insert into user_details set ?", { name: name, email: email, password: password }, function(req, res) {
                    res.redirect('/homepage');
                });
            }
        });
    } else {
        res.send("Incorrect Password");
    }
});

app.post('/login-form', function(req, res) {
    const { email, password } = req.body;
    db.query("select * from user_details where email=?", [email], function(req, res) {
        if (res.length > 1) {
            console.log("success");
            res.redirect('/homepage');
        }
    });
});


//port connection
app.listen(8080, () => {
    console.log("Server Started on port 8080");
});