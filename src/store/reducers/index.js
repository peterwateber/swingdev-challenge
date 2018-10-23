import { combineReducers } from 'redux';

import flickrReducer from './flickrReducer';

export default combineReducers({
    store: flickrReducer
});
