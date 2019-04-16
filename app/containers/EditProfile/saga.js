import { takeLatest, select, put } from "redux-saga/effects";

import { SAVE_USER, DELETE_USER } from "containers/App/constants";

import { makeSelectUserData, makeSelectNotifications } from "containers/App/selectors";
import { makeSelectUserDataChanges } from "containers/EditProfile/selectors";
import { API, Storage, graphqlOperation } from "aws-amplify";

import { extractId } from "utils/utilFuncs";

import {
  putUser,
  putUserPreferences,
  deleteUser,
  getReceivedFriendRequests,
  getSentFriendRequests,
  deleteFriendRequests,
  deleteConnections,
  getFriendshipsWhereNotParent,
  getFriendRequestNotifications,
  deleteFriendRequestNotification,
  deleteNotification,
  getFriendNotificationsByParent,
} from "../../graphRequestTemplates";
import { error, updateUser, signOut } from "../App/actions";

export function* saveUser() {
  const userData = yield select(makeSelectUserData());
  const userDataChanges = yield select(makeSelectUserDataChanges());
  const userId = yield extractId();
  const mergedUserData = { id: userId, ...userData, ...userDataChanges };
  // Special treatement for these, thanks to dynamoDB for not allowing empty strings on json
  const contactMethods = mergedUserData.contactMethods
    ? JSON.stringify(mergedUserData.contactMethods)
    : "";

  const learning = mergedUserData.learning.filter(language => language !== '');
  const spoken = mergedUserData.spoken.filter(language => language !== '');

  const newMergedUserData = { ...mergedUserData, contactMethods, learning, spoken };
  delete newMergedUserData.preferences; // Remove prefereces, because we don't care about them here.
  // Update Backend
  // Now we reset the preferences because putUser overwrites them.
  try {
    yield API.graphql(graphqlOperation(putUser, newMergedUserData));
    yield API.graphql(
      graphqlOperation(putUserPreferences, {
        id: userData.id,
        preferences: JSON.stringify(userData.preferences),
      })
    );
  } catch (e) {
    yield put(error(e));
  }
  // Update the store
  yield put(updateUser(newMergedUserData));
  yield window.location.href = `${window.location.origin}/`;
}

export function* deleteUserRequest() {
  const userId = yield extractId();
  const user = yield select(makeSelectUserData());
  const notifications = yield select(makeSelectNotifications());

  // Get notifications by conversations
  if (notifications && notifications.length > 0) {
    notifications.map(notification => {
      const notificationId = notification.notificationId;
      API.graphql(graphqlOperation(deleteNotification, { notificationId }));
      return null;
    });
  }

  // Map of the notifications ids and delete them

  // Delete received user notifications
  yield API.graphql(graphqlOperation(getFriendRequestNotifications)).then(response => {
    response.data.getFriendNotificationsByUser.forEach(item => {
      API.graphql(graphqlOperation(deleteFriendRequestNotification, { notificationId: item.FriendNotificationId }));
    });
  });

  // Delete sent friend request notification
  yield API.graphql(graphqlOperation(getFriendNotificationsByParent)).then(response => {
    response.data.getFriendNotificationsByParentUserId.forEach(item => {
      API.graphql(graphqlOperation(deleteFriendRequestNotification, { notificationId: item.FriendNotificationId }));
    });
  });

  // Delete profile pic and audio
  yield Storage.remove(`picture_${userId}`);
  yield Storage.remove(`audio_${userId}`);

  const { connections } = user;
  const ids = [];
  connections.items.map(item => ids.push(item.connectionId));
  // Rest of profile deletion
  const getSentRequests = yield API.graphql(
    graphqlOperation(getSentFriendRequests, { id: userId })
  );

  const getReceivedRequests = yield API.graphql(
    graphqlOperation(getReceivedFriendRequests, { id: userId })
  );

  const getWhereNotParent = yield API.graphql(
    graphqlOperation(getFriendshipsWhereNotParent, { id: userId })
  );

  // This is a bit messy. In here we get users connections to other friends
  // and from those friends we go trough all of their friendconnections and check
  // if our current user has connection and all of those connection id's are returned.
  getWhereNotParent.data.getUser.connections.items.map(item =>
    item.friend.map(friend =>
      friend.connections.items.map(fc => {
        if (fc.friendUserId === userId) {
          ids.push(fc.connectionId);
          return fc.connectionId;
        }
        return null;
      })
    )
  );
  if (ids.length > 0) {
    yield API.graphql(graphqlOperation(deleteConnections, { ids }));
  }

  const sentIds = getSentRequests.data.getSentFriendRequests.items.map(
    item => item.friendRequestId
  );

  if (sentIds.length > 0) {
    API.graphql(graphqlOperation(deleteFriendRequests, { ids: sentIds }));
  }

  // Delete received friendRequests
  const receivedIds = getReceivedRequests.data.getReceivedFriendRequests.items.map(
    item => item.friendRequestId
  );

  if (receivedIds.length > 0) {
    API.graphql(graphqlOperation(deleteFriendRequests, { ids: receivedIds }));
  }

  // Delete user from UserTable
  yield API.graphql(graphqlOperation(deleteUser, { id: userId }));

  yield put(signOut());
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js

  yield takeLatest(SAVE_USER, saveUser);
  yield takeLatest(DELETE_USER, deleteUserRequest);
}
