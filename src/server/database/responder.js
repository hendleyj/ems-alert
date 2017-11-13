require('mongoose').model('Responder');

var mongoose = require('mongoose');
var Responder = mongoose.model('Responder');

module.exports = {
    createResponder: function (req, res) {
        console.log("Creating responder...");
        var responder = req.body;

        new Responder({ username: responder.username, name: responder.name, certification_number: responder.certification_number, location: responder.location })
            .save(function (err) {
                if (err) {
                    res.status(504);
                    res.end(err);
                } else {
                    res.end();
                }
            });
    },
    getAllResponders: function (req, res, next) {
        Responder.find({}, function (err, docs) {
            if (err) {
                res.status(504);
                res.end(err);
            } else {
                res.end(JSON.stringify(docs));
            }
        });
    }
}

