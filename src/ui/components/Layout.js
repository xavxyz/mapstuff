import React, { Component } from 'react';

import Header from './Header.js';
import MapWrapper from "./MapWrapper.js";

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
