import { takeLatest, select } from 'redux-saga/effects';


import { API, graphqlOperation } from "aws-amplify";

import { makeSelectUserData } from 'containers/App/selectors';

import { SAVE_PREFERENCES } from '../App/constants';
import { putUserPreferences } from "../../graphRequestTemplates";
import { extractId } from "../../utils/utilFuncs";

function* savePreferences() {
  const id = yield extractId();
  const user = yield select(makeSelectUserData());

  const Spreferences = user.preferences;

  yield API.graphql(graphqlOperation(putUserPreferences, { id, preferences: JSON.stringify(Spreferences) }));
  window.location.href = `${window.location.origin}/`;
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SAVE_PREFERENCES, savePreferences);
}
