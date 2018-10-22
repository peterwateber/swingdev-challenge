import {
    FETCH_FLICKR_PHOTOS,
    FETCH_FLICKR_ERROR,
    FETCH_FLICKR_LOADING,
    FETCH_FLICKR_LOADED
} from '../constants';
import { generateCacheTTL, DEFAULT_KEY } from 'redux-cache';

const INITIAL_STATE = {
    photos: [],
    [DEFAULT_KEY]: null,
    error: '',
    loading: true
};

const flickrReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_FLICKR_LOADING:
            return {
                ...state,
                loading: true
            };
        case FETCH_FLICKR_LOADED:
            return {
                ...state,
                loading: false
            };

        case FETCH_FLICKR_ERROR:
            return {
                ...state,
                loading: false,
                error: 'We encountered an error. Please try again later.'
            };
        case FETCH_FLICKR_PHOTOS:
            return Object.assign({}, state, {
                [DEFAULT_KEY]: generateCacheTTL(),
                photos: action.payload
            });
        default:
            return state;
    }
};

export default flickrReducer;
