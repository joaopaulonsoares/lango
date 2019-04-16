import React from "react";
import PropTypes from "prop-types";

import FormField from "containers/EditProfile/FormField";
import Input from "containers/EditProfile/Input";

import RequiredAsterisk from "components/RequiredAsterisk";
import Title from "components/Title";

class EditProfileTitle extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  /* eslint react/no-did-mount-set-state: 0 */  // --> ON
  /* eslint react/prop-types: 0 */

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.setNameElement = this.setNameElement.bind(this);
  }

  componentDidMount() {
    this.validate();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  componentDidUpdate() {
    this.validate();
  }

  setNameElement(element) {
    this.name = element;
  }

  handleChange = event => {
    this.props.onChange(event);
  }

  validate = () => {
    if (this.name.validity.valueMissing) {
      this.name.setCustomValidity("Nimi on pakollinen kenttä");
    } else {
      this.name.setCustomValidity("");
    }
  }

  render() {
    return (
      <FormField>
        <Title> Nimi <RequiredAsterisk /> </Title>
        <Input
          innerRef={this.setNameElement}
          id="firstName"
          type="text"
          required
          placeholder="..."
          value={this.props.value}
          onChange={this.handleChange}
        />
      </FormField>);
  }
}

EditProfileTitle.props = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default EditProfileTitle;
