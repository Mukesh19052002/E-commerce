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

db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("SQL connected");
    }
});

app.use(express.urlencoded({ extended: true }));

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

app.post('/register-form',function(req,res){
    const{name,email,password,passwordConfirm} = req.body;
    db.query("select * from user_details where email=?",[email],(req,res)=>{
        if(res.length>0){
            console.log("Already");
        }else{
            db.query('insert into user_details set ?',{name:name,email:email,password:password},(req,res)=>{
                console.log("Inserted");
            });
        }
    });
});

//port connection
app.listen(8080,()=>{
    console.log("Server Started on port 8080")
});