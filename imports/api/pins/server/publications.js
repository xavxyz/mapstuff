import { Meteor } from 'meteor/meteor';

import Pins from '../collection';

// overpublish, shall be fixed
Meteor.publish('Pins.all', function () {
	return Pins.find({});
});