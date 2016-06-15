import TitleActions from 'state/title';
import DataActions from 'state/data';

// Data receiver over web socket
export default function listenForEvents(store, endpoint) {
  function reconnect() {
    setTimeout(function() { listenForEvents(store, endpoint); }, 1000);
  }

  function process(data) {
    data = JSON.parse(data.data);
    store.dispatch(TitleActions.titleChanged(data.title));
    store.dispatch(DataActions.applyDelta(data.data));
  }

  try {
    const events = new WebSocket(endpoint);
    events.onmessage = process;
    events.onclose = reconnect;
  } catch (error) {
    reconnect();
  }
}
