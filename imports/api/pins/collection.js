import { Mongo } from 'meteor/mongo';

const Pins = new Mongo.Collection('pins');

Pins.schema = new SimpleSchema({
  lng: {
    type: Number,
    decimal: true
  },
  lat: {
    type: Number,
    decimal: true
  },
  type: {
    type: String,
    defaultValue: 'text'
  },
  title: {
    type: String,
    optional: true
  },
  text: {
    type: String,
    optional: true
  },
  link: {
    type: String,
    optional: true
  },
  userId: {
    type: String
  }
});

Pins.attachSchema(Pins.schema);

export default Pins;