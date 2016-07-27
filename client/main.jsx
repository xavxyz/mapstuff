import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

import store from '../imports/api/store.js';

// import App from '../imports/ui/containers/App.js';

import AppOllo from '../imports/ui/containers/App-ollo.js';

const client = new ApolloClient(meteorClientConfig());

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <AppOllo />
    </ApolloProvider>,
    document.getElementById('root')
  );
});

// render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
