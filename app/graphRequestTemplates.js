export const getUser = `query($id: String!) {
                        getUser(id: $id)
                        {
                          id,
                          firstName,
                          lastName,
                          email,
                          gender,
                          contactMethods,
                          profilePictureURl,
                          location,
                          description,
                          spoken,
                          preferences,
                          learning,
                          connections {
                            items {
                              connectionId
                              conversationId
                              friendUserId
                              friend {
                                firstName
                                profilePictureURl
                              }
                            }
                          }
                        }
                      }`;

export const putUser = `mutation($id: String!, $firstName: String!, $email: AWSEmail, $gender: String,
                                 $description: String, $location: String, $spoken: [String], $learning: [String], $contactMethods: AWSJSON) 
                        {
                        putUser(id: $id, firstName: $firstName, email: $email, gender : $gender,
                           description: $description, location: $location, spoken: $spoken, learning: $learning, contactMethods: $contactMethods) {
                          id
                         }
                      }`;

export const putUserPreferences = `mutation($id: String!, $preferences: AWSJSON) {
                        putUserPreferences(id: $id, preferences: $preferences) {
                          id
                          preferences
                         }
                      }`;

export const putFriendRequest = `mutation($senderId: ID!, $receiverId: ID!, $status: FriendshipStatus!) {
                                  putFriendRequest(senderId: $senderId, receiverId: $receiverId, status: $status) {
                                    friendRequestId
                                    }
                                }`;

export const getUsers = `query {
                          getUsers(limit: "500") {
                            items {
                              id: id
                              firstName,
                              lastName,
                              email,
                              contactMethods,
                              profilePictureURl,
                              location,
                              description,
                              spoken,
                              learning,
                              gender,
                              preferences,
                            }
                          }
                        }`;

export const getReceivedFriendRequests = `query($id: String!) {
  getReceivedFriendRequests(id: $id) {
    items {
      friendRequestId,
      senderId,
      senderUser{
        id
        firstName
        lastName
        location
        profilePictureURl
        audioURl
        contactMethods
        spoken
        learning
      }
      receiverId,
      status,
    }
}
}`;

export const getSentFriendRequests = `
query($id: String!) {
  getSentFriendRequests(id: $id) {
items {
  friendRequestId,
  senderId,
  receiverUser {
      id
      firstName
      lastName
      location
      profilePictureURl
      audioURl
      contactMethods
      spoken
      learning
    }
  }
}
}
`;

export const getConversation = `
query($conversationId: String!) {
  getConversation(conversationId: $conversationId) {
    messages {
      messageId
      content
      senderId
      receiverId
      sentDate
    }
  }
}
`;

export const sendMessage = `
mutation($content: String!, $senderId: String!, $conversationId: String!, $receiverId: String ) {
  sendMessage (content: $content, senderId: $senderId, conversationId: $conversationId, receiverId: $receiverId ) {
    content
    messageId
    senderId
    conversationId
    receiverId
  }
}
`;

export const newMessageSub = `subscription ($conversationId: String!) {
  subscribeToNewMessages(conversationId : $conversationId) {
    content
    messageId
    senderId
    conversationId
  }
}`;

export const createConversation = `mutation {
  createConversation {
    conversationId
  }
}`;

export const putFriendship = `mutation ($parentUserId: ID!, $friendUserId: ID!, $conversationId: String!) {
  putFriendship (parentUserId: $parentUserId, friendUserId: $friendUserId, conversationId: $conversationId) {
    conversationId
  }
}`;

export const removeConversation = ``;

export const cancelFriendRequest = `mutation ($friendRequestId: String!) {
  cancelFriendRequest(friendRequestId : $friendRequestId) {
    friendRequestId
  }
}
`;

export const deleteUser = `mutation ($id: ID!) {
  deleteUser(id: $id) {
    id
   }
}`;


export const deleteConnections = `
mutation ($ids : [String]!) {
    deleteConnections (ids : $ids) {
        items {
            friendUserId
        }
    }
}
`;

export const deleteFriendRequests = `
mutation ($ids : [String]!) {
    deleteFriendRequests (ids : $ids) {
        friendRequestId
    }
}
`;

export const subscribeToNewMessages = `
subscription ($receiverId : String!) {
  subscribeToNewMessageByUser (receiverId: $receiverId) {
    content
    receiverId
    senderId
    sentDate
  }
} `;

export const addNotification = `
mutation addNotification ($conversationId: String, $userId: String) {
  addNotification(conversationId: $conversationId, userId: $userId) {
    notificationId
    conversationId
    userId
  }
}
`;

export const deleteNotification = `
mutation deleteNotification ($notificationId: String) {
  deleteNotification(notificationId: $notificationId) {
    notificationId
    conversationId
    userId
  }
}
`;

export const getNotificationsByUser = `
query getNotificationsByUser($userId: String) {
  getNotificationsByUser(userId: $userId) {
    notificationId
    conversationId
    userId
  }
}
`;


export const getNotificationsByConversation = `
query getNotificationsByConversation($conversationId: String) {
  getNotificationsByConversation(conversationId: $conversationId) {
    notificationId
    conversationId
    userId
  }
}
`;

export const getFriendshipsWhereNotParent = `
query getUser($id: String!) {
  getUser(id: $id) {
   connections {
    items {
      connectionId 
      parentUserId 
      friendUserId 
      conversationId
      friend {
        id 
        firstName
        connections {
          items {
            connectionId
            parentUserId
            friendUserId
            conversationId
          }
        }
      }
    }
  }
 }
}
`;

export const getFriendRequestNotifications = `
query getFriendNotificationsByUser {
  getFriendNotificationsByUser {
    FriendNotificationId
    parentUserId
    receiverId
  }
}
`;

export const deleteFriendRequestNotification = `
mutation deleteFriendRequestNotification ($notificationId: String) {
  deleteFriendRequestNotification(notificationId: $notificationId) {
    FriendNotificationId
  }
}
`;

export const addFriendRequestNotification = `
mutation addFriendRequestNotification ($receiverId: String){
  addFriendRequestNotification (receiverId: $receiverId){
    FriendNotificationId
    receiverId
  }
}
`;

export const deleteFriendRequestNotifications = `
mutation deleteFriendRequestNotifications ($ids : [String]) {
  deleteFriendRequestNotifications (ids : $ids){
    FriendNotificationId
  }
}
`;

export const getFriendNotificationsByParent = `
query getFriendNotificationsByParentUserId {
  getFriendNotificationsByParentUserId {
    FriendNotificationId
  }
}
`;
