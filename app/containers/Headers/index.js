/* stylelint-disable */

/**
 *
 * Headers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';

import IconManual from 'components/Icon';
import { ICONS } from 'components/Icon/ICONS';

import styled, { css } from 'styled-components';

import { makeSelectHasNewMessage, makeSelectNotifications, makeSelectLocation, makeSelectFriendRequestNotifications } from 'containers/App/selectors';

import { API, graphqlOperation } from "aws-amplify";
import { extractId } from "utils/utilFuncs";
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { hideNotification, saveNotifications } from "../App/actions";
import { subscribeToNewMessages } from '../../graphRequestTemplates';

import makeSelectHeaders from './selectors';

import reducer from './reducer';
import saga from './saga';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

const ChatIconAndDotHolder = styled.div`
  display: flex;
  position: relative;
`;

const RedDot = styled.div`
  height: 17px;
  width: 17px;
  background-color: red;
  border-radius: 50%;
  position : absolute;
  display : none;
  left: calc(50% + 2px);
  z-index: 99;
  border: 1px solid white;

  ${props => props.show && css`
    display: block;
  `};
`;

class Headers extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.removeIcon = this.removeIcon.bind(this);
    this.listenForMessages = this.listenForMessages.bind(this);
  }

  componentDidMount() {
    this.listenForMessages();
  }

  listenForMessages() {
    const myId = extractId();
    myId.then(id => {
      API.graphql(
      graphqlOperation(subscribeToNewMessages, { receiverId: id }))
      .subscribe({
        next: (noti) => {
          if (_.get(this, 'props.location.state.id') !== noti.value.data.subscribeToNewMessageByUser.conversationId) { // Check that we are not currently in the conversation that is receiving the message
            const oldNotification = JSON.parse(JSON.stringify(this.props.notifications));
            oldNotification.push(noti.value.data.subscribeToNewMessageByUser);
            this.props.dispatch(saveNotifications(oldNotification));
          }
        },
      });
    });
  }

  removeIcon() {
    this.props.dispatch(hideNotification());
  }

  render() {
    return (
      <div>
        <NavBar>
          <HeaderLink to="/settings">
            <IconManual icon={ICONS.SETTINGS} />
          </HeaderLink>
          <HeaderLink to="/profiles">
            <IconManual icon={ICONS.USERS} />
          </HeaderLink>
          <HeaderLink to="/chat" onClick={this.removeIcon}>
            <ChatIconAndDotHolder>
              <RedDot show={this.props.notifications.length > 0 || this.props.friendRequestNotifications.length > 0} />
              <IconManual icon={ICONS.CHAT} />
            </ChatIconAndDotHolder>
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

Headers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  friendRequestNotifications: PropTypes.array.isRequired,
  location: PropTypes.any.isRequired, // eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  headers: makeSelectHeaders(),
  hasNewMessage: makeSelectHasNewMessage(),
  notifications: makeSelectNotifications(),
  location: makeSelectLocation(),
  friendRequestNotifications: makeSelectFriendRequestNotifications(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'headers', reducer });
const withSaga = injectSaga({ key: 'headers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Headers);
