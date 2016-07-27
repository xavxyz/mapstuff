import React, { Component } from 'react';

import Header from '../components/Header.jsx';
import MapWrapper from "../components/MapWrapper.jsx";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <MapWrapper {...this.props} />
      </div>
    );
  }
}

export default Layout;
