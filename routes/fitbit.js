var express = require('express');
var router = express.Router();
var https = require('https');
var FitbitApiClient = require('fitbit-client-oauth2');

var clientId = process.env.FITBIT_CONSUMER_KEY;
var clientSecret = process.env.FITBIT_CONSUMER_SECRET;

/*

Needs to be updated for Oauth2 to get interesting data


*/

// var fitbitData = "";
// var lastRequestTime;

// var consumerKey = process.env.FITBIT_CONSUMER_KEY,
// 	consumerSecret = process.env.FITBIT_CONSUMER_SECRET,
// 	userKey = process.env.FITBIT_USER_KEY,
// 	userSecret = process.env.FITBIT_USER_SECRET,
// 	userId = process.env.FITBIT_USER_ID;


// var client = new FitbitApiClient(consumerKey, consumerSecret)

// /* GET weather data from forecast.io */
// router.get('/', function(req, res, next) {

// 	var requestTime = Math.floor(new Date() / 1000);

// 	if (lastRequestTime == null || (requestTime - lastRequestTime) > 300) {
// 		return client.get('/profile.json', userKey, userSecret).then(function (results) {
// 			fitbitData = results[0];
// 			res.send(fitbitData);
// 		});
// 	} else {
// 		res.send(fitbitData);
// 	}



// });

// module.exports = router;
