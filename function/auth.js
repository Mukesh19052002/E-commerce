exports.register = function(req, res) {
    console.log(req.body);
    res.send("form submitted");
}

exports.login = function(req, res) {
    console.log(req.body);
    res.render('homepage');
}