/**
 *
 * ErrorHandler
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectGlobal from './selectors';
import reducer from './reducer';
import saga from './saga';

const ErrorWrapper = styled.div`
  position:absolute;
  min-width: 300px;
  width: 30vw;
  height: 6em;
  bottom:0px;
  right: 0px;
  margin: 10px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  border-left: 5px solid red;
  color: white;
  padding: 10px;
`;

export class ErrorHandler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = { shouldShow: false };
    this.close = this.close.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.global.error.length > 0) {
      this.setState({ shouldShow: true });
    }
  }
  close() {
    this.setState({ shouldShow: false });
  }
  render() {
    return (
      <div>
        {
        this.state.shouldShow &&
        <ErrorWrapper onClick={this.close}>
          <b> Tapahtui odottamaton virhe! </b>
          <br />
          Voit sulkea tämän ilmoituksen klikkaamalla.
        </ErrorWrapper>
        }
        {this.props.children}
      </div>
    );
  }
}

ErrorHandler.propTypes = {
  children: PropTypes.any,
  global: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  global: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'errorHandler', reducer });
const withSaga = injectSaga({ key: 'errorHandler', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ErrorHandler);
