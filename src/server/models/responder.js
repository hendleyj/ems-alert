var mongoose = require('mongoose');

var Responder = new mongoose.Schema({
    username: String,
    name: String,
    certification_number: Number,
    location: String
});

mongoose.model('Responder', Responder);
mongoose.createConnection('mongodb://127.0.0.1:27017/EMS-Alert');
