import { put, takeLatest } from "redux-saga/effects";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { extractId } from "utils/utilFuncs";

import { updateUser, saveNotifications, saveFriendUserNotifications, error } from "../App/actions";
import { getUser, getNotificationsByUser, getFriendRequestNotifications } from '../../graphRequestTemplates';

/* eslint no-console: 0 */

function* loadFriendRequestNotifications() {
  try {
    const friendRequestNotifications = yield API.graphql(graphqlOperation(getFriendRequestNotifications)).then(
      response => response.data.getFriendNotificationsByUser);

    yield put(saveFriendUserNotifications(friendRequestNotifications));
  } catch (e) {
    console.error(e);
    yield put(error(e));
  }
}

function* redirectNewUser(action) {
  const { data } = action;
  const id = yield extractId();

  const dataAndAmplify = { ...data, amplifyId: id };
  yield window.localStorage.setItem('newUser', JSON.stringify(dataAndAmplify));
  yield window.location.href = `${window.location.origin}/new_user`;
}

function* checkIfNewUser(action) {
  // const id = yield extractId(); // Save the user's Cognito identity ID

  const id = action.id;
  const data = action.fbData;

  const isNewUser = yield API.graphql(graphqlOperation(getUser, { id })).then(
    response => response.data.getUser === null
  );

  if (isNewUser) {
    yield put({ type: "REDIRECT_NEW_USER", data });
  } else if (id) {
    yield put({ type: "UPDATE_USER_DATA" });
  }
}

function* logAmplify(action) {
  const date = new Date();

  const data = action.e;
  const user = yield Auth.federatedSignIn( // Perform federated sign in with amplify
    "facebook",
    {
      token: data.accessToken,
      expires_at: data.expiresIn * 1000 + date.getTime(), // eslint-disable-line
    },
  ).then(() => Auth.currentAuthenticatedUser());

  yield put({ type: "CHECK_IF_NEW_USER", id: user.id, fbData: data });
}

function* login() {
  try {
    yield put({ type: "UPDATE_USER_DATA" }); // Fetch user object from appsync and save it to the store
  } catch (e) {
    console.error(e);
  }
}

function* loadUserData() { // Loads UserData from appsync and dispatches it to the store
  try {
    const id = yield extractId();
    const userObj = yield API.graphql(graphqlOperation(getUser, { id })).then(
      response => response.data.getUser
    );
    const notificationsByUser = yield API.graphql(graphqlOperation(getNotificationsByUser, { userId: id })).then(
      response => response.data.getNotificationsByUser
    );

    yield put({ type: "GET_FRIEND_REQUESTS_NOTIFICATIONS" });
    yield put((saveNotifications(notificationsByUser)));
    yield put(updateUser(userObj));
  } catch (e) {
    console.error(e);
  }
}

function* mySaga() {
  yield takeLatest("REDIRECT_NEW_USER", redirectNewUser);
  yield takeLatest("CHECK_IF_NEW_USER", checkIfNewUser);
  yield takeLatest("LOG_AMPLIFY", logAmplify);
  yield takeLatest("LOG_IN", login);
  yield takeLatest("UPDATE_USER_DATA", loadUserData);
  yield takeLatest("GET_FRIEND_REQUESTS_NOTIFICATIONS", loadFriendRequestNotifications);
}

export default mySaga;
