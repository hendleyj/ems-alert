var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Responder_Login = new Schema ({
	username: String,
	password: String
});


mongoose.model('Responder_Login', Responder_Login);
mongoose.createConnection('mongodb://127.0.0.1:27017/EMS-Alert');


