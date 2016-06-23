import Pins from '../collection.js';

// worst publication ever
Meteor.publish('pins.all', function() {
  return Pins.find();
});