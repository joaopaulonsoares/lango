/*
 *
 * RequestPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_USER,
  SET_USER,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  CANCEL_REQUEST,
  CLEAR_FRIEND_NOTIFICATION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getUser(id) {
  return {
    type: GET_USER,
    id,
  };
}

export function setUser(userObj) {
  return {
    type: SET_USER,
    userObj,
  };
}

export function acceptRequest(requestId, friendId) {
  return {
    type: ACCEPT_REQUEST,
    requestId,
    friendId,
  };
}

export function rejectRequest(requestId) {
  return {
    type: REJECT_REQUEST,
    requestId,
  };
}

export function cancelRequest(requestId, notificationId) {
  return {
    type: CANCEL_REQUEST,
    requestId,
    notificationId,
  };
}

export function clearFriendNotification(notificationId) {
  return {
    type: CLEAR_FRIEND_NOTIFICATION,
    notificationId,
  };
}
