import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { cacheEnhancer } from 'redux-cache';

import rootReducer from './reducers';

const middlewares = [thunk];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
/* eslint-enable */

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares),
        cacheEnhancer({
            log: true
        })
    )
);
export default store;
