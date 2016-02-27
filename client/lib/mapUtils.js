export default class MapUtils {

  constructor(accessToken, mapId, onLoadedCallback) {
    L.mapbox.accessToken = accessToken;
    this.pinsForUser = {};
    this.map = L.mapbox.map('map', mapId).on('ready', onLoadedCallback);
    L.control.locate().addTo(this.map);
  }

  // add a pin
  //@pin: {type: text/image/video, lng:1, lat:1, title:"", text:"", link:""}
  addPin (pin, userId) {

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
      break;
      default:
      pinLayer = this.addSimplePin(pin.lng, pin.lat);
      break;
    }
    if(!userId) {
      userId = "default";
    }
    if(!this.pinsForUser[userId]) {
      this.pinsForUser[userId] = []
    }
    this.pinsForUser[userId].push(pinLayer);
  }

  addPinsForUser (userId, pins) {
    console.log('addPinsForUser');
    this.removePinsForUser(userId);
    pins.forEach((pin) => this.addPin(pin));
  }

  removePinsForUser (userId) {
    if(this.pinsForUser[userId]) {
      this.pinsForUser[userId].forEach((pin) => this.map.removeLayer(pin));
      this.pinsForUser[userId] = [];
    }
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
    console.log('addSimplePin');
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
    console.log('addTextPin');
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
    console.log('addImagePin');
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
  addVideoPin(lng, lat, title, video, text) {
    // The GeoJSON representing a point feature with a property of 'video' for the Vimeo iframe

    var substringIndex = video.lastIndexOf('/') + 1;
    var vimeoVideoId = video.substring(substringIndex);
    var playerLink = '//player.vimeo.com/video/' + vimeoVideoId;
    var vimeoLink = 'http://vimeo.com/' + vimeoVideoId;
    var videoHtml = '<iframe src="' + playerLink + '" width="380" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <h2><a href="' + vimeoLink + '">' + title + '<\/a><\/h2>';
    if(text) {
      videoHtml += '<p>' + text + '<\/p>';
    }

    var geoJson = {
      features: [{
        type: 'Feature',
        properties: {
          'marker-color': '#f00',
          'marker-color': '#ff8888',
          'marker-symbol': 'theatre',
          video: videoHtml,
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      }]
    };

    var videoPinLayer = L.mapbox.featureLayer().addTo(this.map);

    // Add the iframe in a marker tooltip using the custom feature properties
    videoPinLayer.on('layeradd', function(e) {
      var marker = e.layer,
      feature = marker.feature;

      // Create custom popup content from the GeoJSON property 'video'
      var popupContent =  feature.properties.video;

      // bind the popup to the marker http://leafletjs.com/reference.html#popup
      marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 400
      });
    });

    // Add features to the map
    videoPinLayer.setGeoJSON(geoJson);
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
