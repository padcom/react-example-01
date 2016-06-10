import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { title, titleChanged, data, convertDataFromServer, applyDelta } from './reducers';
import { App } from './components/app';

const rootReducer = combineReducers({
  title,
  data
});

// load initial data from server, create the store and render the app
fetch("http://localhost:8001/data")
  .then(response => response.json())
  .then(data => {
    const store = createStore(rootReducer, { data: convertDataFromServer(data) }, applyMiddleware(thunk));
    ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('react-output'));
    listenForEvents(store, 'ws://localhost:8001/events');
  })


// Data receiver over web socket
function listenForEvents(store, endpoint) {
  function reconnect() {
    setTimeout(function() { listenForEvents(endpoint); }, 2000);
  }

  function process(data) {
    data = JSON.parse(data.data);
    store.dispatch(titleChanged(data.title));
    store.dispatch(applyDelta(data.data));
  }

  let events;
  try {
    events = new WebSocket(endpoint);
  } catch (error) {
    reconnect();
  }

  events.onmessage = process;
  events.onclose = reconnect;
}
