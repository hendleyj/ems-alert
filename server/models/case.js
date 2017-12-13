var mongoose = require('mongoose');

var Case = new mongoose.Schema({
    id: Number,
    date: String,
    location: String,
    patient_name: String,
    respondee_name: [],
    dispatcher_name: String,
    notes: String,
    respondee_notes: [],
});

module.exports = mongoose.model('Case', Case);
mongoose.createConnection('mongodb:/\/127.0.0.1:27017/EMS-Alert');

