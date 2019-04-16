/**
*
* EditBio
*
*/

import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import Title from 'components/Title';


export const Textarea = styled.textarea`
    border:none; /* Get rid of the browser's styling */
    border-radius: 0;
    border-bottom:1px solid #D9D9D6;
    color: #000000;
    font-size: 16px;
    line-height: 22px;
    opacity: 0.85;
    outline: none;
    padding: 0 0 .3rem;
    width: 100%;
`;

class EditBio extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Title> Esittelyteksti </Title>
        <Textarea name="introduction" id="description" rows="4" maxLength="300" onChange={this.props.onChange} value={this.props.description} >
        </Textarea>
      </div>
    );
  }
}

EditBio.propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default EditBio;
