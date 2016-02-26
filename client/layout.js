Template.layout.onCreated(function() {
	this.autorun(() => {
		this.subscribe('Pins.all');
	});
});

Template.layout.helpers({
	pins () {
		return Pins.find({});
	}
});