/**
*
* SaveProfileButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PulseLoader = require('halogen/PulseLoader');
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const SaveButton = styled.button`
  height: 60px;
  background-color: #6BB84A;
  border-radius: 8px;
  color: white;
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.15);
  margin-bottom: 0.5em;
  width:100%;
`;

class SaveProfileButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (!this.props.isLoading) {
      return (
        <div>
          <SaveButton onClick={this.props.onClick}> Tallenna </SaveButton>
        </div>
      );
    }
    return (
      <SaveButton onClick={this.props.onClick}>
        <PulseLoader size={'30'} color={"white"} />
      </SaveButton>);
  }
}

SaveProfileButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default SaveProfileButton;
