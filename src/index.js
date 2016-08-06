import React from 'react';
import ReactDOM from 'react-dom';

//import ApolloClient from 'apollo-client';
import { Provider } from 'react-redux';

import store from './api/store.js';


import App from './ui/containers/App';
import './index.css';

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));

