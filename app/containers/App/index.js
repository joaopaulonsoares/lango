/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import ErrorHandler from 'containers/ErrorHandler';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import FeaturePage from 'containers/FeaturePage/Loadable';
import ChatPage from 'containers/ChatPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ProfilesPage from 'containers/ProfilesPage/Loadable';
import EditProfile from 'containers/EditProfile/Loadable';
import PreferencesPage from 'containers/PreferencesPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import Chat from 'containers/Chat/Loadable';
import RequestPage from 'containers/RequestPage/Loadable';
import Headers from 'containers/Headers';

const AppWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  padding: 0 2em;
`;

class App extends React.Component { // eslint-disable-line

  componentDidMount() {
    // Necessary for icons management ( facebookMessenger )
    library.add(fab, fas);
  }

  render() {
    return (
      <div>
        <ErrorHandler>
          <LandingPage authState={this.props.authState} >
            <Helmet
              titleTemplate="%s - LangoApp"
              defaultTitle="Lango"
            >
              <meta name="description" content="" />
            </Helmet>
            <AppWrapper>
              <Headers />
              <PageWrapper>
                <Switch>
                  <Route exact path="/" component={ProfilesPage} />
                  <Route path="/profiles" component={ProfilesPage} />
                  <Route path="/features" component={FeaturePage} />
                  <Route path="/chat" component={ChatPage} />
                  <Route path="/profiles" component={ProfilesPage} />
                  <Route path="/settings" component={SettingsPage} />
                  <Route path="/edit_profile" component={EditProfile} />
                  <Route path="/preferences" component={PreferencesPage} />
                  <Route path="/request" component={RequestPage} />
                  <Route path="/conversation/:id" exact component={Chat} />
                  <Route path="" component={NotFoundPage} />
                </Switch>
              </PageWrapper>
            </AppWrapper>
          </LandingPage>
        </ErrorHandler>
      </div>
    );
  }
}

App.propTypes = {
  authState: PropTypes.string,
};

export default (App);
