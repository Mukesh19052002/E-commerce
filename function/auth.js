const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

exports.register = function(req, res) {
    const { name, email, password, passwordConfirm } = req.body;
    if (password === passwordConfirm) {
        db.query("select * from user_details where email = ?", [email], function(req, resp) {
            if (resp.length > 0) {
                return res.send("Already exsists");
            } else {
                db.query("insert into user_details set ?", { name: name, email: email, password: password }, function(req, resp) {
                    return res.redirect('/homepage');
                });
            }
        });
    } else {
        return res.send("Password does not match");
    }
}

exports.login = function(req, res) {
    const { email, password } = req.body;
    db.query("select * from user_details where email = ? AND password = ?", [email, password], function(req, resp) {
        if (resp.length > 0) {
            return res.redirect('/homepage');
        } else {
            return res.send("No user Available");
        }
    });
}