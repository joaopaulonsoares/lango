import { put, takeLatest } from "redux-saga/effects";
import { API, graphqlOperation } from "aws-amplify";

import partition from 'lodash/partition';

import { populateRecommended, error, saveNotifications } from "../App/actions";
import {
        getUser,
        getUsers,
        getReceivedFriendRequests,
        getSentFriendRequests,
        getNotificationsByUser } from '../../graphRequestTemplates';

import { languageAndLocationMatch, locationMatch, languageMatch } from './helpers';
import { extractId } from '../../utils/utilFuncs';

function* getNotifications() {
  const id = yield extractId();
  const notificationsByUser = yield API.graphql(graphqlOperation(getNotificationsByUser, { userId: id })).then(
    response => response.data.getNotificationsByUser
  );

  yield put((saveNotifications(notificationsByUser)));
}

function* getRecommendations() { // Loads UserData from appsync, filters it and then dispatches it to the store
  const id = yield extractId();
  const setIds = new Set([]);
  try {
    const userData = yield API.graphql(graphqlOperation(getUser, { id }))
                    .then(response => response.data.getUser);
    const allUsers = yield API.graphql(graphqlOperation(getUsers))
    .then(response => response.data.getUsers.items)
    .then(users => {
        // Get users into the right order (A : language and location Match , B : location match, C : language match)
      const myLocation = userData.location;
      const myGenderPreferences = (userData.preferences !== null && JSON.parse(userData.preferences).gender) ? JSON.parse(userData.preferences).gender : [];
      const myLearningLanguages = userData.learning;

      const [languageAndLocationGroup, restOfGroup] = partition(users, (user) => languageAndLocationMatch(user, myLearningLanguages, myLocation));
      const [locationGroup, restOfGroupB] = partition(restOfGroup, (user) => locationMatch(user, myLocation));
      const [languageGroup, restOfGroupC] = partition(restOfGroupB, (user) => languageMatch(user, myLearningLanguages));
      const nusers = [...languageAndLocationGroup, ...locationGroup, ...languageGroup, ...restOfGroupC];

        // Gender filtering
      const genderFiltered = nusers.filter(user => myGenderPreferences.indexOf(user.gender) > -1);

      // If user have no preferences, then all users are valid recommandations
      return myGenderPreferences.length > 0 ? genderFiltered : nusers;
    });

    // Get all friend requests and respective ids
    yield API.graphql(graphqlOperation(getReceivedFriendRequests, { id }))
      .then(response => response.data.getReceivedFriendRequests)
      .then((data) => {
        if (data.items.length > 0) {
          data.items.forEach((item) => {
            setIds.add(item.friendRequestId);
          });
        }
      }
    );

    /* Next step, we're using a set to make sure there's no duplicated in the list of users displayed */

    // Get the sent requests and connections requests from different locations
    yield API.graphql(graphqlOperation(getSentFriendRequests, { id }))
    .then(response => response.data.getSentFriendRequests)
    .then((data) => {
      if (data.items.length > 0) {
        data.items.forEach((item) => {
          item.receiverUser ? setIds.add(item.receiverUser.id) : null;
        });
      }
    });

    // Remove Friendships by adding them to the set
    yield API.graphql(graphqlOperation(getUser, { id }))
    .then(response => response.data.getUser.connections.items ? response.data.getUser.connections.items : [])
    .then((data) => {
      data.forEach((item) => {
        setIds.add(item.friendUserId);
      });
    }).catch((e) => put(error(e)));

    // Remove own own ID
    setIds.add(id);
    const recommandedUsers = [];

    // If user exist in Set, It will not be recommanded a recommended one
    allUsers.forEach((item) => {
      if (!setIds.has(item.id)) {
        recommandedUsers.push(item);
      }
    });
    recommandedUsers === undefined || recommandedUsers === [] ? null : yield put(populateRecommended(recommandedUsers));
  } catch (e) {
    yield put(error(e));
  }
}

function* mySaga() {
  yield takeLatest("GET_RECO", getRecommendations);
  yield takeLatest("GET_NOTIFICATIONS", getNotifications);
}

export default mySaga;
