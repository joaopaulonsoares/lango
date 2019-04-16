/**
*
* EditLocation
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import RequiredAsterisk from "components/RequiredAsterisk";
import Title from 'components/Title';
import Select from 'components/Select';

class EditLocation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      location: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.setLocationElement = this.setLocationElement.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    this.setState({ location: this.props.location ? this.props.location : "" });
  }

  componentDidMount() {
    this.validate();
  }

  componentWillReceiveProps(newProps) {
    this.setState({ location: newProps.location ? newProps.location : "" });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.location !== nextProps.location;
  }

  componentDidUpdate() {
    this.validate();
  }

  setLocationElement(element) {
    this.location = element;
  }

  handleChange(event) {
    this.props.onSelect(event);
    this.setState({ location: event.target.value });
  }

  validate = () => {
    if (this.location.validity.valueMissing) {
      this.location.setCustomValidity("Sijainti on pakollinen kenttä");
    } else {
      this.location.setCustomValidity("");
    }
  }

  render() {
    return (
      <div>
        <div>
          <Title>Sijainti <RequiredAsterisk /> </Title>
          <Select
            name="location"
            id="location"
            required
            innerRef={this.setLocationElement}
            value={this.state.location}
            onChange={this.handleChange}
            options={[
              { value: "", label: "-", key: "not-selected" },
              { value: "Pääkaupunkiseutu", label: "Pääkaupunkiseutu", key: "paakaupunkiseutu" },
              { value: "Tampereen seutu", label: "Tampereen seutu", key: "tampere" },
              { value: "Turun seutu", label: "Turun seutu", key: "turku" },
              { value: "Oulun seutu", label: "Oulun seutu", key: "oulu" },
              { value: "Muu Suomi", label: "Muu Suomi", key: "muu" },
            ]}
          />
        </div>
      </div>
    );
  }
}

EditLocation.propTypes = {
  onSelect: PropTypes.func.isRequired,
  location: PropTypes.string,
};

export default EditLocation;
