export const addPin = (map, e) => {

	var myLayer = L.mapbox.featureLayer().addTo(map);

	myLayer.setGeoJSON({
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [e.latlng.lng, e.latlng.lat]
		},
		properties: {
			'title': 'Here I am!',
			'marker-color': '#ff8888',
			'marker-symbol': 'star'
		}
	});
}

export const addFancyPin = (map, e) => {

	var featureLayer = L.mapbox.featureLayer().addTo(map);

	featureLayer.setGeoJSON({
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [e.latlng.lng, e.latlng.lat]
		},
		properties: {
			'title': 'Here I am!',
			'marker-color': '#ff8888',
			'marker-symbol': 'star',
      'from': 'Where I am now',
      'to': 'Not yet sure',
      'image': 'http://lorempixel.com/100/100/'
		}
	});

  featureLayer.eachLayer(function(layer) {

      // here you call `bindPopup` with a string of HTML you create - the feature
      // properties declared above are available under `layer.feature.properties`
      var content = '<h2>A ferry ride!<\/h2>' +
          '<img src="' + layer.feature.properties.image + '" \/>' + 
          '<p>From: ' + layer.feature.properties.from + '<br \/>' +
          'to: ' + layer.feature.properties.to + '<\/p>';
      layer.bindPopup(content);
  });
}

export const addClick = (map) => {

	map.on('click', (e) => {

    console.log('e = ', e);
    // map.fitBounds(e.bounds);
    addPin(map, e);
	});
}

export const pinMe = (map) => {

	map.on('locationfound', (e) => {

		map.fitBounds(e.bounds);
	  addFancyPin(map, e);
	});

	if (navigator.geolocation) {
		map.locate();
	}
}
