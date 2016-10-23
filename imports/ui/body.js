import { Template } from 'meteor/templating';

import { Expenses } from '../api/expenses.js';

import './expense.js';
import './body.html';

//show generator by default
Session.set('generatorState',true);
Session.set('listingInfoState',true);

Template.body.helpers({
	//meteor add session
	showListing:  function() {
		return Session.get('listingInfoState');
	},
	showGenerator:  function() {
		return Session.get('generatorState');
	},
	expenses() {
		return Expenses.find({}, { sort: { createdAt: 0 } });
	},
	total() {
		let sum = 0;
		let cursor = Expenses.find();

		cursor.forEach(function(item){
			sum += parseInt(item.price);
		});

		return (Math.ceil((sum + 2000) / 15));
	},
});

Template.body.events({
	'focus #from': function () {
		$( "#from" ).datepicker();
	},
	'focus #to': function () {
		$( "#to" ).datepicker();
	},
	'click #listing-toggle': function () {
		if (Session.get('listingInfoState')) {
			Session.set('listingInfoState', false);
		} else {
			Session.set('listingInfoState', true);
		}

	},
	'click #itinerary-toggle': function () {
		if (Session.get('generatorState')) {
			Session.set('generatorState', false);
		} else {
			Session.set('generatorState', true);
		}

	},
	'submit .new-listing'(event) {
		event.preventDefault();
		const target = event.target;
		const listing = target.listing.value;
		console.log("search input: " + listing);

		var a = document.createElement('a');
		a.href = listing;
		var pathSplitted = a['pathname'].split('/');
		var listingId = pathSplitted[2];
		console.log("listing_id: " + listingId);

		target.listing.value = '';
	},
	'submit .new-expense'(event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;
		const text = target.text.value;
		const price = target.price.value;

		//insert an expense into the Collection
		Expenses.insert({
			text,
			price,
			createdAt: new Date(), //current time
		});

		//clear form
		target.text.value = '';
		target.price.value = '';
	},
});
