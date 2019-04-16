/**
 *
 * ProfilesFooter
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import IconManual from 'components/Icon';
import Icon from 'react-icons-kit';
import { ICONS } from 'components/Icon/ICONS';
import { chevronLeft } from 'react-icons-kit/fa/chevronLeft';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';

import { browseRight, browseLeft } from 'containers/App/actions';

import LoadingIndicator from 'components/LoadingIndicator';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

const handChakeWrapper = {
  width: '110px',
  height: '110px',
  backgroundColor: '#3C8FDE',
  borderRadius: '120%',
  boxShadow: '0 3px 3px 0 rgba(0,0,0,0.3)',
  padding: '1em',
  cursor: 'pointer',
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom : 0;
    left: 0;
    width: 100%;
    height: 84px;
    `;

const HandshakeButton = styled.div`
  align-items: center;
  display: flex;
  color: white;
  height: 100%;
  justify-content: center;
`;

const ArrowButton = styled.button`
  color: #D9D9D6;
  cursor: pointer;
`;

class ProfilesFooter extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = { clicked: false };
    this.handshake = this.handshake.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ clicked: false });
    }
  }
  handshake(id) {
    this.setState({ clicked: true });
    this.props.makeHandshake(id);
  }

  render() {
    return (
      <Wrapper>
        <ArrowButton onClick={this.props.onBrowseLeft}>
          <div style={{ color: '#D9D9D6', padding: '50px' }}>
            <Icon icon={chevronLeft} size={35} />
          </div>
        </ArrowButton>
        <div>
          <div style={handChakeWrapper}>
            <HandshakeButton onClick={() => this.handshake(this.props.id)}>
              {this.state.clicked ?
                <div>
                  <LoadingIndicator />
                </div> :
                <IconManual color="white" icon={ICONS.HANDSHAKE} height="65%" width="65%" />
              }
            </HandshakeButton>
          </div>
        </div>
        <div style={{ color: '#D9D9D6', padding: '50px' }}>
          <ArrowButton onClick={this.props.onBrowseRight}>
            <Icon icon={chevronRight} size={35} />
          </ArrowButton>
        </div>
      </Wrapper>
    );
  }
}

ProfilesFooter.propTypes = {
  onBrowseRight: PropTypes.func,
  onBrowseLeft: PropTypes.func,
  makeHandshake: PropTypes.func,
  id: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    onBrowseRight: () => dispatch(browseRight()),
    onBrowseLeft: () => dispatch(browseLeft()),
    makeHandshake: (id) => dispatch({ type: 'MAKE_HANDSHAKE', id }),
  };
}
const withSaga = injectSaga({ key: 'ProfilesFooter', saga });
const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withSaga,
  withConnect,
)(ProfilesFooter);
