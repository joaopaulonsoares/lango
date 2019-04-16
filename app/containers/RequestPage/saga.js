import { put, takeLatest } from 'redux-saga/effects';
import { API, graphqlOperation } from "aws-amplify";
import { extractId } from "utils/utilFuncs";

import { GET_USER,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  CANCEL_REQUEST,
  CLEAR_FRIEND_NOTIFICATION } from './constants';

import { error } from "../App/actions";
import { setUser } from './actions';
import { getUser, cancelFriendRequest, createConversation, putFriendship, deleteFriendRequestNotification, addNotification } from '../../graphRequestTemplates';

/**
 * User Data request/response
 */
function* getUserData(action) {
  const userId = yield action.id;

  try {
    const userObj = yield API.graphql(graphqlOperation(getUser, { id: userId })).then(
      response => response.data.getUser
    );
    yield put(setUser(userObj));
  } catch (e) {
    // console.error(e);
    yield put(error(e));
  }
}

function* cancelRequest(action) {
  const fId = action.requestId;
  // Send request to the backend
  try {
    yield API.graphql(graphqlOperation(cancelFriendRequest, { friendRequestId: fId })).then(
      response => response.data
    );
    // console.info("Cancelled");
  } catch (e) {
    yield put(error(e));
  }
  // Redirect to chat container
  window.location.href = `${window.location.origin}/`;
}

function* acceptRequest(action) {
  // Create a conversation and store in a const
  const friendId = action.friendId;

  const conversationId = yield API.graphql(graphqlOperation(createConversation)).then(
      response => response.data.createConversation.conversationId
  );

  const options = {
    conversationId,
    parentUserId: yield extractId(), // Extract the cognito ID from amplify,
    friendUserId: friendId,
  };

  const options2 = {
    conversationId,
    friendUserId: yield extractId(),
    parentUserId: friendId,
  };

  // Send a notification about the new conversation
  yield API.graphql(graphqlOperation(addNotification, { conversationId, userId: friendId }));

  // Use the conversation's ID to create the friendship, twice, for both users
  // First FriendShip with initial parentId being the actual user of the app
  try {
    yield API.graphql(graphqlOperation(putFriendship, options)).then(
      response => response.data
    );
  } catch (e) {
    yield put(error(e));
  }

  // Second FriendShip with initial parentId being the actual user of the app
  try {
    yield API.graphql(graphqlOperation(putFriendship, options2)).then(
      response => response.data
    );
  } catch (e) {
    yield put(error(e));
  }

  // Cancel the friendRequest
  yield cancelRequest(action);
  window.location.href = `${window.location.origin}/`;
}

function* clearFriendNotification(data) {
  const notificationId = data.notificationId;
  try {
    if (notificationId) {
      yield API.graphql(graphqlOperation(deleteFriendRequestNotification, { notificationId })).then(
        response => response.data
      );
      yield put({ type: "GET_FRIEND_REQUESTS_NOTIFICATIONS" });
    }
  } catch (e) {
    yield put(error(e));
  }
}

// Gets individual actions
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_USER, getUserData);
  yield takeLatest(CANCEL_REQUEST, cancelRequest);
  yield takeLatest(ACCEPT_REQUEST, acceptRequest);
  yield takeLatest(REJECT_REQUEST, cancelRequest);
  yield takeLatest(CLEAR_FRIEND_NOTIFICATION, clearFriendNotification);
}
