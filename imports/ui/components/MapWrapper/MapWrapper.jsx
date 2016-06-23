import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";

import './MapWrapper.scss';

const { accessToken, style } = {
  "accessToken": "pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A",
  "style": "mapbox://styles/mapbox/basic-v8"
};

const containerStyle = {
  height: "100vh",
  width: "100%"
};

const worldCenter = [-71.9803719, -13.516491];

export default class MapWrapper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      center: worldCenter,
      zoom: 6,
    };
  }

  render() {
    return (
      <div>
        <ReactMapboxGl
          style={ style }
          center={ this.state.center }
          zoom={ this.state.zoom }
          accessToken={ accessToken }
          onClick={ (e) => console.log(e) }
          containerStyle={ containerStyle }
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker", "icon-size": 2 }}>
              <Feature
                coordinates={ worldCenter } />
          </Layer>
        </ReactMapboxGl>
      </div>
    )
  }
}