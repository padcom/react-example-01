import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

// define the root reducer used to initialize the store
const rootReducer = combineReducers(reducers);

// define used middleware
const middleware = [
  thunk
];

// define the use of Redux DevTools
const devtools = window.devToolsExtension ? window.devToolsExtension() : undefined;

// create and export the store
export default createStore(rootReducer, undefined, compose(applyMiddleware(...middleware), devtools));
