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
});
