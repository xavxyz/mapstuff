import pinType from '../lib/pinType'

Template.header.events({
  'click [rel=pin-type]' (event, instance) {
    pinType.set(event.target.innerText);
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
