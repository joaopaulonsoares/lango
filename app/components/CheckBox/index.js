import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { checkSquare } from 'react-icons-kit/fa/checkSquare';


const CheckBoxContainer = styled.div`
  margin-top: 2px;
`;

// http://adrianroselli.com/2017/05/under-engineered-custom-radio-buttons-and-checkboxen.html
const CustomCheckBox = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  top: auto;
  width: 1px;
  white-space: nowrap;
`;

const DefaultBox = styled.div`
  box-sizing: border-box;
  color: grey;
  cursor: pointer;
  height: 1.4em;
  text-align: center;
  transition: all .1s ease-out;
  vertical-align: top;
  width: 1.4em;
`;

const CheckedBox = styled(DefaultBox)`
  color: #6bB84a
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  padding: 0;
  width: 100%;
`;

const checkBoxIcon = <Icon size="100%" icon={checkSquare} />;

const CheckBox = ({ name, onChange, checked = false, label }) => (
  <CheckBoxContainer>
    <Label htmlFor={name}>{label}
      {
        checked
          ? <CheckedBox>{checkBoxIcon}</CheckedBox>
          : <DefaultBox>{checkBoxIcon}</DefaultBox>
      }
    </Label>
    <CustomCheckBox
      id={name}
      type="checkbox"
      name={name}
      onChange={onChange}
      checked={checked}
    />
  </CheckBoxContainer>
);

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string,
};

export default CheckBox;
