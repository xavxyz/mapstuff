import * as MapUtils from '../modules/mapUtils.js';

Template.map.onRendered(function () {
    this.autorun(() => {
        if (Mapbox.loaded()) {
            L.mapbox.accessToken = Meteor.settings.public.accessToken;
            var map = L.mapbox.map('map', Meteor.settings.public.mapId);
            MapUtils.pinMe(map);
            MapUtils.addClick(map);
        }
    });
});

Template.map.events({
    'click [rel=current-map]' (event, instance) {
    }
});
