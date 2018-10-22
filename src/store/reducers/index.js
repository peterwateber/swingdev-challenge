import { combineReducers } from 'redux';

import flickrReducer from './flickrReducer';

export default combineReducers({
    photos: flickrReducer
});
