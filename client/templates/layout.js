import * as Markers from '../modules/markers';

Template.layout.onCreated(function() {
	this.autorun(() => {
		this.subscribe('Pins.all');
	});
	console.log(Markers.specialMarker());
	console.log(Markers.marker());
});

Template.layout.helpers({
	pins () {
		return Pins.find({});
	}
});
