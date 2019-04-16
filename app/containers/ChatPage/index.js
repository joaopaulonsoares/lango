/**
 *
 * ChatPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import { ChatBox } from 'containers/ChatBox';

import styled from 'styled-components';

/* Icons */
import Icon from 'react-icons-kit';
import { handshakeO } from 'react-icons-kit/fa/handshakeO';
import { bubble2 } from 'react-icons-kit/icomoon/bubble2';

import ConnectionItem from 'components/ConnectionItem/Loadable';
import ChatItem from 'components/ChatItem/Loadable';
import List from 'components/List';

import { makeSelectUserData,
        makeSelectUserRequests,
        makeSelectNotifications,
        makeSelectFriendRequestNotifications } from 'containers/App/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import 'rodal/lib/rodal.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import reducer from './reducer';
import saga from './saga';

const RedDot = styled.div`
  height: 17px;
  width: 17px;
  background-color: red;
  border-radius: 50%;
  left: calc(50% + 2px);
  z-index: 99;
  border: 1px solid white;
`;

const HeaderTabs = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
  `;

const IconTab = styled(Tab)`
  cursor: pointer;
  list-style: none;
  background: none;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0px;
  color: #b7b7b7;
  border-bottom: 2px solid rgba(255, 0, 0, 0);
  
  &.selected-tab {
    border-bottom: 2px solid #3c8fde;
    color: black;
    
    svg {
      color: #348DDE;
    }
  }

  svg {
    color: #B7B7B7;
  }
`;

const IconLabel = styled.div`
  font-weight: bold;
  padding-left: 10px;
`;

IconTab.tabsRole = 'Tab';

export class ChatPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.getFriendRequests();
    this.props.getConversations();
  }

  render() {
    const { friendRequests } = this.props;
    const connections = this.props.userData.connections || [];
    return (
      <div>
        <Helmet>
          <title>ChatPage</title>
          <meta name="description" content="" />
        </Helmet>

        <Tabs selectedTabClassName="selected-tab">
          <TabList>
            <HeaderTabs>
              <IconTab>
                <Icon
                  icon={bubble2}
                  size={20}
                />
                <IconLabel>Keskustelut</IconLabel>
                {this.props.notifications.length > 0 && <RedDot />}
              </IconTab>
              <IconTab>
                <Icon
                  icon={handshakeO}
                  size={20}
                />
                <IconLabel>Yhteydet</IconLabel>
                {this.props.friendRequestNotifications.length > 0 && <RedDot />}
              </IconTab>
            </HeaderTabs>
          </TabList>
          <TabPanel>
            <div> { connections.items ? (
              <List
                items={connections.items}
                component={ChatItem}
                notifications={this.props.notifications}
              />) :
               (<h3> Loading </h3>)} </div>
          </TabPanel>
          <TabPanel>
            <div>
              {
              friendRequests ?
             (<List
               items={friendRequests}
               component={ConnectionItem}
               friendRequestNotifications={this.props.friendRequestNotifications}
             />) : (<h3> Loading </h3>)}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

ChatPage.propTypes = {
  getFriendRequests: PropTypes.func.isRequired,
  getConversations: PropTypes.func.isRequired,
  friendRequests: PropTypes.any.isRequired,
  userData: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  friendRequestNotifications: PropTypes.array.isRequired,
};

// We get the connections from the Store
const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  friendRequests: makeSelectUserRequests(),
  notifications: makeSelectNotifications(),
  friendRequestNotifications: makeSelectFriendRequestNotifications(),
});

// And query the friendRequests
function mapDispatchToProps(dispatch) {
  return {
    getConversations: () => dispatch({ type: 'GET_CONVERSATIONS' }),
    getFriendRequests: () => dispatch({ type: 'GET_FRIEND_REQUESTS' }),
    getNotifications: () => dispatch({ type: 'GET_NOTIFICATIONS' }),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chatPage', reducer });
const withSaga = injectSaga({ key: 'chatPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChatPage);
