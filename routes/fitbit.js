var express = require('express');
var router = express.Router();
var https = require('https');
var FitbitApiClient = require('fitbit-node');

var fitbitData = "";
var lastRequestTime;

var consumerKey = process.env.FITBIT_CONSUMER_KEY,
	consumerSecret = process.env.FITBIT_CONSUMER_SECRET,
	userKey = process.env.FITBIT_USER_KEY,
	userSecret = process.env.FITBIT_USER_SECRET;


var fitbitClient = new FitbitApiClient(consumerKey, consumerSecret)

/* GET weather data from forecast.io */
router.get('/', function(req, res, next) {

	var requestTime = Math.floor(new Date() / 1000);

	if (lastRequestTime == null || (requestTime - lastRequestTime) > 300) {
		fitbitData = fitbitClient.get('body/weight', userKey, userSecret)
		})

		res.send(fitbitData);

	} else {
		res.send(fitbitData);
	}

});

module.exports = router;
