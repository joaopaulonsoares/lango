/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Load the favicon, the manifest.json file and the .htaccess file and logos
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/icon-72x72.png';
import '!file-loader?name=[name].[ext]!./images/icon-96x96.png';
import '!file-loader?name=[name].[ext]!./images/icon-120x120.png';
import '!file-loader?name=[name].[ext]!./images/icon-128x128.png';
import '!file-loader?name=[name].[ext]!./images/icon-144x144.png';
import '!file-loader?name=[name].[ext]!./images/icon-152x152.png';
import '!file-loader?name=[name].[ext]!./images/icon-167x167.png';
import '!file-loader?name=[name].[ext]!./images/icon-180x180.png';
import '!file-loader?name=[name].[ext]!./images/icon-192x192.png';
import '!file-loader?name=[name].[ext]!./images/icon-384x384.png';
import '!file-loader?name=[name].[ext]!./images/icon-512x512.png';
import '!file-loader?name=[name].[ext]!./images/hakunilan_kansainvalinenyhdistys_logo.jpeg';
import '!file-loader?name=[name].[ext]!./images/helmet_logo.png';
import '!file-loader?name=[name].[ext]!./images/nice_hearts_logo.png';
import '!file-loader?name=[name].[ext]!./images/oulun_kaupunginkirjasto_logo.jpg';
import '!file-loader?name=[name].[ext]!./images/vantaa_logo.png';
import '!file-loader?name=[name].[ext]!./images/splash_image.jpg';
import '!file-loader?name=[name].[ext]!./images/lango-logo.svg';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

import App from 'containers/App';
import LoginSuccess from 'containers/LoginSuccess';
import NewUser from 'containers/NewUser';
import EULAPage from 'components/EULAPage';
import EULAPageEn from 'components/EULAPageEn';
import FaqPage from 'components/FaqPage';
import PrivacyPage from 'components/PrivacyPage';
import PrivacyPageEn from 'components/PrivacyPageEn';
import LanguageProvider from 'containers/LanguageProvider';
import Amplify, { Analytics } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
import config from '../internals/login_configuration.json';
import configureStore from './configureStore';
import { translationMessages } from './i18n';
import './global-styles';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');
// Amplify specific theme
const MyTheme = {};

const render = (messages) => {
  Amplify.configure(config);
  Analytics.configure({ disabled: true });
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/eula" component={EULAPage} />
            <Route path="/faq" component={FaqPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/eula_en" component={EULAPageEn} />
            <Route path="/privacy_en" component={PrivacyPageEn} />
            <Route path="/login_success" component={LoginSuccess} />
            <Route path="/new_user" component={NewUser} />
            <Authenticator
              hideDefault
              federated={config.federated}
              theme={MyTheme}
            >
              <App />
            </Authenticator>
          </Switch>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
