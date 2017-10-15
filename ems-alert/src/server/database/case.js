require('mongoose').model('Case');

var mongoose = require('mongoose');
var Case = mongoose.model('Case');

module.exports = {
    createCase: function (req, res) {
        console.log("Creating case...");
        var _case = req.body;

        new Case({ date: _case.date, location: _case.location, respondee_name: _case.respondee_name,responder_name: _case.responder_name, dispatcher_name: _case.dispatcher_name, notes: _case.notes })
            .save(function (err) {
                if (err) {
                    res.status(504);
                    res.end(err);
                } else {
                    res.end();
                }
            });
    },
    // updateCase: function (req, res, next) {
    //     Case.findOne({ name: req.params.name }, function (err, user) {
    //         if (err) {
    //             res.status(504).send(err);
    //             console.log(err);
    //         } else {
    //             user.name = req.body.name;
    //             user.email = req.body.email;
    //             user.comp = req.body.comp;

    //             user.save(function (err, user) {
    //                 if (err) {
    //                     res.status(500).send(err);
    //                 }
    //                 res.send(user);
    //             });
    //         }

    //     });
    // },
    getAllCases: function (req, res, next) {
        Case.find({}, function (err, docs) {
            if (err) {
                res.status(504);
                res.end(err);
            } else {
                res.end(JSON.stringify(docs));
            }
        });
    },
    // deleteUser: function (req, res, next) {
    //     User.findOne({ name: req.params.name }, function (err) {
    //         if (err) {
    //             res.status(504);
    //             res.end();
    //             console.log(err);
    //         }
    //     }).remove(function (err) {
    //         console.log(err);
    //         if (err) { res.end(err); }
    //         else { res.end(); }
    //     });
    // }
}