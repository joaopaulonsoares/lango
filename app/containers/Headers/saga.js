import { takeLatest, put } from 'redux-saga/effects';

import { CLEAR_CONVERSATION } from 'containers/App/constants';
import { API, graphqlOperation } from "aws-amplify";
import { clearNotificationForConversation } from "containers/App/actions";

import { extractId } from "../../utils/utilFuncs";
import { getNotificationsByConversation, deleteNotification } from '../../graphRequestTemplates';


function* clearConversation(action) {
  // Init
  const myId = yield extractId();
  const conversationId = action.conversation;
  // Get notifications for a given conversation
  const notifications = yield API.graphql(graphqlOperation(
    getNotificationsByConversation,
    { conversationId }))
  .then(response => response.data.getNotificationsByConversation);
  if (notifications.length > 0 && notifications[0].userId === myId) {
    const notification = notifications[0];
    const notificationId = notification.notificationId;

    yield API.graphql(graphqlOperation(deleteNotification, { notificationId: notification.notificationId }));

    yield put(clearNotificationForConversation(notificationId));
  }
}

function* mySaga() {
  yield takeLatest(CLEAR_CONVERSATION, clearConversation);
}

export default mySaga;
