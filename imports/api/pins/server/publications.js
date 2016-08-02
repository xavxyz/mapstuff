import { Meteor } from 'meteor/meteor';
import Pins from '../collection.js';

Meteor.publish('pins.all', function worstPubEver() {
  return Pins.find();
});