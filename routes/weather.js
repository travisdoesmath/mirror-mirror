var express = require('express');
var	mongoose = require('mongoose');
var	router = express.Router();
var	https = require('https');
var models = require('../models');

var weatherData = "";
var lastRequestTime;

var apiKey = process.env.FORECAST_IO_API_KEY,
	latitude = 41.934438,
	longitude = -87.710199;
var	url = 'https://api.forecast.io/forecast/' + apiKey + '/' + latitude + ',' + longitude;

Data = models('Data');

/* GET weather data from forecast.io */
router.get('/', function(req, res, next) {


	Data.findOne({ 'source': 'forecast-io' }, 'data createDate', function (err, data) {
		if (err) return handleError(err);
		
		// If there is no weather data in the database, request and create
		if (data == null) {	
			console.log("no data found, creating data");

			getApiData(url, function(err, data) { 
				if (err) handleError(err);

				var weatherData = new Data({ source: 'forecast-io', data: data})
				weatherData.save();
				res.send(weatherData.data);
			})
		} else {
			if ((Date.now() - data.createDate) / 1000 > 600) {
				console.log("weather data older than 10 minutes, refreshing")
				data.remove({});
				getApiData(url, function(err, data) { 
					if (err) handleError(err);

					var weatherData = new Data({ source: 'forecast-io', data: data})
					weatherData.save();
					res.send(weatherData.data);
				})
			} else {
				console.log("found weather data, returning found data");
				res.send(data.data);
			}
		}

	});	

});

var getApiData = function(url, callback) {
	var err = null;
    var request = https.get(url, function(response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event
    var buffer = "",
      data,
      route;

    var nChunks = 0;

    response.on("data", function (chunk) {
      buffer += chunk;
      nChunks++;
    });

    response.on("end", function (err) {
      console.log("number of chunks: " + nChunks)
      callback(err, buffer);
    })
  })
}

module.exports = router;
