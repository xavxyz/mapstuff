import React, { Component } from 'react';

import { DocHead } from 'meteor/kadira:dochead';

import Header from '../components/Header/Header.jsx';
import MapWrapper from "/imports/ui/components/MapWrapper/MapWrapper.jsx";

class Layout extends React.Component {
  render() {
    if (Meteor.isClient) {
      DocHead.setTitle('Mapstuff v0.2');
      DocHead.addMeta({ name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, shrink-to-fit=no' });
      DocHead.addLink({ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto', type: 'text/css' });
    }

    return (
      <div>
        <Header {...this.props} />

        <MapWrapper {...this.props} />
      </div>
    );
  }
}

export default Layout;