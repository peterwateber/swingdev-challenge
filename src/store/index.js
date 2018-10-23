import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { cacheEnhancer } from 'redux-cache';

import rootReducer from './reducers';

import sagas from './sagas/flickrSaga';

const sagaMiddleware = createSagaMiddleware();

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
        applyMiddleware(sagaMiddleware),
        cacheEnhancer({
            log: true
        })
    )
);


sagaMiddleware.run(sagas)

export default store;
