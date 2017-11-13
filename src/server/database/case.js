require('mongoose').model('Case');

var mongoose = require('mongoose');
var Case = mongoose.model('Case');

module.exports = {
    createCase: function (req, res) {
        console.log("Creating case...");
        var _case = req.body;

        new Case({ id: _case.id, date: _case.date, location: _case.location, respondee_name: _case.respondee_name,responder_name: _case.responder_name, dispatcher_name: _case.dispatcher_name, notes: _case.notes })
            .save(function (err) {
                if (err) {
                    res.status(504);
                    res.end(err);
                } else {
                    res.end();
                }
            });
    },
    getAllCases: function (req, res, next) {
        Case.find({}, function (err, docs) {
            if (err) {
                res.status(504);
                res.end(err);
            } else {
                res.end(JSON.stringify(docs));
            }
        });
    }
}
