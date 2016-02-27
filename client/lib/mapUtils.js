export default class MapUtils {

  constructor(accessToken, mapId, onLoadedCallback) {
    L.mapbox.accessToken = accessToken;
    this.pinsForUser = [];
    this.map = L.mapbox.map('map', mapId).on('ready', onLoadedCallback);
  }

  // add a pin
  //@pin: {type: text/image/video, lng:1, lat:1, title:"", text:"", link:""}
  addPin (pin) {

    let pinLayer;
    switch(pin.type) {
      case 'text':
        // TODO should text whether all required properties exist
        pinLayer = this.addTextPin(pin.lng, pin.lat, pin.title, pin.text);
        break;
      case 'image':
        // TODO should text whether all required properties exist
        pinLayer = this.addImagePin(pin.lng, pin.lat, pin.title, pin.link, pin.text);
        break;
      case 'video':
        // TODO should text whether all required properties exist
        pinLayer = this.addVideoPin(pin.lng, pin.lat, pin.title, pin.link, pin.text);
      default:
        pinLayer = this.addSimplePin(pin.lng, pin.lat);
        break;
    }
    this.pinsForUser.push(pinLayer);
  }

  addPinsForUser (userId, pins) {
    console.log('addPinsForUser');
    this.removePinsForUser();
    pins.forEach((pin) => this.addPin(pin));
  }

  removePinsForUser () {
    this.pinsForUser.forEach((pin) => this.map.removeLayer(pin));
    this.pinsForUser = [];
    // markerLayer.clearLayers();
  }

  addClick (callback) {
  	this.map.on('click', (e) => {
      console.log('click this = ', e);
      // map.fitBounds(e.bounds);
      // this.addPin({lng: e.latlng.lng, lat: e.latlng.lat});
      callback(e.latlng.lng, e.latlng.lat);
  	});
  }

  pinMe (callback) {

  	this.map.on('locationfound', (e) => {

  		this.map.fitBounds(e.bounds);
  	  this.addPin(map, {lng: e.latlng.lng, lat: e.latlng.lat});
      callback(e.latlng.lng, e.latlng.lat);
  	});

  	if (navigator.geolocation) {
  		this.map.locate();
  	}
  }

  addSimplePin (lng, lat) {

    var simplePinLayer = L.mapbox.featureLayer().addTo(this.map);

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
    return simplePinLayer;
  }

  // add a pin that contains text only
  addTextPin (lng, lat, title, text) {
    var textPinLayer = L.mapbox.featureLayer().addTo(this.map);

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
    return textPinLayer;
  }

  // add a pin that contains an image and optionally text
  addImagePin (lng, lat, title, image, text) {
    var imagePinLayer = L.mapbox.featureLayer().addTo(this.map);

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

      var content = '<h2>' + layer.feature.properties.title + '<\/h2>' +
          '<img src="' + layer.feature.properties.image + '" \/>';
      if(layer.feature.properties.text) {
        content += '<p>' + layer.feature.properties.text + '<\/p>';
      }
      layer.bindPopup(content);
    });
    return imagePinLayer;
  }

  // add a pin that contains an video and optionally text
  addVideoPin (lng, lat, title, video, text) {
    var videoPinLayer = L.mapbox.featureLayer().addTo(this.map);

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
    return videoPinLayer;
  }

  addFancyPin (e) {

  	var featureLayer = L.mapbox.featureLayer().addTo(this.map);

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
}
