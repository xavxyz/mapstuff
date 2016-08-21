import { combineReducers } from 'redux';

const pins = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PIN':
      return [...state, action.pin];
    default:
      return state;
  }
};

const center = (state = [], action) => {
  switch (action.type) {
    case 'SET_CENTER':
      return [action.center.lng, action.center.lat];
    default:
      return state;
  }
}

const mapbox = combineReducers({ pins, center });


export default mapbox;