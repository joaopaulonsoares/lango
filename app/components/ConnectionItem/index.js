/**
*
* ConnectionItem
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
    align-content: baseline;
    align-items: baseline;
    justify-content: left;
`;

const NameTitle = styled.div`
  color: #000000;
  font-weight: bold;
  text-align: justify;
  margin-bottom: -15px;
`;

const Message = styled.div`
  opacity: 0.5;
  color: #000000;
  font-family: "Open Sans";
  font-size: 16px;
  font-style: italic;
  line-height: 22px;
`;

const HandshakeStatus = styled.div`
  opacity: 0.5;
  color: #000000;
  font-family: "Open Sans";
  font-size: 16px;
  font-style: italic;
  line-height: 20px;
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

class ConnectionItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Box
        onClick={() => this.props.history.push({
          pathname: `request`,
          state: {
            id: this.props.item.id,
            type: this.props.item.type,
            friendRequestId: this.props.item.friendRequestId,
            notificationId: this.props.friendNotification ? this.props.friendNotification.FriendNotificationId : null,
          },
        })}
      >
        <ProfilePicture id={this.props.item.id} />
        <div>
          { this.props.hasFriendNotification && (<RedCircle />) }
        </div>
        <ColumnWrapper>
          <NameTitle> {this.props.item.firstName} </NameTitle>
          <HandshakeStatus> { this.props.item.type === 'sent' && <p> Ei ole vielä vastannut pyyntöösi </p> } </HandshakeStatus>
          <HandshakeStatus> { this.props.item.type === 'received' && <p> Odottaa vastaustasi </p> } </HandshakeStatus>
          <Message> {this.props.item.message} </Message>
        </ColumnWrapper>
      </Box>
    );
  }
}

ConnectionItem.propTypes = {
  item: PropTypes.object.isRequired,
  history: PropTypes.any.isRequired,
  hasFriendNotification: PropTypes.bool.isRequired,
  friendNotification: PropTypes.object,
};

export default withRouter(ConnectionItem);
