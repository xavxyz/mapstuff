/*export default class MapUtils {

  constructor(map) {
    this.map = map;
  }

}*/
// add a pin
//@pin: {type: text/image/video, lng:1, lon:1, title:"", text:"", link:""}
export const addPin = (map, pin) => {

  switch(pin.type) {
    case 'text':
      // TODO should text whether all required properties exist
      addTextPin(map, pin.lng, pin.lat, pin.title, pin.text);
      break;
    case 'image':
      // TODO should text whether all required properties exist
      addImagePin(map, pin.lng, pin.lat, pin.title, pin.link, pin.text);
      break;
    case 'video':
      // TODO should text whether all required properties exist
      addVideoPin(map, pin.lng, pin.lat, pin.title, pin.link, pin.text);
      break;
    default:
      addSimplePin(map, pin.lng, pin.lat);
  }
}

export const addPinsForUser = (userId, map, pins) =>{

  pins.forEach((pin) => addPin(map, pin));
}

export const addClick = (map, callback) => {

	map.on('click', (e) => {

    console.log('e = ', e);
    // map.fitBounds(e.bounds);
    addPin(map, {lng: e.latlng.lng, lat: e.latlng.lat});
    callback(e.latlng.lng, e.latlng.lat);
	});
}

export const pinMe = (map, callback) => {

	map.on('locationfound', (e) => {

		map.fitBounds(e.bounds);
	  addPin(map, {lng: e.latlng.lng, lat: e.latlng.lat});
    callback(e.latlng.lng, e.latlng.lat);
	});

	if (navigator.geolocation) {
		map.locate();
	}
}

export const addSimplePin = (map, lng, lat) => {

  var simplePinLayer = L.mapbox.featureLayer().addTo(map);

	simplePinLayer.setGeoJSON({
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [lng, lat]
		},
		properties: {
			'marker-color': '#ff8888',
			'marker-symbol': 'star'
		}
	});
}

// add a pin that contains text only
export const addTextPin = (map, lng, lat, title, text) => {
  var textPinLayer = L.mapbox.featureLayer().addTo(map);

  textPinLayer.setGeoJSON({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    properties: {
      'title': title,
      'marker-color': '#ff8888',
      'marker-symbol': 'star',
      'text': text
    }
  });

  textPinLayer.eachLayer(function(layer) {

      var content = '<h2>' + layer.feature.properties.title + '<\/h2>' +
          '<p>' + layer.feature.properties.text + '<\/p>';
      layer.bindPopup(content);
  });
}

// add a pin that contains an image and optionally text
export const addImagePin = (map, lng, lat, title, image, text) => {
  var imagePinLayer = L.mapbox.featureLayer().addTo(map);

  imagePinLayer.setGeoJSON({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    properties: {
      'title': title,
      'marker-color': '#ff8888',
      'marker-symbol': 'art-gallery',
      'image': image,
      'text': text
    }
  });

  imagePinLayer.eachLayer(function(layer) {

    console.log('layer.feature.properties.image  = ' + layer.feature.properties.image );

      var content = '<h2>' + layer.feature.properties.title + '<\/h2>' +
          '<img src="' + layer.feature.properties.image + '" \/>';
      if(layer.feature.properties.text) {
        content += '<p>' + layer.feature.properties.text + '<\/p>';
      }
      layer.bindPopup(content);
  });
}

// add a pin that contains an video and optionally text
export const addVideoPin = (map, lng, lat, title, video, text) => {
  var videoPinLayer = L.mapbox.featureLayer().addTo(map);

  videoPinLayer.setGeoJSON({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    properties: {
      'title': title,
      'marker-color': '#ff8888',
      'marker-symbol': 'theatre',
      'video': video,
      'text': text
    }
  });

  videoPinLayer.eachLayer(function(layer) {

      var content = '<h2>' + layer.feature.properties.title + '<\/h2>' +
          '<img src="' + layer.feature.properties.video + '" \/>';
      if(layer.feature.properties.text) {
        content += '<p>' + layer.feature.properties.text + '<\/p>';
      }
      layer.bindPopup(content);
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

      var content = '<h2>A ferry ride!<\/h2>' +
          '<img src="' + layer.feature.properties.image + '" \/>' +
          '<p>From: ' + layer.feature.properties.from + '<br \/>' +
          'to: ' + layer.feature.properties.to + '<\/p>';
      layer.bindPopup(content);
  });
}
