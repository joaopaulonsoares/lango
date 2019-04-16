import { put, takeLatest } from "redux-saga/effects";
import { API, graphqlOperation } from "aws-amplify";

import { extractId } from "utils/utilFuncs";
import { error, removeRecomendedUser } from "../App/actions";
import { refreshUser } from "../LandingPage/actions";
import { putFriendRequest, addFriendRequestNotification } from '../../graphRequestTemplates';

function* handshake(action) {
  try {
    const id = yield extractId(); // Extract the cognito ID from amplify
    const options = {
      senderId: id,
      receiverId: action.id,
      status: 'SENT',
    };

    yield API.graphql(graphqlOperation(addFriendRequestNotification, { receiverId: options.receiverId }));
    yield API.graphql(graphqlOperation(putFriendRequest, options));
    yield put(refreshUser(id));
    yield put(removeRecomendedUser(action.id));
  } catch (e) {
    yield put(error(e));
  }
}

function* mySaga() {
  yield takeLatest("MAKE_HANDSHAKE", handshake);
}

export default mySaga;
