import * as MapUtils from '../modules/mapUtils.js';

function onPinMe(lat, lon) {
  console.log('onPinMe lat = ' + lat + ' lon = ' + lon);
}

function onMapClick(lat, lon) {
  console.log('onMapClick lat = ' + lat + ' lon = ' + lon);
}

Template.map.onRendered(function () {

    this.autorun(() => {
        if (Mapbox.loaded()) {
            L.mapbox.accessToken = Meteor.settings.public.accessToken;
            var map = L.mapbox.map('map', Meteor.settings.public.mapId);
            MapUtils.pinMe(map, onPinMe);
            MapUtils.addClick(map, onMapClick);
        }
    });
});

Template.map.events({
    'click [rel=current-map]' (event, instance) {
    }
});
