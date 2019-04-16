// import { take, call, put, select } from 'redux-saga/effects';
import { API, graphqlOperation } from "aws-amplify";
import { takeLatest } from "redux-saga/effects";
import { extractId } from "utils/utilFuncs";

import { CLEAR_NOTIFICATION_FOR_CONVERSATION } from 'containers/App/constants';

import { sendMessage,
  deleteNotification,
  addNotification,
  getNotificationsByConversation } from '../../graphRequestTemplates';


// If notification on conversation, delete it on the backend side
function* clearNotification(notification) {
  const notificationId = notification.notificationId;
  if (notificationId !== undefined && notificationId !== null) {
    yield API.graphql(graphqlOperation(deleteNotification, { notificationId }));
  }
}

function* onSendMessage(action) {
  const mySenderId = yield extractId();
  const message = {
    conversationId: action.id,
    content: action.content,
    senderId: mySenderId,
    receiverId: action.receiverId,
  };

  const notification = {
    conversationId: action.id,
    userId: action.receiverId,
  };

  yield API.graphql(graphqlOperation(sendMessage, message));
  // If conversation already have  notification, no need to add one
  const notifications = yield API.graphql(graphqlOperation(getNotificationsByConversation, { conversationId: action.id }))
    .then(response => response.data.getNotificationsByConversation);

  if (notifications.length === 0) {
    yield API.graphql(graphqlOperation(addNotification, notification));
  }
}

export default function* defaultSaga() {
  yield takeLatest("SEND_MESSAGE", onSendMessage);
  yield takeLatest(CLEAR_NOTIFICATION_FOR_CONVERSATION, clearNotification);
}
