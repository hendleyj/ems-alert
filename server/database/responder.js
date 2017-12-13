require('mongoose').model('Responder');

var mongoose = require('mongoose');
var Responder = mongoose.model('Responder', Responder);
var firebase = require('firebase');
var admin = require('firebase-admin');

let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}

var config = {
  apiKey: 'AAAACQZlbnM:APA91bEZfZDzL_pUV4KQ3sQ-Jyf-_j7Ys6Righ85k8aTXUk9MbuvUdb8Rk2b2QcoDFoOXEbi9AC02_zARD-IfBys7sb7feumetEJ3scPTF6EOSReK15iuQ3StsO0W74PXKC7OHRCldBL',
  authDomain: 'emsandroid-1510772577626.firebaseapp.com',
  databaseURL: 'https:/\/emsandroid-1510772577626.firebaseio.com',
  storageBucket: 'gs:/\/emsandroid-1510772577626.appspot.com'
};
firebase.initializeApp(config);

admin.initializeApp({
   credential: admin.credential.cert({
     projectId: 'emsandroid-1510772577626',
     clientEmail: 'firebase-adminsdk-xp09b@emsandroid-1510772577626.iam.gserviceaccount.com',
     privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxIpgn0zQCGYog\nZ+aKgYDE13nubfcWgP76t/bK4tct400mLS3tmsaqgXDYqx4ol9ER5YqkcN6vLtiM\nu5Li468u6X2uNvNIYEaTGtbKtx6nC6dHvzVoyanqlL/mqCeSEpy3KD7tykjO+AUj\nBqBj3mZjWFNnXpGrceUbgGuWyXLkIs+T8OJ0EICdIM4vCWfo0os51BJyL4gfv6m0\ne8c2AZejblyP1+xNe13RULhxbjG9fhkYtrAv55pZricrwRMZmHTSOkIWdVqIeJDN\nZsT4X2b6SoRuzONlQl6JjvWX3dQND6dLW28hPC02AK1C3b7/YrgyG+jPjkK4HQnY\nwgbBs5rpAgMBAAECggEADoSq2uzFIPzt5M0PSL/niXqtvDyYGWiWPX9xg1yHTXQJ\nYT0nvAdJDDWSxbd0v9f9o01giSzVG5+n0RUYq28E7z/k9K/9TavSbQEwpKnQodlj\nKw7Bdma8/gSWG/YhVCghXyO10LCZOhl69k13POhAFRlqsJjAMMCjihcC+ndlasxK\nrUcIViA6eh1KSACZ9uZclY3UjBocgbPeJzfDAPQClk6tdX0zeVQVT9mYXKJSCnnz\nU/pPw4YbH+zZwv3yzco2WqIR6MVCTqgcjdusE6TqH7ssBg8UQXqxb6OVRXCXJqZa\neuIyBtKaCAY8VmuD01XOjx1S8UeT+3+QIGlg/9XeLwKBgQDegS4MVYE/m5hCSa5D\nQSi1TImuFYn8ZnMZKbGq9lY8M4BwuaD+zHHn2ddy+ZOI4h/X7rFGv79nWdmzYWdM\nMWTalwwLj4fUC17wUZl70SNj75TkLL/ZOk4hiff/6HPNgBbsR8DipMURbdtmBCW5\nzBur4x0YmszhS8USeiQ0E79xqwKBgQDLzPp5CK5YszF0aPKtJmuwbGCSi/DLSS/5\n414g4p1X8Wf2jVYfTmWH/CYSlNJ0NBXxAVZrqX83pQRXM9uJxekCZawN7eMPfQI3\nX42d0/+df11NRdW9h4izLT78TwfR7HrbaS4tNxFW/faywZLPkTsXOelvgEs4uAYb\nKaSwqiW5uwKBgEEpgcvY6q4vKisXmvJVTc+yp4uVAUEq28Bdxotz8xNUXeQlaPHV\n+/HTiVZBoyRuXLcHT2GR3EMvPCNdfjwBJzEhFUT5duTxo48rxpBNUlj9HBSqylCa\n07Dc0AVhFTD0t0HhTarSaGhPTPaWdlnwXZY8QBQpmaDNaNydaqbZtbJbAoGAI7F0\ntLn2fwZzROYUiorOFYoFp+TmeVQKGQPfOnc2A27+PEooqTb7xUM+D8cMzNlKdnk7\nf4OiCkbWacdlTc3hr0/LQG1HdTD5sGUF0nyMqjLiTmRKuPUB1g+4lkvpHLUEF2Vm\ndvjMCqZUDJ6mbcALz1ePML4Rbo+cUimK9H34OX0CgYEAqky+xKu2iiojyXGceJMn\nwDUIb22pLJO6dlO3Ixjk+kIs21fj48qgEvWyqyrH+qrjRHi6w4xdpGaXa/uyXVra\nT0ThnK8j75mbPYUo+8ksw4WjOJCPSy82VHWyC2zfT3MigjY21bPiljmXTjmJcFxY\nrvWf9Bsgd3W0SS3uDAdKlXU=\n-----END PRIVATE KEY-----\n'
   }),
   databaseURL: 'https:/\/emsandroid-1510772577626.firebaseio.com',
});

