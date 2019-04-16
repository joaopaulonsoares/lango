/*
 *
 * EditProfile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_FIRST_NAME,
  CHANGE_SECOND_NAME,
  CHANGE_EMAIL,
  CHANGE_LANGUAGES,
  CHANGE_LOCATION,
  CHANGE_DESCRIPTION,
  CHANGE_GENDER,
} from './constants';

const initialState = fromJS({ userData: {} });

function editProfileReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIRST_NAME:
      return state.setIn(['userData', 'firstName'], action.firstName);
    case CHANGE_SECOND_NAME:
      return state.setIn(['userData', 'lastName'], action.secondName);
    case CHANGE_EMAIL:
      return state.setIn(['userData', 'email'], action.email);
    case CHANGE_GENDER:
      return state.setIn(['userData', 'gender'], action.gender);
    case CHANGE_DESCRIPTION:
      return state.setIn(['userData', 'description'], action.description);
    case CHANGE_LOCATION:
      return state.setIn(['userData', 'location'], action.location);
    case CHANGE_LANGUAGES:
      return state.setIn(['userData', 'spoken'], action.languages.spoken).setIn(['userData', 'learning'], action.languages.learning);
    default:
      return state;
  }
}

export default editProfileReducer;
