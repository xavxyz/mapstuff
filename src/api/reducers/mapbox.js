import { combineReducers } from 'redux';

const pins = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PIN':
      return [...state, action.pin];
    default:
      return state;
  }
};

const mapbox = combineReducers({ pins });


export default mapbox;