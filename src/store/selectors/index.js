import { createSelector } from 'reselect';

const getName = state => state.indexOf('peter');

const sampleSelector = () => createSelector(getName());

export { sampleSelector };
