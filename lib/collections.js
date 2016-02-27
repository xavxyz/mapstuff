import pinSchema from './schemas/pins';

Pins = new Mongo.Collection('pins');

Pins.attachSchema(pinSchema);

export default Pins;