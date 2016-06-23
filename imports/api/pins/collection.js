import { Swell } from 'meteor/mongo';

const Swell = new Mongo.Collection('swell');

// example of a schema's definition
const schema = new SimpleSchema({
  temperature: {
    type: String
  },
  swell: {
    type: String
  },
  windDirection: {
    type: String
  },
  period: {
    type: String
  },
  hour: {
    type: Date
  },
});

export default Swell;