import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'react-icons-kit';
import { checkCircle } from 'react-icons-kit/fa/checkCircle';

const RadioButtonContainer = styled.div`
  margin-top: 2px;
  position: relative;
`;

const RadioButtonInput = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  top: auto;
  width: 1px;
  white-space: nowrap;
`;

const DefaultRadioButton = styled.div`
  box-sizing: border-box;
  color: grey;
  cursor: pointer;
  float: left;
  height: 2em;
  margin-right: .4rem;
  text-align: center;
  transition: all .1s ease-out;
  vertical-align: top;
  width: 1.4em;
`;

const CheckedRadioButton = styled(DefaultRadioButton)`
  color: #6bB84a;
`;

const RadioButtonLabel = styled.label`
  display: block;
  overflow: hidden;
`;

const buttonIcon = <Icon size="100%" icon={checkCircle} />;

const RadioButton = ({ id, value, name, onChange, checked, label }) => (
  <RadioButtonContainer>
    <RadioButtonLabel htmlFor={id}>{label}
      {
        checked
          ? <CheckedRadioButton>{buttonIcon}</CheckedRadioButton>
          : <DefaultRadioButton>{buttonIcon}</DefaultRadioButton>
      }
    </RadioButtonLabel>
    <RadioButtonInput
      type="radio"
      id={id}
      value={value}
      name={name}
      onChange={onChange}
      checked={checked}
    />
  </RadioButtonContainer>
);

RadioButton.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
};

export default RadioButton;
