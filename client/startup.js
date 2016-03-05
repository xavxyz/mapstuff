Meteor.startup(() => {
	Mapbox.load({
    plugins: [
      "turf",
			"directions",
			"zoomslider",
			"pip",
			"osm",
			"omnivore",
			"minimap",
			"markercluster",
			"locate",
			"label",
			"image",
			"heat",
			"hash",
			"geodesy",
			"fullscreen",
			"draw",
			"geojsonExtend",
			"geoViewport",
			"arc"
    ]
  });

	sAlert.config({
		effect: 'jelly',
		position: 'bottom',
		timeout: 2000,
		html: false,
		onRouteClose: true,
		stack: true,
		offset: 0,
		beep: false,
		onClose: _.noop
	});

});
