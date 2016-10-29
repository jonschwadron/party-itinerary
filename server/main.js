import '../imports/api/expenses.js';

Meteor.startup(function() {
	// Listen to incoming HTTP requests, can only be used on the server
	WebApp.connectHandlers.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return next();
	});
})

Meteor.methods({
	'getListing' (listingId, callback) {
		this.unblock();
		var clientId = '3092nxybyb0otqw18e8nh5nty';
		var format = 'v1_legacy_for_p3';
		// TODO need to saniize the listingId
		var apiUrl = 'https://api.airbnb.com/v2/listings/' + listingId;

		try {
			// async call
			HTTP.get(apiUrl, {
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
