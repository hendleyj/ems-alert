/////////////////////////////////////////////////////////
// Dependencies
/////////////////////////////////////////////////////////
var express  = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

/////////////////////////////////////////////////////////
// Configuration
/////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(cors());

var router = express.Router();

/////////////////////////////////////////////////////////
// Routing for the case model
/////////////////////////////////////////////////////////
var case_model = require('./src/server/models/case');
var _case = require('./src/server/database/case');

// Get cases
app.get('/get/cases', _case.getAllCases);

// Get a particular case
//app.get('/get/one-case', _case.getOneCase);

// Create a case
app.post('/create/case', _case.createCase);

/////////////////////////////////////////////////////////
// Routing for the responder model
/////////////////////////////////////////////////////////
var responder_model = require('./src/server/models/responder');
var responder = require('./src/server/database/responder');

// Create Responder
app.post('/create/reponser', responder.createResponder);
// Get responder
app.get('/get/responder', responder.getAllResponders);

/////////////////////////////////////////////////////////
// Routing for Dispatcher Login
/////////////////////////////////////////////////////////
var dispatcher_account = require('./src/server/models/dispatcher_login');
var dispatcher_login = require('./src/server/database/dispatcher_login');

// Register
app.post('/dispatcher/register', dispatcher_login.register);
// Login
app.post('/dispatcher/login', dispatcher_login.login);

/////////////////////////////////////////////////////////
// Routing for Responder Login
/////////////////////////////////////////////////////////
var responder_account = require('./src/server/models/responder_login');
var responder_login = require('./src/server/database/responder_login');

// Register
app.post('/responder/register', responder_login.register);
// Login
app.post('/responder/login', responder_login.login);

/////////////////////////////////////////////////////////
// Map Functions
/////////////////////////////////////////////////////////
var map_api = require('./src/server/database/maps-api');

// Geocode One
app.get('/map-api/geocode-one', map_api.geocodeOne);
// Geocode many
app.get('/map-api/geocode-many', map_api.geocodeMany);
//Compute distance
app.get('/map-api/distance', map_api.computeDistanceBetween);

/////////////////////////////////////////////////////////
// Other routing
/////////////////////////////////////////////////////////
app.use('/*', express.static('dist/index.html'));

app.listen(4200, '0.0.0.0', function () {
    console.log('Listening to port: ' + 4200);
});

