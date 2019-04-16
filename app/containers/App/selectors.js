/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectHasNewMessage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('hasNewMessage')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectCurrentProfile = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentProfile').toJS()
);

const makeSelectRecommandedProfiles = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'recommandations']).toJS()
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectUserData = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userData').toJS()
);

const makeSelectConnections = () => createSelector(
  selectGlobal,
  // (globalState) => globalState.getIn(['userData', 'connections']).toJS()
  (globalState) => globalState.getIn(['userData', 'connections']).toJS()
);

const makeSelectUserRequests = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userRequests').toJS()
);

const makeSelectPreferences = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'preferences']) ? globalState.getIn(['userData', 'preferences']).toJS() : {}
);

const makeSelectContactMethods = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'contactMethods']) ? globalState.getIn(['userData', 'contactMethods']).toJS() : {}
);

const makeSelectNotifications = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('notifications').toJS()
);

const makeSelectFriendRequestNotifications = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('friendRequestNotifications').toJS()
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectCurrentProfile,
  makeSelectRecommandedProfiles,
  makeSelectUserData,
  makeSelectConnections,
  makeSelectPreferences,
  makeSelectUserRequests,
  makeSelectContactMethods,
  makeSelectHasNewMessage,
  makeSelectNotifications,
  makeSelectFriendRequestNotifications,
};
