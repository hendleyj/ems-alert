var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dispatcher_Login = new Schema ({
	username: String,
	password: String
});


mongoose.model('Dispatcher_Login', Dispatcher_Login);
mongoose.createConnection('mongodb://127.0.0.1:27017/EMS-Alert');


