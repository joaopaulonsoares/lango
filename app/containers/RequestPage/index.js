/**
 *
 * RequestPage
 *  Only the id comes trough the router when a connection item is clicked
 *  This makes this.props.history.location.state prefilled with stuff
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import IdCard from 'components/IdCard/Loadable';
import AudioBox from 'components/AudioBox/Loadable';
import LanguageBox from 'components/LanguageBox/Loadable';

import ProfileCard from 'components/ProfileCard';
import RequestFooter from 'containers/RequestFooter';

import { API, graphqlOperation } from "aws-amplify";
import head from 'lodash/head';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { getFriendNotificationsByParent, deleteFriendRequestNotification } from '../../graphRequestTemplates';
import { makeSelectConnectedUserData } from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getUser,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  clearFriendNotification,
} from './actions';

export class RequestPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      userId: '',
    };
  }

  componentWillMount() {
    // Populate the store with the connected user's id ( check reducer )
    this.props.onGetUser(this.props.history.location.state.id);
    // On visit, delete the friendUserNotification
    const notificationId = this.props.history.location.state.notificationId;
    if (notificationId) {
      this.props.onClearNotification(notificationId);
    }
  }

  deleteFriendRequestNotification() {
    // Delete friendNotificationId
    API.graphql(graphqlOperation(getFriendNotificationsByParent)).then(response => {
      const notificationId = head(response.data.getFriendNotificationsByParentUserId).FriendNotificationId;
      if (notificationId) {
        API.graphql(graphqlOperation(deleteFriendRequestNotification, { notificationId }));
      }
    });
  }

  render() {
    const userData = this.props.connectedUserData.connectionUserData;

    return (
      <div>
        <ProfileCard>
          <IdCard {...userData} />
          <AudioBox {...userData} />
          <LanguageBox {...userData} />
        </ProfileCard>
        <RequestFooter
          requestType={this.props.location.state.type}
          requestId={this.props.history.location.state.friendRequestId}
          friendId={userData.id}
          acceptRequest={this.props.onAccept}
          rejectRequest={this.props.onReject}
          cancelRequest={this.props.onCancel}
          deleteNotification={this.deleteFriendRequestNotification}
        />
      </div>
    );
  }
}

RequestPage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.any,
  connectedUserData: PropTypes.object,
  onGetUser: PropTypes.any,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onCancel: PropTypes.func,
  onClearNotification: PropTypes.func,
  notificationId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  connectedUserData: makeSelectConnectedUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetUser: id => dispatch(getUser(id)),
    onAccept: (requestId, friendId) =>
      dispatch(acceptRequest(requestId, friendId)),
    onReject: requestId => dispatch(rejectRequest(requestId)),
    onCancel: requestId => dispatch(cancelRequest(requestId)),
    onClearNotification: notificationId => dispatch(clearFriendNotification(notificationId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'requestPage', reducer });
const withSaga = injectSaga({ key: 'requestPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(RequestPage);
