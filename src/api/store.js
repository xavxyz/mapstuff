import { createStore, compose } from 'redux';

import rootReducer from './reducers/root.js';

const defaultState = {
  mapbox: {
    pins: [
      { lng: -71.9803719, lat: -13.516491 },
    ],
  },
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export default store;