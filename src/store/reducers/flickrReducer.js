import {
    FETCH_FLICKR_PHOTOS,
    FETCH_FLICKR_ERROR,
    FETCH_FLICKR_LOADING,
    FETCH_FLICKR_LOADED,
    FETCH_RESET_DATA
} from '../constants';
import _ from 'lodash';
//import { generateCacheTTL, DEFAULT_KEY } from 'redux-cache';
import { saveState, loadState } from '../localStorage';

const INITIAL_STATE = {
    //[DEFAULT_KEY]: null,
    photos: {},
    sort: '',
    search: '',
    userPhotos: {},
    error: '',
    loading: false
};

const flickrReducer = (state = INITIAL_STATE, action) => {
    let mergePhotos = {};
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
            let cacheResult = [];
            try {
                cacheResult = loadState().photos.photo;
            } catch (ex) {}
            return {
                ...state,
                photos: loadState(),
                userPhotos: loadState(),
                loading: false,
                error: cacheResult.length
                    ? 'We encountered an error. Cache results are displayed..'
                    : 'We encountered an error. Please try again later.'
            };
        case FETCH_RESET_DATA:
            return {
                ...state,
                photos: {},
                userPhotos: {}
                // photos: action.payload.home ? {} : { ...state.photos },
                // userPhotos: action.payload.profile
                //     ? {}
                //     : { ...state.userPhotos }
            };
        case FETCH_FLICKR_PHOTOS:
            /**
             * Condition below detects if { photo } contains objects
             * then merges the payload
             */
            mergePhotos = action.payload.photos;
            try {
                if (!action.payload.onLoad) {
                    const flickrPhotos = action.payload.photos;
                    mergePhotos.photos.photo = flickrPhotos.photos.photo.slice();
                    const photo =
                        //_.uniqBy(
                        [
                            ...state.photos.photos.photo,
                            ...flickrPhotos.photos.photo
                        ];
                    //'id'
                    //);
                    mergePhotos.photos.photo = _.compact(photo);
                }
            } catch (ex) {}

            saveState(mergePhotos);
            return {
                ...state,
                //[DEFAULT_KEY]: generateCacheTTL(),
                search: action.payload.search,
                sort: action.payload.sort,
                photos: mergePhotos,
                userPhotos: mergePhotos,
                loading: false
            };
        default:
            return state;
    }
};

export default flickrReducer;
