require('mongoose').model('Dispatcher_Login');
var mongoose = require('mongoose');
var Dispatcher_Login = mongoose.model('Dispatcher_Login');

let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}

module.exports = {
    register: function (req, res) {
        var newpass = 723 + req.body.password + 854;
        var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

        Dispatcher_Login.findOne({ 'username': req.body.username }, function (error, user) {
            if (error) {
                console.log(error);
            }
            else if (user != null) {
                var response = 'true';
		console.log('user exists');
                res.end(JSON.stringify(response));
            }
            else {
		console.log('saving user');
                new Dispatcher_Login({ username: req.body.username, password: hashed_password })
                    .save(function (err) {
                        if (err) {
                            res.status(504);
                            res.end(err);
                        } else {
                            res.end(JSON.stringify('false'));
                        }
                    });
            }
        });

    },
    login: function (req, res) {
        var testpass = 723 + req.body.password + 854;
        var hashed_password = crypto.createHash('sha512').update(testpass).digest("hex");

        Dispatcher_Login.findOne({ 'username': req.body.username }, function (error, user) {
            var response;

            if (error) {
                console.log(error);
            } else if (user != null) {
                if (user.password == hashed_password) {
                    response = 'success';
                    console.log('success');
                } else {
                    response = 'password wrong';
                    console.log('password wrong');
                }
            } else {
                response = 'username wrong';
                console.log('username wrong');
            }
            res.end(JSON.stringify(response));
        });
    }
}
