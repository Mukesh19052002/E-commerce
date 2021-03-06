const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/homepage', function(req, res) {
    res.render('homepage');
});

module.exports = router;