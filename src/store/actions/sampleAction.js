import { FETCH_TODO_LIST } from '../constants';

export const sampleAction = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(res => res.json())
        .then(lists =>
            dispatch({
                type: FETCH_TODO_LIST,
                payload: lists
            })
        );
};
