/**
*
* ChatItem
*
*/

import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import ProfilePicture from 'containers/ProfilePicture';

import { withRouter } from 'react-router-dom';

const Box = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.5em;
    position: relative;
  `;

const ColumnWrapper = styled.div`
    margin: 1em;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
`;

const Message = styled.div`
  opacity: 0.85;
  color: #000000;
  font-family: "Open Sans";
  font-size: 16px;
  font-style: italic;
  line-height: 22px;
  text-align: justify;
`;

const RedCircle = styled.span `
  height: 25px;
  width: 25px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  z-index: 5;
  position: absolute;
  top: 10px;
  left: 93px;
  border: 3px solid white;
`;

class ChatItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const firstName = this.props.item.friend[0].firstName;
    const conversationId = this.props.item.conversationId;
    const id = this.props.item.friendUserId;

    return (
      <Box
        onClick={() => this.props.history.push({
          pathname: `conversation/${conversationId}`,
          state: {
            id: conversationId,
            receiverId: this.props.item.friendUserId,
            notificationId: this.props.notification ? this.props.notification.notificationId : null,
          },
        })}
      >
        <ProfilePicture id={id} />
        <div>
          { this.props.hasNotification && (<RedCircle />) }
        </div>
        <div>
          <ColumnWrapper>
            <nameTitle> {firstName} </nameTitle>
            <Message> </Message>
          </ColumnWrapper>
        </div>
      </Box>
    );
  }
}

ChatItem.propTypes = {
  item: PropTypes.object.isRequired,
  history: PropTypes.any,
  hasNotification: PropTypes.bool,
  notification: PropTypes.object,
};

export default withRouter(ChatItem);
