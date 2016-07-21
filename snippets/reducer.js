// @flow
import { handleActions } from 'redux-actions';
import Immutable from 'immutable-js';

const initialState = {};

const reducer = handleActions({
  [YOUR_CONSTANT]: (state, { payload }) => (
    // reduce
  ),
}, initialState);

export default reducer;
