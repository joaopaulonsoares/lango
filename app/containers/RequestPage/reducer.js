/*
 *
 * RequestPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_USER,
} from './constants';

const initialState = fromJS({
  connectionUserData: {},
});

function requestPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_USER:
      // console.info("On Reducer ", action.userObj);
      return state.setIn(['connectionUserData'], action.userObj);
    default:
      return state;
  }
}

export default requestPageReducer;
