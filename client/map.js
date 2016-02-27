// Basic
Meteor.startup(function(){
    Mapbox.load({
        plugins: ['minimap', 'markercluster']
    });
});

Deps.autorun(function () {
  if (Mapbox.loaded()) {
    L.mapbox.accessToken = Meteor.settings.public.accessToken;
    var map = L.mapbox.map('map', Meteor.settings.public.mapId);
  }
});


// Using a template's rendered callback
Meteor.startup(function(){
    Mapbox.load();
});

Template.Map.rendered = function () {
    this.autorun(function () {
        if (Mapbox.loaded()) {
            L.mapbox.accessToken = Meteor.settings.public.accessToken;
            var map = L.mapbox.map('map', Meteor.settings.public.mapId);
        }
    });
};