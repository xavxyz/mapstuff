Template.map.onRendered(function () {
    this.autorun(() => {
        if (Mapbox.loaded()) {
            L.mapbox.accessToken = Meteor.settings.public.accessToken;
            const map = L.mapbox.map('map', Meteor.settings.public.mapId);
        }
    });
});

Template.map.events({
    'click [rel=current-map]' (event, instance) {

    }
});