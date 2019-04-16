/**
*
* LogoutButton
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function LogoutButton() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

LogoutButton.propTypes = {

};

export default LogoutButton;
