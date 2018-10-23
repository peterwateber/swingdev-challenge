export let FLICKR_URL = `
        https://api.flickr.com/services/rest/?method=$[apiMethod]&api_key=$[apiKey]&format=json&nojsoncallback=1
    `;

export const FETCH_FLICKR_LOADING = 'FETCH_FLICKR_LOADING';

export const FETCH_REQUESTED= 'FETCH_REQUESTED';

export const FETCH_FLICKR_LOADED = 'FETCH_FLICKR_LOADED';

export const FETCH_FLICKR_PHOTOS = 'FETCH_FLICKR_PHOTOS';

export const FETCH_RESET_DATA = 'FETCH_RESET_DATA';

export const FETCH_FLICKR_ERROR = 'FETCH_FLICKR_ERROR';
