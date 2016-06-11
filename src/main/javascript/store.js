import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

// define the root reducer used to initialize the store
const rootReducer = combineReducers(reducers);

// define used middleware
const middleware = [ thunk ];

// create and export the store
export default createStore(rootReducer, applyMiddleware(...middleware));
