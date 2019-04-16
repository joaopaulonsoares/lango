import { put, takeLatest } from "redux-saga/effects";
import { API, graphqlOperation } from "aws-amplify";

import { extractId } from "utils/utilFuncs";

import { error, setUserRequests, saveNotifications, saveConversations } from "../App/actions";

import { getReceivedFriendRequests,
          getSentFriendRequests,
          getNotificationsByUser,
          getFriendshipsWhereNotParent,
           } from '../../graphRequestTemplates';


function* loadRequests() { // Load UserData from appsync and dispatches it to the store
  try {
    const id = yield extractId();
    const receivedFriendRequests = yield API.graphql(graphqlOperation(getReceivedFriendRequests, { id })).then(
      response => response.data
    );

    // Get the sent requests and connections requests from different locations
    const sentFriendRequests = yield API.graphql(graphqlOperation(getSentFriendRequests, { id })).then(
      response => response.data
    );

    const connections = { received: receivedFriendRequests.getReceivedFriendRequests.items,
      sent: sentFriendRequests.getSentFriendRequests.items };

    // Structure them for UI Purpose, add the type
    const receiverUsers = connections.received.map(item => ({ ...item.senderUser, type: 'received', friendRequestId: item.friendRequestId }));

    // console.info("RequestSent", receiverUsers);

    const sentToUsers = connections.sent.map(item => ({ ...item.receiverUser, type: 'sent', friendRequestId: item.friendRequestId }));

    // console.info("RequestReceived", sentToUsers);

    const requestsUsers = [...sentToUsers, ...receiverUsers];

    // console.info(requestsUsers);

    yield put(setUserRequests(requestsUsers));
  } catch (e) {
    yield put(error(e));
  }
}

function* loadConversations() { // Loads UserData from appsync and dispatches it to the store
  try {
    const id = yield extractId();
    const conversations = yield API.graphql(graphqlOperation(getFriendshipsWhereNotParent, { id })).then(
      response => response.data.getUser.connections
    );
    yield put(saveConversations(conversations));
  } catch (e) {
    yield put(error(e));
  }
}

function* getNotifications() {
  const id = yield extractId();

  const notificationsByUser = yield API.graphql(graphqlOperation(getNotificationsByUser, { userId: id })).then(
    response => response.data.getNotificationsByUser
  );


  yield put((saveNotifications(notificationsByUser)));
}

function* sendNotification(data) {
  return data;
  // console.info(data);
  /* const addedNotification = yield API.graphql(graphqlOperation(
    addNotification, { userId: id, conversationId: "123" })).then(
    response => response.data
  ).catch(e => console.error(e)); */
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest("GET_CONVERSATIONS", loadConversations);
  yield takeLatest("GET_FRIEND_REQUESTS", loadRequests);
  yield takeLatest("GET_NOTIFICATIONS", getNotifications);
  yield takeLatest("SEND_NOTIFICATION", sendNotification);
}
