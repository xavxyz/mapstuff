import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from 'react-mapbox-gl';

const { accessToken, style } = Meteor.settings.public;

const containerStyle = {
  height: '100vh',
  width: '100%',
};

const MapWrapper = (props) => {
  const { pins } = props.mapbox;
  const worldCenter = [pins[0].lng, pins[0].lat];
  return (
    <ReactMapboxGl
      style={ style }
      center={ worldCenter }
      zoom={ 6 }
      accessToken={ accessToken }
      onClick={ (map, event) => props.addPin(event.lngLat) }
      containerStyle={ containerStyle }
    >
      <Layer
        type="symbol"
        id="marker"
        layout={{ 'icon-image': 'marker-15' }}>
          {
            pins.map(pin => (
              <Feature
                // basic key
                key={ pin.lng + pin.lat }
                coordinates={ [pin.lng, pin.lat] }
              />
            ))
          }
      </Layer>
    </ReactMapboxGl>
  );
};

MapWrapper.propTypes = {
  mapbox: React.PropTypes.object.isRequired,
  addPin: React.PropTypes.func,
};

export default MapWrapper;

