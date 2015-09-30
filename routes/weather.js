var express = require('express');
var router = express.Router();
var https = require('https');

var weatherData = "";
var lastWeatherRequestTime;

/* GET users listing. */
router.get('/', function(req, res, next) {
	var apiKey = process.env.FORECAST_IO_API_KEY,
		latitude = 41.934438,
		longitude = -87.710199;
	var	url = 'https://api.forecast.io/forecast/' + apiKey + '/' + latitude + ',' + longitude;

	var requestTime = Math.floor(new Date() / 1000);

	if (lastWeatherRequestTime == null || (requestTime - lastWeatherRequestTime) > 300) {
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
				// weatherData = JSON.parse(buffer);
				weatherData = buffer;
				lastWeatherRequestTime = JSON.parse(buffer).currently.time;
			})
		})

		res.send(weatherData);

	} else {
		res.send(weatherData);
	}

});

module.exports = router;
