import { FETCH_TODO_LIST, UPDATE_NAME } from '../constants';

const sampleReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_TODO_LIST:
            return { ...state, aw: 'Hello World' };
        case UPDATE_NAME:
            return {
                ...state,
                aw: state.aw.concat(', ' + action.payload)
            };
        default:
            return state;
    }
};

export default sampleReducer;
