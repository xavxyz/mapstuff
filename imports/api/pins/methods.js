import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Pins from './collection';
import rp from 'request-promise';

export const insertNewPin = new ValidatedMethod({
  name: 'pins.new',
  validate: Pins.schema.validator(),
  run(pin) {
    return Pins.insert(pin);
  },
});

Meteor.methods({
  'fetch.instagram'() {
    const options = {
      uri: `https://api.instagram.com/v1/users/self/media/recent`,
      qs: {
        access_token: Meteor.settings.public.instagram.accessToken,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };
    
    return rp(options)
            .then(res => res.data)
            .then(data => data.filter(media => media.location !== null)) // null is given by ig
  }
})