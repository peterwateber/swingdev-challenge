import { FETCH_FLICKR_PHOTOS, FETCH_FLICKR_LOADING, FETCH_FLICKR_ERROR, FETCH_REQUESTED } from '../constants';

export const fetchLoading = () => {
    return {
        type: FETCH_FLICKR_LOADING
    };
};

export const fetchRequested = page => {
    return {
        type: FETCH_REQUESTED,
        payload: page,
    }
}

export const fetchFlickrAPI = payload => {
    return {
        type: FETCH_FLICKR_PHOTOS,
        payload: payload
    };
};

export const fetchFlickrAPIError = () => {
    return {
        type: FETCH_FLICKR_ERROR,
    };
};
