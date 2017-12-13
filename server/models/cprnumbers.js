var mongoose = require('mongoose');

var cprnumbers = new mongoose.Schema({
    certification_number: Number,
    certification_date: String,
});

mongoose.model('cprnumbers', cprnumbers);
mongoose.createConnection('mongodb:/\/127.0.0.1:27017/EMS-Alert');
