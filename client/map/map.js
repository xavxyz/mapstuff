import Pins from '../../lib/collections';
import MapUtils from '../modules/mapUtils.js';

let mapUtils;

function onMapClick(lng, lat) {
	console.log('onMapClick lat = ' + lat + ' lon = ' + lng);
	const pin = {
		lat,
		lng,
		title: 'test',
		content: 'hop',
		type: 'text'
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
      {type: "image", lng: -15.431719422340393, lat: 28.149034949189094, title:"Another pretty image", text: "This pretty image shows another pretty something", link: "http://lorempixel.com/120/80/"},
    ]);*/
	});

};

Template.map.onRendered(function () {
	this.autorun(() => {
    console.log('aurorun');
		if (Mapbox.loaded()) {
      console.log('Mapbox.loaded');
			mapUtils = new MapUtils(Meteor.settings.public.accessToken, Meteor.settings.public.mapId, onMapLoaded);
      mapUtils.addClick(onMapClick);
		}
	});
});
