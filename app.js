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
app.use(express.urlencoded({ extended: false }));

// view engine set
app.set('view engine', 'ejs');


//directory for css
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


//calling function

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


//port connection
app.listen(8080, () => {
    console.log("Server Started on port 8080");
});