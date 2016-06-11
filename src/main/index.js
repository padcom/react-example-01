import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import * as actions from './actions';
import App from './components/app';

// define the root reducer used to initialize the store
const rootReducer = combineReducers(reducers);

// load initial data from server, create the store and render the app
fetch('http://' + window.location.host + '/data')
  .then(response => response.json())
  .then(data => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    store.dispatch(actions.setData(data));
    ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
    listenForEvents(store, 'ws://' + window.location.host + '/events');
  })


// Data receiver over web socket
function listenForEvents(store, endpoint) {
  function reconnect() {
    setTimeout(function() { listenForEvents(store, endpoint); }, 1000);
  }

  function process(data) {
    data = JSON.parse(data.data);
    store.dispatch(actions.titleChanged(data.title));
    store.dispatch(actions.applyDelta(data.data));
  }

  try {
    const events = new WebSocket(endpoint);
    events.onmessage = process;
    events.onclose = reconnect;
  } catch (error) {
    reconnect();
  }
}
