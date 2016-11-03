import { HTTP } from 'meteor/http';

import '../imports/api/expenses.js';

Meteor.startup(function() {
	// Listen to incoming HTTP requests, can only be used on the server
	WebApp.connectHandlers.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return next();
	});
})

if (Meteor.isServer) {
	Meteor.methods({
		'getListing' (listingId, callback) {
			this.unblock();
			var clientId = '3092nxybyb0otqw18e8nh5nty';
			var format = 'v1_legacy_for_p3';

			// TODO need to sanitize the listingId
			var apiUrl = 'https://api.airbnb.com/v2/listings/' + listingId;

			try {
				// async call
				HTTP.get(apiUrl, {
					headers: {
        				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
					},
					params: {
						'client_id': clientId,
						'_format': format
					}
				},
				function(error, data) {
					console.log('http.get ::', error, data);
				});

				return true;
			} catch (e) {
				// Got a network error, time-out or HTTP error in the 400 or 500 range.
				return false;
			}
		}
	});
}
