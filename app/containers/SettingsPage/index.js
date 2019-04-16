/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { Switch, Route } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

// import HomePage from 'containers/HomePage/Loadable';
// import ChatPage from 'containers/ChatPage/Loadable';

import SettingsMenu from '../../components/SettingsMenu';


export class SettingsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>SettingsPage</title>
          <meta name="description" content="Description of SettingsPage" />
        </Helmet>
        <SettingsMenu />
      </div>
    );
  }
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingspage: makeSelectSettingsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'settingsPage', reducer });
const withSaga = injectSaga({ key: 'settingsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingsPage);
