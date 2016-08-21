import { combineReducers } from 'redux';

const overlay = (state = {show: false, media: null}, action) => {
  switch(action.type) {
    case 'DISPLAY_MEDIA':
      return {
        show: true,
        media: action.media
      };
    case 'HIDE_MEDIA':
      return {
        show: false,
        media: null,
      };
    default:
      return state;
  }
};

export default overlay;