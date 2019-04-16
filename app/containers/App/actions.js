/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  ADD_ERROR,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  UPDATE_USER_INFO,
  LOAD_USER,
  BROWSE_RIGHT,
  BROWSE_LEFT,
  SIGN_OUT,
  SET_RECOMMENDED_USERS,
  REMOVE_RECOMENDED,
  SET_USER_REQUESTS,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  FLAG_CONVERSATION,
  SAVE_NOTIFICATIONS,
  CLEAR_NOTIFICATION_FOR_CONVERSATION,
  CLEAR_CONVERSATION,
  SAVE_CONVERSATIONS,
  SAVE_FRIEND_REQUEST_NOTIFICATIONS,
} from "./constants";

export function browseRight() {
  return {
    type: BROWSE_RIGHT,
  };
}

export function browseLeft() {
  return {
    type: BROWSE_LEFT,
  };
}

export function loadUser() {
  return {
    type: LOAD_USER,
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(e) {
  return {
    type: LOAD_REPOS_ERROR,
    error: e,
  };
}

export function error(e) {
  return {
    type: ADD_ERROR,
    e,
  };
}

export function updateUser(userObj) {
  return {
    type: UPDATE_USER_INFO,
    userObj,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function populateRecommended(userList) {
  return {
    type: SET_RECOMMENDED_USERS,
    users: userList,
  };
}

export function removeRecomendedUser(id) {
  return {
    type: REMOVE_RECOMENDED,
    id,
  };
}

export function setUserRequests(requests) {
  return {
    type: SET_USER_REQUESTS,
    requests,
  };
}

export function showNotification() {
  return {
    type: SHOW_NOTIFICATION,
  };
}

export function hideNotification() {
  return {
    type: HIDE_NOTIFICATION,
  };
}

export function saveNotifications(notifications) {
  return {
    type: SAVE_NOTIFICATIONS,
    notifications,
  };
}

export function saveConversations(conversations) {
  return {
    type: SAVE_CONVERSATIONS,
    conversations,
  };
}

export function flagConversation(conversationId) {
  return {
    type: FLAG_CONVERSATION,
    conversationId,
  };
}

export function clearNotificationForConversation(notificationId) {
  return {
    type: CLEAR_NOTIFICATION_FOR_CONVERSATION,
    notificationId,
  };
}

export function clearConversation(conversation) {
  return {
    type: CLEAR_CONVERSATION,
    conversation,
  };
}

export function saveFriendUserNotifications(notifications) {
  return {
    type: SAVE_FRIEND_REQUEST_NOTIFICATIONS,
    notifications,
  };
}
