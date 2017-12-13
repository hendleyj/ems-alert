require('mongoose').model('Case');

var mongoose = require('mongoose');
var Case = mongoose.model('Case');

module.exports = {
    createCase: function (req, res, next) {
        var _case = req.body;

        new Case({ id: _case.id, date: _case.date, location: _case.location, patient_name: _case.patient_name,
                    respondee_name: [], dispatcher_name: _case.dispatcher_name,
                    notes: _case.notes, respondee_notes: [] })
            .save(function (err) {
                if (err) {
                    res.status(504);
                    res.end(err);
                } else {
                    console.log('Case Created');
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
    },
    updateCaseNotes: function (req, res) {
        Case.findOne({id: req.body.id}, function (error, theCase) {
            if (error) {
                console.log('Error finding case');
                res.end(JSON.stringify({'error': error}));
            } else {
                theCase.respondee_notes.push(req.body.notes);
                theCase.respondee_name.push(req.body.respondee);
                theCase.save( function (err) {
                    if (err) {
                       res.end(JSON.stringify({'response': 'true'}));
                    } else {
                      res.end(JSON.stringify({'response': 'false'}));
                    }
                });
            }
         });
     }
}
