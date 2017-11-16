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
        // Dispatcher_Login.findOne({ 'username': username }, function (error, user) {
        //     if (error) {
        //         console.log(error);
        //     }
        //     else if (user != null) {
        //         callback(user);
        //     }
        //     else {
        //         var user = new Dispatcher_Login;

        //         user.password = hashed_password;
        //         user.username = username;

        //         user.save(function (error, data) {
        //             if (error) {
        //                 console.log(error)
        //             }
        //             else {
        //                 callback(user);
        //             }
        //         });
        //     }
        // });
        new Dispatcher_Login({ username: req.body.username, password: hashed_password })
            .save(function (err) {
                if (err) {
                    res.status(504);
                    res.end(err);
                } else {
                    res.end();
                }
        });
 login: function (req, res) {
        var testpass = 723 + req.body.password + 854;
        var hashed_password = crypto.createHas('sha512').update(testpass).digest("hex");

        Dispatcher_Login.findOne({ 'username': username }, function (error, user) {
             if (error) {
                 console.log(error);
             }
             else if (user != null) {
                 callback(user);
             }
        //     else {
        //         var user = new Dispatcher_Login;

        //         user.password = hashed_password;
        //         user.username = username;

        //         user.save(function (error, data) {
        //             if (error) {
        //                 console.log(error)
        //             }
        //             else {
        //                 callback(user);
        //             }
        //         });
        //     }
        // });

    }
}