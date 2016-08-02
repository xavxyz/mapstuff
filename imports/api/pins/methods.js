import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Pins from './collection';

export const insertNewPin = new ValidatedMethod({
  name: 'pins.new',
  validate: Pins.schema.validator(),
  run(pin) {
    return Pins.insert(pin);
  },
});