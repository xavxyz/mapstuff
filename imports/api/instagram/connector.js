import rp from 'request-promise';
import { Meteor } from 'meteor/meteor';

const Instagram = {
  getRecent() {
    const options = {
      uri: `https://api.instagram.com/v1/users/self/media/recent`,
      qs: {
        access_token: Meteor.settings.instagram.accessToken,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };
    
    return rp(options).then((res) => {
      return res && res.data;
      // should map over it to get location
    });
  },
};

export default Instagram;