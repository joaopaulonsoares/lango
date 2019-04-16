/**
 *
 * LoginSuccess
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import saga from './saga';


export class LoginSuccess extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // Send data received from facebook to landingPage
    window.opener.postMessage(this.getUrlParams(window.location.hash), window.location.origin);
  }

  getUrlParams(search) {
    const hashes = search.slice(search.indexOf("?") + 2).split("&");
    return hashes.reduce((params, hash) => {
      const [key, val] = hash.split("=");
      return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

LoginSuccess.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);
const withSaga = injectSaga({ key: 'loginSuccess', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginSuccess);
