var http = require('http');
var request = require('request');
var conf = require('../config');

var apiURL = 'https://www.audiosear.ch';

var Audiosearch = Audiosearch || {};

Audiosearch.authorize = function(key, secret, callbackOk, callbackError) {
	
	// Get token from provider
	var params = {'grant_type':'client_credentials'};
	var unencoded_sig = key + ':' + secret;
	var signature = new Buffer(unencoded_sig).toString('base64');
	var options = {
		url: apiURL + '/oauth/token',
		qs: params,
		headers: {
			'Authorization': 'Basic ' + signature,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	request.post(options, function (err, res, body) {
		if (res.statusCode !== 200) {
		callbackError(res);
	}

	var token = JSON.parse(body).access_token;
		callbackOk(token);
	});
}


var Discover = Discover || {};

Discover.searchPodcast = function (searchText, callbackOk, callbackError) {  

	// Get petition token
	Audiosearch.authorize(
		conf.audiosearchOauth.AUDIOSEARCH_APP_ID, 
		conf.audiosearchOauth.AUDIOSEARCH_SECRET, function (token) {

		// Then search podcasts
		var options = {
			url: apiURL + '/api/search/shows/' + encodeURI(searchText),
			headers: {
				'Authorization': 'Bearer ' + token,
				'User-Agent': 'request'
			}
		};

		request(options, function (err, res, body) {
			if (err || res.statusCode !== 200) {
				callbackError(err);
			}
			callbackOk(JSON.parse(body).results);
		});		

	}, callbackError);
};

module.exports =  Discover, Audiosearch;