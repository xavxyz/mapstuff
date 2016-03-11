import pinType from '../lib/pin-type'

Template.header.helpers({
  pinType (type) {
    return pinType.get() === type;
  },
  pinTypesList () {
    return ['text', 'image', 'video']; // XXX manage in a collection the different types of pins
  }
});
