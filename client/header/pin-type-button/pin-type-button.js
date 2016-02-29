import pinType from '../../lib/pinType'

Template.pinTypeButton.helpers({
  pinType () {
    return Template.instance().data;
  }
});

Template.pinTypeButton.events({
  'click [rel=pin-type-button]' (event, instance) {
    event.preventDefault();
    pinType.set(instance.data);
  }
});