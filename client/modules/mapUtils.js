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
	  addPin(map, e);
	});

	if (navigator.geolocation) {
		map.locate();
	}
}
