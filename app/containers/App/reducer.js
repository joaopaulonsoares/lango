/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { Auth } from 'aws-amplify';
import { CHANGE_CONTACT_METHODS } from 'containers/EditProfile/constants';

import reject from 'lodash/reject';

import {
  ADD_ERROR,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  UPDATE_USER_INFO,
  BROWSE_RIGHT,
  BROWSE_LEFT,
  SIGN_OUT,
  SET_RECOMMENDED_USERS,
  SAVE_USER_SUCCESS,
  REMOVE_RECOMENDED,
  SET_CONNECTIONS,
  SET_USER_REQUESTS,
  CHANGE_DISTANCE_PREFERENCE,
  CHANGE_GENDER_PREFERENCE,
  SAVE_NOTIFICATIONS,
  CLEAR_NOTIFICATION_FOR_CONVERSATION,
  SAVE_CONVERSATIONS,
  SAVE_FRIEND_REQUEST_NOTIFICATIONS,
} from "./constants";


// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: [],
  currentUser: false,
  userData: { preferences: { gender: [] } },
  notifications: [],
  hasNewMessage: false,
  recommendedUsers: [{}],
  currentProfile: { loading: true }, // Used to know the diffrence between loading and empty recommendations array.
  userRequests: [{}],
  friendRequestNotifications: [],
});

function appReducer(state = initialState, action) {
  const jsState = state.toJS();
  switch (action.type) {
    case BROWSE_RIGHT:
      if (jsState.currentProfile.index < jsState.recommendedUsers.length - 1) { // Check if the user is going to navigate out of bounds (e.g. index will be larger than user array)
        return state.set("currentProfile",
                        fromJS({ // To keep immutable convert the merged object to immutable. Merge is needed to add the index of the user
                          ...jsState.recommendedUsers[jsState.currentProfile.index + 1], // Spread ('make a copy') the object of the next user to be displayed. (current index + 1)
                          ...{ index: jsState.currentProfile.index + 1 }, // Index is needed when figuring out which user object will be next
                        }));
      }
      return state;

    case BROWSE_LEFT:
      if (jsState.currentProfile.index > 0) {
        return state.set("currentProfile", // Same deal as above, but this time we're subtracting because user is going left.
                        fromJS({
                          ...jsState.recommendedUsers[jsState.currentProfile.index - 1],
                          ...{ index: jsState.currentProfile.index - 1 },
                        }));
      }
      return state;

    case SET_RECOMMENDED_USERS:
      if (action.users.length > 0) {
        return state
             .set('recommendedUsers', fromJS(action.users))
             .set('currentProfile', fromJS(action.users[0]))
             .setIn(['currentProfile', 'index'], 0);
      }
      return state
            .set('currentProfile', fromJS({ loading: false }));

    case SAVE_USER_SUCCESS:
      return state
        .setIn(['userData', 'firstName'], action.firstName)
        .setIn(['userData', 'lastName'], action.lastName)
        .setIn(['userData', 'email'], action.email);

    case LOAD_REPOS:
      return state
        .set("loading", true)
        .set("error", false)
        .setIn(["userData", "repositories"], false);

    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(["userData", "repositories"], action.repos)
        .set("loading", false)
        .set("currentUser", action.username);

    case LOAD_REPOS_ERROR:
      return state.set("error", action.error).set("loading", false);
    case UPDATE_USER_INFO:
      // Hacky way to make sure that the preferences are correctly stored in Redux
      if (action.userObj.preferences) {
        return state.set('userData', fromJS(action.userObj))
                    .setIn(['userData', 'preferences'], fromJS(JSON.parse(action.userObj.preferences)))
                    .setIn(['userData', 'contactMethods'], fromJS(JSON.parse(action.userObj.contactMethods)));
      }
      return state.set('userData', fromJS(action.userObj))
                  .setIn(['userData', 'contactMethods'], fromJS(JSON.parse(action.userObj.contactMethods)));

    case SIGN_OUT:
      if (window.FB.getAccessToken()) {
        window.FB.logout(() => {
          Auth.signOut();
          window.location.href = `${window.location.origin}/`;
        });
      } else {
        Auth.signOut().then(() => { window.location.href = `${window.location.origin}/`; });
      }
      return state;
    case ADD_ERROR:
      return state.update("error", arr => arr.push(action.e));
    case REMOVE_RECOMENDED:
      return state
              .set("currentProfile",
              fromJS({ // To keep immutable convert the merged object to immutable. Merge is needed to add the index of the user
                ...jsState.recommendedUsers[ // Set current profile to be next on right UNLESS we're already at the last profile. If this is a case set previous profile as current.
                  (jsState.currentProfile.index + 1 === jsState.recommendedUsers.length)
                   ? jsState.currentProfile.index - 1
                   : jsState.currentProfile.index + 1
                ],
                ...{ index: jsState.currentProfile.index }, // Because new 'currentProfile' replaces the one that's being removed, keep the index same.
              }))
             .set('recommendedUsers',
             fromJS(jsState.recommendedUsers.filter(entry => entry.id !== action.id))); // Filter out wanted user by id

    case SET_CONNECTIONS:
      return state.set("connections", fromJS(action.connections));

    case SET_USER_REQUESTS:
      return state.set("userRequests", fromJS(action.requests));

    case CHANGE_DISTANCE_PREFERENCE:
      if (state.getIn(['userData', 'preferences']) === null) {
        return state.setIn(['userData', 'preferences'], fromJS({ distance: action.distance }));
      }
      return state.setIn(['userData', 'preferences', 'distance'], fromJS(action.distance));

    case CHANGE_GENDER_PREFERENCE:
      if (state.getIn(['userData', 'preferences']) === null) {
        return state.setIn(['userData', 'preferences'], fromJS({ gender: action.gender }));
      }
      return state.setIn(['userData', 'preferences', 'gender'], fromJS(action.gender));

    case CHANGE_CONTACT_METHODS:
      return state.setIn(['userData', 'contactMethods'], fromJS(action.contactMethods));

    case SAVE_CONVERSATIONS:
      return state.setIn(['userData', 'connections'], fromJS(action.conversations));

    case SAVE_NOTIFICATIONS:
      return state.set('notifications', fromJS(action.notifications));

    case CLEAR_NOTIFICATION_FOR_CONVERSATION: {
      const notifications = state.toJS().notifications;
      const newNotifications = reject(notifications, e => e.notificationId === action.notificationId);
      return state.set('notifications', fromJS(newNotifications));
    }

    case SAVE_FRIEND_REQUEST_NOTIFICATIONS:
      return state.set('friendRequestNotifications', fromJS(action.notifications));

    default:
      return state;
  }
}

export default appReducer;
