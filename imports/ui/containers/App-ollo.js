import React, { Component } from 'react';
import { connect } from 'react-apollo';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/std:accounts-ui';
import gql from 'graphql-tag';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

const App = ({ userId, currentUser }) => {
  return (
    <div>
      <Accounts.ui.LoginForm />
      { userId ? (
        <div>
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>
          <button onClick={() => currentUser.refetch()}>Refetch!</button>
        </div>
      ) : 'Please log in!' }
    </div>
  );
};

// This container brings in Apollo GraphQL data
const AppWithData = connect({
  mapQueriesToProps({ ownProps }) {
    if (ownProps.userId) {
      return {
        currentUser: {
          query: gql`
            query getUserData ($id: String!) {
              user(id: $id) {
                emails {
                  address
                  verified
                }
                username
                randomString
              }
            }
          `,
          variables: {
            id: ownProps.userId,
          },
        },
      };
    }
  },
})(App);

// This container brings in Tracker-enabled Meteor data
const AppWithUserId = createContainer(() => {
  return {
    userId: Meteor.userId(),
  };
}, AppWithData);

export default AppWithUserId;