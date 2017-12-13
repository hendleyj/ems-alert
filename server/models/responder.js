
var mongoose = require('mongoose');

var Responder = new mongoose.Schema({
    username: String,
    password: String,
    device_id: String,
    name: String,
    certification_number: Number,
    certification_date: String,
    latitude: String,
    longitude: String
});

mongoose.model('Responder', Responder);
mongoose.createConnection('mongodb:/\/127.0.0.1:27017/EMS-Alert');
