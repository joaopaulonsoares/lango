/**
 *
 * RequestFooter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import styled from 'styled-components';

// import LoadingIndicator from 'components/LoadingIndicator';

import Icon from 'react-icons-kit';
import { cross } from 'react-icons-kit/icomoon/cross';
import { checkmark } from 'react-icons-kit/icomoon/checkmark';
import { hourGlass } from 'react-icons-kit/icomoon/hourGlass';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 84px;
`;

const Wrapper2 = styled.div`
  margin: 0 auto;
  width: 195px;
  height: 110px;
  margin-bottom: 10px;
  position: relative;
`;

const AcceptWrapper = styled.div`
  position: absolute;
  left: 0;
  z-index: 2;
`;

const RemoveWrapper = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
`;

const HandshakeButton = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  color: white;
  height: 100%;
`;

const blueWrapper = {
  width: '110px',
  height: '110px',
  backgroundColor: '#3C8FDE',
  borderRadius: '120%',
  boxShadow: '0 3px 3px 0 rgba(0,0,0,0.3)',
  padding: '1em',
  cursor: 'pointer',
};

const redWrapper = {
  width: '110px',
  height: '110px',
  backgroundColor: '#FA423B',
  borderRadius: '120%',
  boxShadow: '0 3px 3px 0 rgba(0,0,0,0.3)',
  padding: '1em',
  cursor: 'pointer',
};

const greenWrapper = {
  width: '110px',
  height: '110px',
  backgroundColor: '#6BB84A',
  borderRadius: '120%',
  boxShadow: '0 3px 3px 0 rgba(0,0,0,0.3)',
  padding: '1em',
  cursor: 'pointer',
};

class RequestFooter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = { loading: false };
  }

  render() {
    // const requestType = 'received';
    const requestType = this.props.requestType;
    const requestId = this.props.requestId;
    const friendId = this.props.friendId;

    const handleOnAccept = () => {
      this.setState({ loading: true });
      !this.state.loading && this.props.acceptRequest(requestId, friendId);
    };

    const handleOnReject = () => {
      this.setState({ loading: true });
      !this.state.loading && this.props.rejectRequest(requestId);
    };

    const handleOnCancel = () => {
      // This deletes the sent friend notification
      this.props.deleteNotification();
      !this.state.loading && this.props.cancelRequest(requestId);
    };

    // console.info('RequestFooter', this.props);
    return (
      <Wrapper>
        {requestType === 'received' && (
          <Wrapper2>
            <AcceptWrapper
              role="presentation"
              style={greenWrapper}
              onClick={handleOnAccept}
            >
              <HandshakeButton>
                <Icon
                  icon={this.state.loading ? hourGlass : checkmark}
                  size={30}
                />
              </HandshakeButton>
            </AcceptWrapper>
            <RemoveWrapper
              role="presentation"
              style={redWrapper}
              onClick={handleOnReject}
            >
              <HandshakeButton>
                <Icon icon={this.state.loading ? hourGlass : cross} size={30} />
              </HandshakeButton>
            </RemoveWrapper>
          </Wrapper2>
        )}

        {requestType === 'sent' && (
          <div>
            <div
              role="presentation"
              style={blueWrapper}
              onClick={handleOnCancel}
            >
              <HandshakeButton>
                <Icon icon={cross} size={30} />
              </HandshakeButton>
            </div>
          </div>
        )}
      </Wrapper>
    );
  }
}

RequestFooter.propTypes = {
  requestType: PropTypes.string,
  requestId: PropTypes.string,
  friendId: PropTypes.string,
  acceptRequest: PropTypes.func,
  rejectRequest: PropTypes.func,
  cancelRequest: PropTypes.func,
  deleteNotification: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(RequestFooter);
