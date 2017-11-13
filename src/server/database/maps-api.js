var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAaZ63M-YwZTiTlxRqSL9wOacDnaoL6B9k'
});

module.exports = {
    geocodeOne: function (req, res) {
	   console.log('geocoding...');
	console.log('address: ' + req.params.address);
     googleMapsClient.geocode({ address: req.params.address }, function (err, response) {
            if (err) {
		console.log('error');
                res.end();
            } else {
                console.log(response.json.results);
                res.end(JSON.stringify(response));
            }
        });
    },
    geocodeMany: function (req, res) {
        var addresses = req.params.addresses;

        addresses.forEach(element => {
            googleMapsClient.geocode({ address: element }, function (err, response) {
                if (err) {
                    res.end();
                } else {
                    console.log(response.json.results);
                    res.end(JSON.stringify(response));
                }
            });
        });
    },
    computeDistanceBetween: function (req, res) {
        var origins = [req.params.origin];
        var destinations = [req.params.destination];
        googleMapsClient.distanceMatrix({ origins: origins, destinations: destinations }, function(err, response) {
            if (err) {
                res.end();
            } else {
                console.log(response);
                res.end(JSON.stringify(response));
            }
        });
    }
}
