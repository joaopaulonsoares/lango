/**
 *
 * Chat
 * Store is not used for time limit reasons, state should be fine for now
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { format, isToday, isYesterday } from 'date-fns';

import { API, graphqlOperation } from "aws-amplify";

import { clearNotificationForConversation, clearConversation } from "containers/App/actions";

import { Connect } from "aws-amplify-react";
import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectChat from './selectors';
import reducer from './reducer';
import saga from './saga';

import { extractId } from "../../utils/utilFuncs";
import { getConversation, newMessageSub, deleteNotification } from '../../graphRequestTemplates';

const MessagesListBox = styled.div`
    list-style: none;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 1em;
`;

const MessageForm = styled.form`
  background-color: #fff;
  align-items: center;
  display: flex;
  z-index: 3;
  margin-bottom: 1rem;
 `;

const MessageInput = styled.input`
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 8px;
  box-shadow: inset 1px 3px 3px 1px rgba(0,0,0,0.08);
  padding: .4rem 1rem;
  width: 100%;
`;

const MessageSubmitButton = styled.input`
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 8px;
  box-shadow: inset 1px 3px 3px 1px rgba(0,0,0,0.08);
  margin-left: 1rem;
  padding: .4rem 1rem;
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2vh 0 0;
  padding: 0;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageText = styled.div`
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.3);
  margin-bottom: 2rem;
  padding: 1.5rem;
  position: relative;
  z-index:2;
  width: 80%;
  word-wrap: break-word;
  
  &:before {
    background-color: inherit;
    content: '';
    display: block;
    height: 20px;
    position: absolute;
    transform: rotate(-45deg);
    bottom: 20px;
    width: 20px;
    z-index: -1;
  }
`;

const OwnMessage = MessageText.extend`
  align-self: flex-start;
  background-color: #DDF3DB;
  
  &:before {
    left: -10px;
  } 
`;

const Message = MessageText.extend`
  align-self: flex-end;
  background-color: #D8E9F8;
  
  &:before {
    right: -10px;
  } 
`;

export class Chat extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = { newMessage: "", userId: "", messages: [], notificationId: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handeNewMessage = this.handleNewMessage.bind(this);
    this.getOldMessages = this.getOldMessages.bind(this);
  }

  componentDidMount = async () => {
    this.setState({ receiverId: this.props.history.location.state.receiverId });
    extractId().then(id => this.setState({ userId: id }));
    const allMessages = await API.graphql(graphqlOperation(getConversation, { conversationId: this.props.match.params.id }));
    this.setState({ messages: allMessages.data.getConversation.messages });
    this.setState({ notificationId: this.props.history.location.state.notificationId, conversationId: this.props.history.location.state.id });

    // Remove the notification
    const conversationId = this.props.history.location.state.id;
    const receiverId = this.props.history.location.state.receiverId;
    const notificationId = this.props.history.location.state.notificationId;

    this.props.clearNotificationForConversation(notificationId);

    if (this.props.hasNotification) {
      await API.graphql(graphqlOperation(deleteNotification,
        { userId: receiverId, conversationId }));
    }
  }

  componentWillUnmount = async () => {
    this.props.clearConversation(this.state.conversationId);
  }

  getOldMessages(oldMessages) {
    this.setState({ messages: oldMessages });
  }

  handleChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  handleNewMessage(message) {
    const messages = this.state.messages;
    const newMessages = messages.concat(message);
    this.setState({ messages: newMessages });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.sendMessage(this.props.match.params.id, this.state.newMessage,
       this.state.receiverId, this.props.history.location.state.id);
    this.setState({ newMessage: "" });
  }

  render() {
    return (
      <div>
        <Connect
          query={graphqlOperation(getConversation, { conversationId: this.props.match.params.id })}
          subscription={graphqlOperation(newMessageSub, { conversationId: this.props.match.params.id })}
          onSubscriptionMsg={(prev, { subscribeToNewMessages }) => {
            this.handleNewMessage(subscribeToNewMessages);
            prev;
          }}
        >
          {() =>
            (<div>
            </div>)}
        </Connect>
        <MessagesListBox>
          { this.state.messages ? (<ListView userId={this.state.userId} messages={this.state.messages} />)
              : (<h3> No messages.. </h3>)
          }
        </MessagesListBox>
        <MessageForm innerRef={element => element && element.scrollIntoView(true)} onSubmit={this.handleSubmit}>
          <MessageInput
            id="newMessage"
            placeholder="Kirjoita viestisi tähän"
            type="text"
            value={this.state.newMessage}
            onChange={this.handleChange}
          />
          <MessageSubmitButton type="submit" value="Lähetä" />
        </MessageForm>
      </div>
    );
  }
}

Chat.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.any,
  sendMessage: PropTypes.func,
  history: PropTypes.object,
  clearConversation: PropTypes.func,
};

const ListView = ({ userId, messages }) => (
  <MessagesList>
    {messages.map(message =>
      (<ListItem
        key={message.messageId}
        isOwnMessage={userId === message.senderId}
        message={message}
      />)
    )}
  </MessagesList>
);

ListView.propTypes = {
  userId: PropTypes.any,
  messages: PropTypes.any,
};

const ListItem = ({ isOwnMessage, message }) => (
  <MessageContainer>
    { /* <MessageDate>{getDateText(message.sentDate)}</MessageDate> */ }
    {isOwnMessage
      ? <OwnMessage>{message.content}</OwnMessage>
      : <Message>{message.content}</Message>}
  </MessageContainer>
);

ListItem.propTypes = {
  isOwnMessage: PropTypes.any,
  message: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  chat: makeSelectChat(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: (id, content, receiverId) => dispatch({ type: 'SEND_MESSAGE', id, content, receiverId }),
    clearNotificationForConversation: (conversationId) => dispatch(clearNotificationForConversation(conversationId)),
    clearConversation: (conversationId) => dispatch(clearConversation(conversationId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'chat', reducer });
const withSaga = injectSaga({ key: 'chat', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Chat);