module.exports = {
    createResponder: function (req, res) {
        var responder = req.body;


	Responder.findOne({ username: responder.username }, function (error, user) {
            if (error) {
                res.end(JSON.stringify({'response': error}));
            } else if (user != null) {
                console.log('Responder already exists.');
                res.end(JSON.stringify({'response': 'true'}));
            } else {
                var testpass = 723 + responder.password + 854;
                var hashed_password = crypto.createHash('sha512').update(testpass).digest("hex");
                new Responder({ username: responder.username, password: hashed_password, device_id : '', name: responder.name, certification_number: responder.cprnum, certification_date: responder.cprdate, latitude: '', longitude: '' })
                    .save(function (err) {
                        if (err) {
                            res.status(504);
                            res.end(JSON.stringify({'response': err}));
                        } else {
                           console.log('Responder created');
                           res.end(JSON.stringify({'response': 'false'}));
                        }
                    });
              }
         });
    },
    login: function (req, res) {
        var testpass = 723 + req.body.password + 854;
        var hashed_password = crypto.createHash('sha512').update(testpass).digest("hex");
        var dateObject;

        Responder.findOne({ username: req.body.username }, function (error, user) {
            if(error) {
                console.log('Couldnt find the responder');
                res.end(JSON.stringify({'error': error}));
            } else if (user != null) {
                var dateNoDashes = user.certification_date.split('-');
                var month = dateNoDashes[0];
                var day = dateNoDashes[1];
                var year = dateNoDashes[2];
                dateObject = new Date(year, month-1, day);
            }
        });

        Responder.findOne({ username: req.body.username }, function (error, user) {
            var response;

            if (error) {
                console.log(error);
            } else if (user != null) {
                if (user.password == hashed_password) {
                    if (new Date() <  dateObject) {
                        response = 'true';
                        console.log(user.username + ' successfully logged in.');
                    } else {
                        response = 'cprdate';
                        console.log(user.username + 's CPR registration is Expired');
                    }
                } else {
                    response = 'false';
                    console.log(user.username + ' password entered incorrectly.');
                }
            } else {
                response = 'false';
                console.log('Responder username entered incorrectly.');
            }
            res.end(JSON.stringify({"response": response}));
        });
    },
    getAllResponders: function (req, res, next) {
        Responder.find({}, function (err, docs) {
            if (err) {
                res.status(504);
                res.end(JSON.stringify({'error':err}))
            } else {
                res.end(JSON.stringify(docs));
            }
        });
    },
    sendNotification: function (req, res) {
	var payload = {
	   data: {
              'eventtitle': 'Emergency Alert!',
	      'latitude': req.body.latitude,
	      'longitude': req.body.longitude,
              'patient': req.body.patient,
              'eventdetails': req.body.notes,
              'caseid': req.body.caseid
	   }
	};

        admin.messaging().sendToDevice(req.body.responders, payload)
        .then(function(response) {
	    console.log('Successfully sent message:', response);
        })
	.catch(function(error) {
	   console.log('Error sending message:', error);
	});
    },
    updateToken: function(req, res) {
        var responder = req.body.username;
        var token = req.body.token;

        Responder.findOne({'username': responder}, function (error, user) {
              if (error) {
                  res.end(JSON.stringify({'error': error}));
              } else {
                  user.device_id = token;
	          user.save( function (err) {
	              if (err) {
		          console.log('Could not update token.');
                      } else {
                          console.log(responder + ' token updated');
		          res.end(JSON.stringify({'response': 'updated'}));
	              }
                  });
              }
         });
    },
    updateLocation: function(req, res) {
        var responder = req.body.username;
        var lat = req.body.lat;
        var lng = req.body.lng;
	Responder.findOne({'username': responder}, function (error, user) {
            if (error) {
                res.end(JSON.stringify({'error': error}));
            } else {
                user.latitude = lat;
                user.longitude = lng;
	        user.save( function(err) {
	            if (err) {
		        console.log('Could not update location.');
	            } else {
                        console.log(responder + ' location updated');
                        res.end(JSON.stringify({'response': 'updated'}));
	            }
	        });
             }
        });
    }
}


