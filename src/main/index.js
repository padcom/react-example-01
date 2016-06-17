import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store';
import App from 'components/app';
import Title from 'components/title';
import DataGrid from 'components/data-grid';
import DataActions from 'state/data';
import RoutingActions from 'state/routing';
import listenForEvents from 'api/feed';

var host = window.location.host || 'localhost:3000';

// configure browser history
const history = syncHistoryWithStore(browserHistory, store);

// load initial data from server, create the store and render the app
store.dispatch(DataActions.loadInitialData(host));
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/counter" component={Title} />
      <Route path="/data-grid" component={DataGrid} />
    </Router>
  </Provider>,
  document.getElementById('root'));

// start listening for data change events on web socket
listenForEvents(store, 'ws://' + host + '/events');

// make some parts of the application available globally for use in the console while developing the application
if (window.devToolsExtension) {
  global.window.dispatch = store.dispatch;
  global.window.actions = {
    data: DataActions,
    routing: RoutingActions
  }
}
