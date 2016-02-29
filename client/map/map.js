import Pins from '../../lib/collections';
import MapUtils from '../lib/mapUtils';
import pinType from '../lib/pinType';

let mapUtils;

const onMapClick = (lng, lat) => {
	if (Meteor.user()) {
		const pin = {
			lng,
			lat,
			type: pinType.get(),
			title: 'Pinned stuff',
			userId: Meteor.userId()
		};

		if ($('[rel=text]').val() === '') {
			throw new Meteor.Error(400, 'need to fill the fields bro');
		}

		if (pin.type === 'video' || pin.type === 'image') {
			if ($('[rel=link]').val() === '') {
				throw new Meteor.Error(400, 'need to fill the media bro');
			} else {
				pin.link = $('[rel=link]').val();
			}
		}

		pin.text = $('[rel=text]').val();

		$('[rel=text]').val('');
		$('[rel=link]').val('');

		Meteor.call('Pins.methods.insertNewPin', pin);
	}
};

const onMapLoaded = () => {
  console.log('onMapLoaded');
  Tracker.autorun(() => {
		const user = Meteor.user() ? Meteor.userId() : 'aa';
		mapUtils.addPinsForUser(user, Pins.find().fetch());
    // Ideally it'd be great if we could leave the below here - useful for testing! - Judit
    /*mapUtils.addPinsForUser('JuditsUserId', [
      {type: "text", lng: -15.42919546365738, lat: 28.149280905429094, title: "Text pin example", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lobortis odio, vel efficitur metus aliquam nec. Etiam vehicula ipsum vel tempus fermentum."},
      {type: "image", lng: -15.428350567817688, lat: 28.150766090719273, title:"A pretty image", text: "This pretty image shows a pretty something", link: "http://lorempixel.com/120/80/"},
      {type: "video", lng: -15.431719422340393, lat: 28.149034949189094, title:"A pretty video", text: "This pretty video shows a pretty something", link: "http://vimeo.com/106112939"},
    ]);*/
	});
};

const onPinClick = (pinId) => {
  console.log('onPinClick pinId = ' + pinId);
}

Template.map.onRendered(function () {

	this.autorun(() => {
		if (Mapbox.loaded()) {
			mapUtils = new MapUtils(Meteor.settings.public.accessToken, Meteor.settings.public.mapId, onMapLoaded, onPinClick);
			console.log('can add pin');
			mapUtils.addClick(onMapClick);
		}
	});
});
