import dispatcher from './framework/dispatcher';

import TitleStore from './stores/title-store';
import * as TitleActions from './actions/title-actions';
import * as DataActions from './actions/data-actions';

import App from './components/app';

// This makes certain things available in runtime which is good for debugging
window.Application = {
  dispatcher,
  TitleStore,
  TitleActions
}

// Render the application under #react-output
ReactDOM.render(<App/>, document.getElementById('react-output'));

function listenForEvents(endpoint) {
  function reconnect() {
    setTimeout(function() { listenForEvents(endpoint); }, 2000);
  }

  function process(data) {
    data = JSON.parse(data.data);
    TitleActions.titleChanged(data.title);
    DataActions.dataChanged(data.data);
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

listenForEvents('ws://localhost:8001/events');
