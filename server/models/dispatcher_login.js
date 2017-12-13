var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var Dispatcher_Login = new Schema ({
	username: String,
	password: String
});

//Dispatcher_Login.plugin(passportLocalMongoose);
//module.exports = mongoose.model('Dispatcher_Login', Dispatcher_Login);

mongoose.model('Dispatcher_Login', Dispatcher_Login);
mongoose.createConnection('mongodb:/\/127.0.0.1:27017/EMS-Alert');
