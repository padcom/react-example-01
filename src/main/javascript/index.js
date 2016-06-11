import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import * as actions from './actions';
import App from './components/app';
import listenForEvents from './feed';

// load initial data from server, create the store and render the app
fetch('http://' + window.location.host + '/data')
  .then(response => response.json())
  .then(data => {
    store.dispatch(actions.setData(data));
    ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
    listenForEvents(store, 'ws://' + window.location.host + '/events');
  })
