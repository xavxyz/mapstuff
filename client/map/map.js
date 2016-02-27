import * as MapUtils from '../modules/mapUtils.js';

function onPinMe(lng, lat) {
  console.log('onPinMe lng: ' + lng + ', lat: ' + lat);
}

function onMapClick(lng, lat) {
  console.log('onMapClick lng: ' + lng + ', lat: ' + lat);
}

Template.map.onRendered(function () {

    this.autorun(() => {
        if (Mapbox.loaded()) {
            L.mapbox.accessToken = Meteor.settings.public.accessToken;
            var map = L.mapbox.map('map', Meteor.settings.public.mapId);
            MapUtils.pinMe(map, onPinMe);
            MapUtils.addClick(map, onMapClick);

            MapUtils.addPinsForUser('JuditsUserId', map, [
              {type: "text", lng: -15.42919546365738, lat: 28.149280905429094, title: "Text pin example", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada lobortis odio, vel efficitur metus aliquam nec. Etiam vehicula ipsum vel tempus fermentum."},
              {type: "image", lng: -15.428350567817688, lat: 28.150766090719273, title:"A pretty image", text: "This pretty image shows a pretty something", link: "http://lorempixel.com/120/80/"},
              {type: "image", lng: -15.431719422340393, lat: 28.149034949189094, title:"Another pretty image", text: "This pretty image shows another pretty something", link: "http://lorempixel.com/120/80/"},
            ]);
        }
    });
});

Template.map.events({
    'click [rel=current-map]' (event, instance) {
    }
});
