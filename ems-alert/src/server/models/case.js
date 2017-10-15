var mongoose = require('mongoose');

var Case = new mongoose.Schema({
    date: String,
    location: String,
    respondee_name: String,
    responder_name: String,
    dispatcher_name: String,
    notes: String
});

mongoose.model('Case', Case);
mongoose.connect('mongodb://127.0.0.1:27017/EMS-Alert');

console.log('Database connected');