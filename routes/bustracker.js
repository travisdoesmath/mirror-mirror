var express = require('express');
var	mongoose = require('mongoose');
var	router = express.Router();
var	http = require('http');
var models = require('../models');

var apiKey = process.env.BUSTRACKER_API_KEY
var	url = 'http://www.ctabustracker.com/bustime/api/v1/getpredictions?key=' + apiKey + '&stpid=7859,17413';

Data = models('data');

/* GET bustracker data from ctabustracker.com */
router.get('/', function(req, res, next) {


	Data.findOne({ 'source': 'bustracker' }, 'data createDate', function (err, data) {
		if (err) return handleError(err);
		
		// If there is no data in the database, request and create
		if (data == null) {	

			getApiData(url, function(err, data) { 
				if (err) handleError(err);

				var data = new Data({ source: 'bustracker', data: data})
				data.save();
				res.send(data.data);
			})
		} else {
			if ((Date.now() - data.createDate) / 1000 > 600) {
				data.remove({});
				getApiData(url, function(err, data) { 
					if (err) handleError(err);

					var data = new Data({ source: 'bustracker', data: data})
					data.save();
					res.send(data.data);
				})
			} else {
				res.send(data.data);
			}
		}

	});	

});


var getApiData = function(url, callback) {
	var err = null;
    var request = http.get(url, function(response) {
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