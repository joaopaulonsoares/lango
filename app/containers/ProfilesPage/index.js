/**
 *
 * ProfilesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectCurrentProfile } from 'containers/App/selectors';

import IdCard from 'components/IdCard/Loadable';
import AudioBox from 'components/AudioBox/Loadable';
import LanguageBox from 'components/LanguageBox/Loadable';
import ProfileCard from 'components/ProfileCard';

import ProfilesFooter from 'containers/ProfilesFooter/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProfilesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
const PulseLoader = require('halogen/PulseLoader');


export class ProfilesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.getRecommendations();
    this.props.logIn();
  }

  render() {
    const { currentProfile } = this.props;
    return (
      <div>
        { currentProfile.id !== undefined ?
          <div style={{ height: "100vh" }}>
            <Helmet>
              <title>ProfilesPage</title>
              <meta name="description" content="Browser for profiles" />
            </Helmet>
            <ProfileCard>
              <IdCard {...currentProfile} />
              <AudioBox {...currentProfile} />
              <LanguageBox {...currentProfile} />
            </ProfileCard>
            <ProfilesFooter id={currentProfile.id} />
          </div>
        : currentProfile.loading
          ? <div style={loaderStyle}>
            <PulseLoader size={'30'} color={"black"} />
          </div>
          : <h2> Emme löytäneet yhtään sinulle sopivaa käyttäjää. Tarkista myöhemmin uudelleen! </h2>
        }
      </div>
    );
  }
}

ProfilesPage.propTypes = {
  logIn: PropTypes.func.isRequired,
  currentProfile: PropTypes.object,
  getRecommendations: PropTypes.func.isRequired,
  // watchNewMessages: PropTypes.func.isRequired,
  // onLoadUser is a test function for changing the global state
};

const loaderStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  /* bring your own prefixes */
  transform: 'translate(-50%, -50%)',
};


const mapStateToProps = createStructuredSelector({
  profilespage: makeSelectProfilesPage(),
  currentProfile: makeSelectCurrentProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRecommendations: () => dispatch({ type: 'GET_RECO' }),
    logIn: () => dispatch({ type: 'LOG_IN' }),
    // watchNewMessages: () => dispatch({ type: 'WATCH_MESSAGES' }),
    getNotifications: () => dispatch({ type: 'GET_NOTIFICATIONS' }),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilesPage', reducer });
const withSaga = injectSaga({ key: 'profilesPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfilesPage);
