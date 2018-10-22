import {
    FLICKR_URL,
    FETCH_FLICKR_PHOTOS,
    FETCH_FLICKR_ERROR,
    FETCH_FLICKR_LOADING
} from '../constants';
import axios from 'axios';
import { checkCacheValid } from 'redux-cache';
import { loadState, saveState } from '../localStorage';

const generateUrl = (method = 'flickr.photos.search') =>
    (FLICKR_URL || '').replace('$[apiMethod]', method).replace(
        '$[apiKey]',
        process.env.REACT_APP_FLICKR_API_KEY
    );

export const fetchFlickrPhotos = () => (dispatch, getState) => {
    const isCacheValid = checkCacheValid(getState, 'photos');

    if (isCacheValid) {
        return null;
    }
    dispatch({
        type: FETCH_FLICKR_LOADING
    });
    axios
        .get(generateUrl(), {
            params: {
                text: 'dogs'
            }
        })
        .then(res => res.data)
        .then(photos => {
            saveState(photos);
            if (typeof photos.code !== 'undefined') {
                if (photos.code === 100) {
                    dispatch({
                        type: FETCH_FLICKR_ERROR
                    });
                }
            } else {
                dispatch({
                    type: FETCH_FLICKR_PHOTOS,
                    payload: photos
                });
            }
        })
        .catch(err => {
            const cachedState = loadState();
            if (cachedState) {
                dispatch({
                    type: FETCH_FLICKR_PHOTOS,
                    payload: cachedState
                });
            } else {
                dispatch({
                    type: FETCH_FLICKR_ERROR
                });
            }
        });
};
