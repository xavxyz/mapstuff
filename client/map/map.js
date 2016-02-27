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
				pin.text = $('[rel=text]').val();
			}
		}

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
