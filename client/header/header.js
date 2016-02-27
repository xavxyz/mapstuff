import pinType from '../lib/pinType'

// omg, quick & dirty
Template.header.events({
  'click [rel=pin-image]' (event, instance) {
    event.preventDefault();
    pinType.set('image');
  },
  'click [rel=pin-video]' (event, instance) {
    event.preventDefault();
    pinType.set('video');
  },
  'click [rel=pin-text]' (event, instance) {
    event.preventDefault();
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
