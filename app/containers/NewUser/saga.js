import { put, takeLatest } from "redux-saga/effects";

import { API, graphqlOperation, Storage } from 'aws-amplify';
import { extractId } from "utils/utilFuncs";

import { error, updateUser, saveNotifications } from "../App/actions";
import { getUser, putUser, getNotificationsByUser } from '../../graphRequestTemplates';

function* updateUserData(action) { // Loads UserData from appsync and dispatches it to the store
  try {
    const id = yield extractId();
    const userObj = yield API.graphql(graphqlOperation(getUser, { id: action.id })).then(
      response => response.data.getUser
    );
    const notificationsByUser = yield API.graphql(graphqlOperation(getNotificationsByUser, { userId: id })).then(
      response => response.data.getNotificationsByUser
    );
    yield put(saveNotifications(notificationsByUser));
    yield put(updateUser(userObj));
    yield window.location.href = `${window.location.origin}/`;
  } catch (e) {
    yield put(error(e));
  }
}

function* createUser(action) {
  const id = yield extractId(); // Save the user's Cognito identity ID

  const options = { // Build the request body
    id,
    firstName: action.data.firstName,
    lastName: ' ',
    email: action.data.email,
    spoken: action.data.languages.spoken,
    learning: action.data.languages.learning,
    contactMethods: JSON.stringify(action.data.contactMethods),
    description: action.data.description === '' ? ' ' : action.data.description,
    gender: action.data.gender,
    location: action.data.location,
  };

  try {
    const picBLob = yield fetch(action.data.picture.data.url)
          .then(response => response.blob())
          .then(response => response);

    yield Storage.put(`picture_${id}`, picBLob)
         .then((e) => e);

    yield API.graphql(graphqlOperation(putUser, options));

    yield put({ type: "UPDATE_USER_NEW_USER_DATA", id }); // Fetch user object from appsync and save it to the store
  } catch (e) {
    yield put(error(e));
  }
}

function* mySaga() {
  yield takeLatest("CREATE_USER", createUser);
  yield takeLatest("UPDATE_USER_NEW_USER_DATA", updateUserData);
}

export default mySaga;
