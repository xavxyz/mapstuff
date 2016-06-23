import Pins from './collections';

export const insertNewPin = new ValidatedMethod({
  name: 'pins.new',
  validate: Pins.schema.validator(),
  run(pin) {
    Pins.insert(pin);
  }
});