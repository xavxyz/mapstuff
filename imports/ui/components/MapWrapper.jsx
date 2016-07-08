import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";

const { accessToken, style } = Meteor.settings.public;

const containerStyle = {
  height: "100vh",
  width: "100%"
};

export default class MapWrapper extends React.Component {
  render() {
    const { pins } = this.props.mapbox;
    const worldCenter = [pins[0].lng, pins[0].lat];
    return (
      <ReactMapboxGl
        style={ style }
        center={ worldCenter }
        zoom={ 6 }
        accessToken={ accessToken }
        onClick={ (map, event) => this.props.addPin(event.lngLat) }
        containerStyle={ containerStyle }
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
            {
              pins.map(pin => (
                <Feature
                  // basic key
                  key={pin.lng+pin.lat}
                  coordinates={ [pin.lng, pin.lat] }
                />
              ))
            }
        </Layer>
      </ReactMapboxGl>
    )
  }
}