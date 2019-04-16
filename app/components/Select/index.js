import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/fa/chevronDown';

const SelectContainer = styled.div`
  border-bottom: 1px solid #D9D9D6;
  position: relative;
  padding-bottom: 12px;
`;

const CustomSelect = styled.select`
  background: transparent;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  
  &:focus {
    outline: 0 none;
  }
`;

const IconContainer = styled.div`
  color: #84ccf8;
  position: absolute;
  right: 0;
`;

class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  toggleOpen(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    const { id, value, name, onChange, options, innerRef, required = false } = this.props;

    return (<SelectContainer>
      {
        this.state.isOpen
          ? null
          : <IconContainer><Icon icon={chevronDown} size={20} /></IconContainer>
      }
      <CustomSelect
        id={id}
        innerRef={element => innerRef && innerRef(element)}
        value={value}
        name={name}
        onChange={e => {
          this.toggleOpen(false);
          onChange(e);
        }}
        onBlur={() => this.toggleOpen(false)}
        onFocus={() => this.toggleOpen(true)}
        onClick={() => this.toggleOpen(true)}
        required={required}
      >
        {// eslint-disable-next-line no-use-before-define
          options.map(option =>
            (<option key={option.key || option.value} value={option.value}>
              {option.label}
            </option>)
        )}
      </CustomSelect>
    </SelectContainer>);
  }
}

Select.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  innerRef: PropTypes.func,
  required: PropTypes.bool,
};

export default Select;
