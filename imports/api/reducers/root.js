import { combineReducers } from 'redux';

import mapbox from './mapbox.js';
import overlay from './overlay.js';

const rootReducer = combineReducers({ mapbox, overlay });


export default rootReducer;