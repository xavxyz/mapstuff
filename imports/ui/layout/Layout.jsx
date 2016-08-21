import React, { Component } from 'react';

// import Header from '../components/Header.jsx';
import MapWrapper from "../components/MapWrapper.jsx";
import MediaOverlay from "../components/MediaOverlay.jsx";

class Layout extends React.Component {
  componentWillMount() {
    return Meteor.call('fetch.instagram', (err, res) => {
      return res.map(media => this.props.addPin({
        lng: media.location.longitude,
        lat: media.location.latitude,
        image: media.images.standard_resolution
      }))
    });
  }

  render() {

    return (
      <div>
        <MapWrapper {...this.props} />
        <MediaOverlay {...this.props} />
      </div>
    );
  }
}

export default Layout;
