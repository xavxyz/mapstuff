import Pins from '../../lib/collections';
import MapUtils from '../lib/mapUtils';
import pinType from '../lib/pinType';

let mapUtils;

function onMapClick(lng, lat) {
	console.log('onMapClick lat = ' + lat + ' lon = ' + lng);
	const pin = {
		lng,
		lat,
		type: pinType.get(),
		title: 'test'
	};
	Meteor.call('Pins.methods.insertNewPin', pin);
}

const onMapLoaded = () => {
  console.log('onMapLoaded');
  Tracker.autorun(() => {
		mapUtils.addPinsForUser('JuditsUserId', Pins.find().fetch());
    /*mapUtils.addPinsForUser('JuditsUserId', [
      {type: "text", lng: -15.42919546365738, lat: 28.149280905429094, title: "Text pin example", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lobortis odio, vel efficitur metus aliquam nec. Etiam vehicula ipsum vel tempus fermentum."},
      {type: "image", lng: -15.428350567817688, lat: 28.150766090719273, title:"A pretty image", text: "This pretty image shows a pretty something", link: "http://lorempixel.com/120/80/"},
      {type: "video", lng: -15.431719422340393, lat: 28.149034949189094, title:"A pretty video", text: "This pretty video shows a pretty something", link: "http://vimeo.com/106112939"},
    ]);*/
	});

};

Template.map.onRendered(function () {

	this.autorun(() => {
		if (Mapbox.loaded()) {
			mapUtils = new MapUtils(Meteor.settings.public.accessToken, Meteor.settings.public.mapId, onMapLoaded);
			mapUtils.addClick(onMapClick);
		}
	});
});
