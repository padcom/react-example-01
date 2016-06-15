import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

// import all reducers into an object so that they can be easily used
// to create the store
import * as reducers from './reducers';

// define the root reducer used to initialize the store
const rootReducer = combineReducers(reducers);

// define used middleware
let middleware = applyMiddleware(thunk);

// define the use of Redux DevTools
if (window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

// create and export the store
export default createStore(rootReducer, middleware);
