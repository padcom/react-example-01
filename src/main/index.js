import * as reducers from './reducers';
import * as actions from './actions';
import App from './components/app';

const rootReducer = Redux.combineReducers(reducers);

// load initial data from server, create the store and render the app
fetch("http://localhost:8001/data")
  .then(response => response.json())
  .then(data => {
    const store = Redux.createStore(rootReducer, Redux.applyMiddleware(ReduxThunk.default));
    store.dispatch(actions.setData(data));
    ReactDOM.render(<ReactRedux.Provider store={store}><App/></ReactRedux.Provider>, document.getElementById('react-output'));
    listenForEvents(store, 'ws://localhost:8001/events');
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
