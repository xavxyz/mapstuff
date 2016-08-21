import { createStore, compose } from 'redux';

import rootReducer from './reducers/root.js';

const defaultState = {
  mapbox: {
    pins: [],
    center: [-71.9803719, -13.516491],
  },
  overlay: {
    show: false,
    media: null,
  }
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export default store;