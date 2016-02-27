import pinType from '../lib/pinType'

Template.header.events({
  'click [rel=pin-image]' (event, instance) {
    pinType.set('image');
  },
  'click [rel=pin-video]' (event, instance) {
    pinType.set('video');
  },
  'click [rel=pin-text]' (event, instance) {
    pinType.set('text');
  }
});

Template.header.helpers({
  selected () {
    return pinType.get();
  },
  pinType (type) {
    return pinType.get() === type;
  }
});
