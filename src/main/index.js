import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from 'components/app';
import DataActions from 'state/data';
import listenForEvents from 'api/feed';

var host = window.location.host || 'localhost:3000';

global.window.App = {
  store: store,
  actions: {
    data: DataActions
  }
}

// load initial data from server, create the store and render the app
store.dispatch(DataActions.loadInitialData(host));
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
listenForEvents(store, 'ws://' + host + '/events');
