import {
    FLICKR_URL,
    FETCH_FLICKR_PHOTOS,
    FETCH_FLICKR_ERROR,
    FETCH_FLICKR_LOADING,
    FETCH_REQUESTED,
    FETCH_RESET_DATA
} from '../constants';

import axios from 'axios';
import { select, call, put, takeEvery, all } from 'redux-saga/effects';

/**
 * Function requires object then returns string
 *  with query format e.g. "&test=123&ting=456"
 */
const jsonToQueryParams = (obj = {}) =>
    Object.keys(obj)
        .map(function(key, index) {
            return (index === 0 ? '&' : '') + key + '=' + obj[key];
        })
        .join('&');

const generateUrl = (method = 'flickr.photos.search') =>
    (FLICKR_URL || '')
        .replace('$[apiMethod]', method)
        .replace('$[apiKey]', process.env.REACT_APP_FLICKR_API_KEY);

//const delay = ms => new Promise(res => setTimeout(res, ms));

function* getFlickrAPI(action = { payload: {} }) {
    yield put({
        type: FETCH_FLICKR_LOADING
    });
    const photosURL = generateUrl();

    const onLoad = action.payload.onLoad || false;

    const userId = action.payload.userId || '';

    const perPage = action.payload.perPage || 15;

    const { store } = yield select() ;

    const sort = action.payload.sort || '';

    const photoSearchQueryParams = jsonToQueryParams({
        text: 'dog',
        tags: action.payload.search || '',
        //tag_mode: action.payload.search || '',
        extras: 'owner_name, date_upload, date_taken, description',
        sort: sort || store.sort,
        safe_search: 1,
        user_id: userId,
        per_page: perPage,
        page: action.payload.page
    });

    try {

        if (onLoad) {
            yield put({
                type: FETCH_RESET_DATA
            })
        }

        const photoCall = yield call(
            axios.get,
            photosURL.concat('&').concat(photoSearchQueryParams)
        );

        yield put({
            type: FETCH_FLICKR_PHOTOS,
            payload: {
                search: action.payload.search || '',
                onLoad: onLoad,
                photos: photoCall.data,
                userId: userId,
                sort: sort || store.sort
            }
        });
    } catch (ex) {
        yield put({
            type: FETCH_FLICKR_ERROR
        });
    }

    /**
     *
     * CODES BELOW ARE FOR CONCURRENT SAGA REQUESTS
     *
     * fetch search then fetch photo information
     *
     */

    //try {
    // let photo = yield photoCall.data.photos.photo;

    // let users = yield call(fetchUserInfo, photo);

    // users = users.map(({ data }) => {
    //     return {
    //         photoId: data.photo.id,
    //         owner: data.photo.owner
    //     };
    // });

    // photo = photo.map(p => {
    //     return {
    //         ...p,
    //         user: users.find(u => u.photoId === p.id).owner
    //     };
    // });

    // yield put({
    //     type: FETCH_FLICKR_PHOTOS,
    //     payload: {
    //         ...photoCall.data,
    //         photos: {
    //             photo: photo
    //         }
    //     }
    // });
    // } catch (ex) {
    //     yield put({
    //         type: FETCH_FLICKR_ERROR
    //     });
    // }
}

// function* fetchUserInfo(photo) {
//     return yield photo.map(p => {
//         const photoInfoQueryParams = jsonToQueryParams({
//             photo_id: p.id
//         });
//         const photosInfoUrl = generateUrl('flickr.photos.getInfo');
//         return call(axios.get, photosInfoUrl.concat(photoInfoQueryParams));
//     });
// }

/**
 * Instead of using componentDidMount()
 * use defaultSearch()
 */

// function* defaultSearch() {
//     yield call(getFlickrAPI, {
//         payload: {
//             page: 1,
//             perPage: 10
//         }
//     })
// }

function* flickrSagaWatcher() {
    yield takeEvery(FETCH_REQUESTED, getFlickrAPI);
}

export default function* rootSaga() {
    yield all([
        flickrSagaWatcher(),
        //defaultSearch()
    ]);
}
