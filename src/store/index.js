import { createStore, compose } from 'redux';
import rootReducer from './reducers';

import { FETCH_TODO_LIST } from './constants';

const initialState = {};

const middlewares = [];

const enhancers = [...middlewares];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION__
        : compose;
/* eslint-enable */

export const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
);

store.dispatch({
    type: FETCH_TODO_LIST
});
