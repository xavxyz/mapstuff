import Pins from '../../lib/collections';
import MapUtils from '../lib/mapUtils';
import pinType from '../lib/pinType';

let mapUtils;

const onMapClick = (lng, lat) => {
	if (Meteor.user()) {
		console.log('onMapClick lat = ' + lat + ' lon = ' + lng);
		const pin = {
			lng,
			lat,
			type: pinType.get(),
			title: 'test',
			userId: Meteor.userId()
		};
		Meteor.call('Pins.methods.insertNewPin', pin);
	}
};

const onMapLoaded = () => {
  console.log('onMapLoaded');
  Tracker.autorun(() => {
		const user = Meteor.user() ? Meteor.userId() : 'aa';
		mapUtils.addPinsForUser(user, Pins.find().fetch());
	});
};

Template.map.onRendered(function () {

	this.autorun(() => {
		if (Mapbox.loaded()) {
			mapUtils = new MapUtils(Meteor.settings.public.accessToken, Meteor.settings.public.mapId, onMapLoaded);
			console.log('can add pin');
			mapUtils.addClick(onMapClick);
		}
	});
});
