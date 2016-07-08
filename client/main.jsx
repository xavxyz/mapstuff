import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from '../imports/api/store.js';

import App from '../imports/ui/containers/App.js';

render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
