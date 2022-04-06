const express = require("express");
const app = express();
const mysql = require('mysql');
const path = require('path');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'user_list'
});

db.connect((erroe)=>{
    if(error){
        console.log(error);
    }else{
        console.log("SQL connected");
    }
})

// view engine set
app.set('view engine', 'ejs');


//directory for css
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));


//calling functions
app.get('/',function(req,res){
    res.render('index');
});

app.get('/login',function(req,res){
    res.render('login');
});

app.get('/register',function(req,res){
    res.render('register');
});


//port connection
app.listen(8080,()=>{
    console.log("Server Started on port 8080")
});