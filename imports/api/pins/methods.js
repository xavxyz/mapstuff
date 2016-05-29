import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Pins, { pinSchema } from './collection';

export const insertNewPin = new ValidatedMethod({
	name: 'Pins.methods.insertNewPin',
	validate: pinSchema.validator(),
	run(pin) {
		Pins.insert(pin);
	}
});