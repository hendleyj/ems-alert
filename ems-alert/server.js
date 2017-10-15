/////////////////////////////////////////////////////////
// Dependencies
/////////////////////////////////////////////////////////
var express  = require('express');      
var bodyParser = require('body-parser');
var app = express();          

/////////////////////////////////////////////////////////
// Configuration
/////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));

var router = express.Router();

/////////////////////////////////////////////////////////
// Routing for the case model
/////////////////////////////////////////////////////////
var case_model = require('./src/server/models/case');
var _case = require('./src/server/database/case');

// Get cases
app.get('/get/cases', _case.getAllCases);

// Create a case
app.post('/create/case', _case.createCase);

/////////////////////////////////////////////////////////
// Other routing
/////////////////////////////////////////////////////////
app.use('/*', express.static('dist/index.html'));

app.listen(4200, '0.0.0.0', function () {
    console.log('Listening to port: ' + 4200);
});