/**
 *
 * GenderCheckbox
 *
 */

import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import RequiredAsterisk from "components/RequiredAsterisk";
import Title from 'components/Title';
import RadioButton from 'components/RadioButton';


const GenderRadioButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  & > * {
    margin-right: 1rem;
  }
`;

class GenderCheckbox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      gender: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({ gender: this.props.gender ? this.props.gender : '' });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ gender: newProps.gender ? newProps.gender : '' });
  }

  handleChange(event) {
    this.props.onClick(event);
    this.setState({ gender: event.target.value });
  }

  render() {
    return (
      <div>
        <Title> Sukupuoli <RequiredAsterisk /> </Title>
        <GenderRadioButtons>
          <RadioButton
            id="male"
            value="male"
            name="gender"
            onChange={this.handleChange}
            checked={this.state.gender === 'male'}
            label="Mies"
          />
          <RadioButton
            type="radio"
            id="female"
            value="female"
            name="gender"
            onChange={this.handleChange}
            checked={this.state.gender === 'female'}
            label="Nainen"
          />
          <RadioButton
            type="radio"
            id="other"
            value="other"
            name="gender"
            onChange={this.handleChange}
            checked={this.state.gender === 'other'}
            label="Muu"
          />
        </GenderRadioButtons>
      </div>
    );
  }
}

GenderCheckbox.propTypes = {
  onClick: PropTypes.func.isRequired,
  gender: PropTypes.string,
};

export default (GenderCheckbox);
