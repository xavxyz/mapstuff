import pinSchema from '../schemas/pins';
import Pins from '../collections';

Pins.methods = {};

Pins.methods.insertNewPin = new ValidatedMethod({
	name: 'Pins.methods.insertNewPin',
	validate: pinSchema.validator(),
	run(pin) {
		Pins.insert(pin);
	}
});