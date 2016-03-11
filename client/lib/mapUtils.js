import smallScreen from './mobile-display';

export default class MapUtils {

  constructor(accessToken, mapId, onLoadedCallback, onPinClick) {
    L.mapbox.accessToken = accessToken;

    this.pinsForUser = {};
    this.onPinClick = onPinClick;

    // define defaults corner bottom-left and corner top-right to center the map (whole world view)
    const southWest = L.latLng(-84.415, -172.968),
      northEast = L.latLng(86.679, 187.734);

    let options = {
      maxBounds: L.latLngBounds(southWest, northEast),
      maxZoom: 19,
      minZoom: 3
    };

    if (smallScreen()) {
      options.zoomControl = false
    }

    this.map = L.mapbox.map('map', mapId, options).on('ready', onLoadedCallback);
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

    pinLayer.id = pin._id;

    pinLayer.on('click', (e) => {
      this.onPinClick(e.target.id);
    });

    if(!userId) {
      userId = "default";
    }

    if(!this.pinsForUser[userId]) {
      this.pinsForUser[userId] = [];
    }
    else if(this.pinsForUser["default"]) {
      removePinsForUser("default");
    }

    this.pinsForUser[userId].push(pinLayer);
  }

  addPinsForUser (userId, pins) {
    this.removePinsForUser(userId);
    pins.forEach((pin) => this.addPin(pin, userId));
  }

  removePinsForUser (userId) {
    if(this.pinsForUser[userId]) {
      this.pinsForUser[userId].forEach((pin) => {console.log('removing pin'); this.map.removeLayer(pin)});
      this.pinsForUser[userId] = [];
    }
    // markerLayer.clearLayers();
  }

  addClick (callback) {
    this.map.on('click', (e) => {
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
        'marker-color': '#009933',
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
        'marker-color': '#0066cc',
        'marker-symbol': 'art-gallery',
        'image': image,
        'text': text
      }
    });

    imagePinLayer.eachLayer((layer) => {
      let width = 380;
      if (smallScreen()) {
        width = window.screen.availWidth - 40; // equal margin on both sides
      }

      /*
       // pure js way to determine image size, if someone knows a better way -> PR please :)
       const img = new Image();
       img.src = layer.feature.properties.image;
       img.onload = function () {
       if (this.width < width) {
       width = this.witdh;
       }
       };
       */

      let content = `<h2>${layer.feature.properties.title}</h2>
                     <img src="${layer.feature.properties.image}" width="${width}" style='display: block; margin-left: auto; margin-right: auto;' />`;

      if (layer.feature.properties.text) {
        content += `<p>${layer.feature.properties.text}</p>`;
      }

      layer.bindPopup(content, {
        closeButton: false,
        minWidth: width + 20
      });

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

    let width = 380;
    let height = 281;

    if (smallScreen()) {
      width = window.screen.availWidth - 40; // equal margins on both side
      height = 281 * width / 380;
    }

    var videoHtml = `<iframe src="${playerLink}" width="${width}" height="${height}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <h2><a href="${vimeoLink}">${title}</a></h2>`;
    if (text) {
      videoHtml += `<p>${text}</p>`;
    }

    var geoJson = {
      features: [{
        type: 'Feature',
        properties: {
          'marker-color': '#cc0000',
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
      marker.bindPopup(popupContent, {
        closeButton: false,
        minWidth: width + 20
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
