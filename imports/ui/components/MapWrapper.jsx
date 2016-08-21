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
  return (
    <ReactMapboxGl
      style={ style }
      center={ props.mapbox.center }
      zoom={ 6 }
      accessToken={ accessToken }
      onClick={(map, event) => { props.hideMedia(); props.setCenter(event.lngLat) }}
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
                onClick={() => props.displayMedia(pin.image)}
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

