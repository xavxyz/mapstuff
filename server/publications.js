Meteor.publish('Pins.all', function () {
	return Pins.find({});
});