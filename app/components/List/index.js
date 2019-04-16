/*
  ListComponent
  HackAlert:
  If an item is included, it's use for the rendering
  If not, a random one is generated
*/


import React from 'react';
import PropTypes from 'prop-types';

import some from 'lodash/some';
import find from 'lodash/find';

import Ul from './Ul';
import Wrapper from './Wrapper';


function hasNotification(notifications, conversationId) {
  return some(notifications, ['conversationId', conversationId]);
}

function findNotification(notifications, conversationId) {
  return find(notifications, ['conversationId', conversationId]);
}

function hasFriendNotification(friendNotifications, friendUserId) {
  return some(friendNotifications, ['parentUserId', friendUserId]);
}

function findFriendNotification(friendNotifications, friendUserId) {
  return find(friendNotifications, ['parentUserId', friendUserId]);
}

function List(props) {
  const ComponentToRender = props.component;
  let content = (<div></div>);

  if (props.items) {
    /* console.info("testing LIST");
    console.info(props.items);
    console.info(props.friendRequestNotifications); */
    content = props.items.map((item) => (
      <ComponentToRender
        key={item.id}
        item={item}
        hasNotification={hasNotification(props.notifications, item.conversationId)}
        hasFriendNotification={hasFriendNotification(props.friendRequestNotifications, item.id)}
        notification={findNotification(props.notifications, item.conversationId)}
        friendNotification={findFriendNotification(props.friendRequestNotifications, item.id)}
      />
    ));
  } else {
    // Otherwise render a single component
  }

  return (
    <Wrapper>
      <Ul>
        {content}
      </Ul>
    </Wrapper>
  );
}

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array,
  notifications: PropTypes.array,
  friendRequestNotifications: PropTypes.array,
};

export default List;
